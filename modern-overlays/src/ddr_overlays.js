import { HostUrl } from "./HostUrl";

/* Common data and functions for overlays */
let request_time;
let request_pi_time;
let resume_check = true;

function speak(obj, priority) { } // stub to prevent crashing

/* default handlers for RotorHazard events */
// NOTE: 'race_kickoff' must be defined locally in the HTML
const default_handler = {
    'language': function (msg) {
        if (msg.language) {
            rotorhazard.interface_language = msg.language;
        }
    },

    'race_scheduled': function (msg) {
        if (msg.scheduled) {
            let deferred_start = msg.scheduled_at * 1000;  // convert seconds (pi) to millis (JS)
            rotorhazard.timer.deferred.start(deferred_start, null);
        } else {
            rotorhazard.timer.deferred.stop();
        }
    },

    'race_status': function (msg) {
        switch (msg.race_status) {
            case 1: // Race running
                rotorhazard.race_status_go_time = window.performance.now();
                $('body').addClass('race-running');
                $('body').removeClass('race-stopped');
                $('body').removeClass('race-new');
                $('.timing-clock').removeClass('staging');
                if (resume_check) {
                    race_kickoff(msg);
                }
                break;
            case 2: // Race stopped, clear or save laps
                $('body').removeClass('race-running');
                $('body').addClass('race-stopped');
                $('body').removeClass('race-new');
                $('.timing-clock').removeClass('staging');
                break;
            case 3: // Staging
                $('body').removeClass('race-stopped');
                $('body').addClass('race-running');
                $('body').removeClass('race-new');
                $('.timing-clock').addClass('staging');
                if (resume_check) {
                    race_kickoff(msg);
                }
                break;
            default: // Waiting to start new race
                $('body').removeClass('race-running');
                $('body').removeClass('race-stopped');
                $('body').addClass('race-new');
                $('.timing-clock').removeClass('staging');
                if (resume_check) {
                    socket.emit('get_race_scheduled');
                }
                break;
        }

        resume_check = false;
    },

    'heartbeat': function (msg) {
    },

    'prestage_ready': function (msg) {
        request_time = new Date();
    },

    'stage_ready': function (msg) {
        race_kickoff(msg);
    },

    'stop_timer': function (msg) {
        rotorhazard.timer.stopAll();
    },

    'pi_time': function (msg) {
        let response_time = window.performance.now();
        let server_delay = response_time - rotorhazard.pi_time_request;
        let server_oneway = server_delay ? server_delay / 2 : server_delay;

        let server_time_differential = {
            'differential': (msg.pi_time_s * 1000) - response_time - server_oneway, // convert seconds (pi) to millis (JS)
            'response': parseFloat(server_delay)
        }

        // store sync sample
        rotorhazard.server_time_differential_samples.push(server_time_differential);

        // sort stored samples
        rotorhazard.server_time_differential_samples.sort(function (a, b) {
            return a.response - b.response;
        })

        // remove unusable samples
        let diff_min = rotorhazard.server_time_differential_samples[0].differential - rotorhazard.server_time_differential_samples[0].response
        let diff_max = rotorhazard.server_time_differential_samples[0].differential + rotorhazard.server_time_differential_samples[0].response

        rotorhazard.server_time_differential_samples = rotorhazard.server_time_differential_samples.filter(function (value, index, array) {
            return value.differential >= diff_min && value.differential <= diff_max;
        });

        // get filtered value
        let a = [];
        for (let i in rotorhazard.server_time_differential_samples) {
            a.push(rotorhazard.server_time_differential_samples[i].differential);
        }
        rotorhazard.server_time_differential = median(a);

        // pass current sync to timers
        rotorhazard.timer.race.sync();
        rotorhazard.timer.deferred.sync();

        // continue sampling for sync to improve accuracy
        if (rotorhazard.server_time_differential_samples.length < 10) {
            setTimeout(function () {
                rotorhazard.pi_time_request = window.performance.now();
                socket.emit('get_pi_time');
            }, (Math.random() * 500) + 250); // 0.25 to 0.75s delay
        }

        // update server info
        a = Infinity;
        for (let i in rotorhazard.server_time_differential_samples) {
            a = Math.min(a, rotorhazard.server_time_differential_samples[i].response);
        }
        rotorhazard.sync_within = Math.ceil(a);
        //$('#server-lag').html('<p>Sync quality: within ' + a + 'ms (' + rotorhazard.server_time_differential_samples.length + ' samples)</p>');
    },
};







/* HTML generators */
function build_nextup(leaderboard, display_type, meta, ddr_pilot_data, show_position = false) {
    if (typeof (display_type) === 'undefined') {
        let display_type = 'by_race_time';
    }
    if (typeof (meta) === 'undefined') {
        let meta = new Object;
        meta.team_racing_mode = false;
        meta.start_behavior = 0;
        meta.consecutives_count = 0;
        meta.primary_leaderboard = null;
    }

    for (let i in leaderboard) {
        let pilot_name = leaderboard[i].callsign;
        let flagImg = getFlagURL(leaderboard[i].pilot_id, ddr_pilot_data);
        let pilotImg = getPilotImgURL(leaderboard[i]);

        let html = '<div class="nextup_pilot">';
        if (show_position) {
            let position_strings = ["1st", "2nd", "3rd", "4th"];
            html += '<div class="nextup_pilot_position">' + position_strings[i] + '</div>';
            $('#nextup_pilot_box').height(480);  // give more space to show positions (overriding CSS)
            // that's the place where you can add other info such as fastest lap:
            // let fastest_lap = leaderboard[i].fastest_lap;
            // let consecutives = leaderboard[i].consecutives;
        }
        html += '<div class="nextup_pilot_avatar"><div class="nextup_pilot_avatar_mask"><img src="' + pilotImg + '" alt="Avatar"></div></div><div class="nextup_pilot_flag"><div class="nextup_pilot_flag_mask"><img src="' + flagImg + '"></div></div><div class="nextup_pilot_name">' + pilot_name + '</div></div>';

        $('#nextup_pilot_box').append(html);
    }
}



/* Pilot data retrieval */
export async function getFlagURL(pilot_id, ddr_pilot_data) {
    let flagImg = HostUrl + '/ddr_overlays/static/imgs/flags/' + getPilotFlag(pilot_id, ddr_pilot_data) + '.jpg';
    if (!(await imageExists(flagImg))) {
        flagImg = HostUrl + '/ddr_overlays/static/imgs/flags/mn.jpg';
    }
    return flagImg;
}

function getPilotFlag(pilot_id, ddr_pilot_data) {
    const count = Object.keys(ddr_pilot_data).length;
    for (let i = 0; i < count; i++) {
        let pilot = ddr_pilot_data[i];
        if (pilot.pilot_id == pilot_id) {
            pilot = ddr_pilot_data[i];
            if (pilot.country) {
                const country_upper = pilot.country;
                return country_upper;
            }
            break;
        }
    }
    return 'it';
}

// Добавляем async
export async function getPilotImgURL(pilot) {
    let pilotImg = HostUrl + '/shared/avatars/' + pilot.callsign.replace(/ /g, "_").toLowerCase() + '.jpg';

    const exists = await imageExists(pilotImg);

    if (!exists) {
        pilotImg = HostUrl + '/ddr_overlays/static/imgs/no_avatar.png';
    }

    return pilotImg;
}

async function imageExists(image_url) {
    try {
        const response = await fetch(image_url, { method: 'HEAD' });

        return response.ok;

    } catch (error) {
        return false;
    }
}


/* Functions for pilots */
function render_pilots(ddr_pilot_data) {
    count = Object.keys(ddr_pilot_data).length;
    for (let i = 0; i < count; i++) {
        let pilot = ddr_pilot_data[i];

        // if div exists
        if (document.getElementById('pilot_id_flag_' + pilot.pilot_id)) {
            document.getElementById('pilot_id_flag_' + pilot.pilot_id).innerHTML = '<img class="country_flag" src="' + getFlagURL(pilot.pilot_id, ddr_pilot_data) + '">';
        }
    }
}
