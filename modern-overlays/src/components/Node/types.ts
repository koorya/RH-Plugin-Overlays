export type LeaderboardMsg = {
  current: {
    displayname: string;
    heat: number;
    round: number;
    status_msg: string;
    leaderboard: {
      by_race_time: {
        pilot_id: number;
        callsign: string;
        team_name: string;
        laps: number;
        starts: number;
        node: number;
        total_time: string;
        total_time_laps: string;
        last_lap: null;
        average_lap: string;
        fastest_lap: string;
        consecutives: string;
        consecutives_base: number;
        consecutive_lap_start: null;
        fastest_lap_source: null;
        consecutives_source: null;
        total_time_raw: number;
        total_time_laps_raw: number;
        average_lap_raw: number;
        fastest_lap_raw: number;
        consecutives_raw: null;
        last_lap_raw: null;
        position: null;
        behind: number;
      }[];
      by_fastest_lap: {
        pilot_id: number;
        callsign: string;
        team_name: string;
        laps: number;
        starts: number;
        node: number;
        total_time: string;
        total_time_laps: string;
        last_lap: null;
        average_lap: string;
        fastest_lap: string;
        consecutives: string;
        consecutives_base: number;
        consecutive_lap_start: null;
        fastest_lap_source: null;
        consecutives_source: null;
        total_time_raw: number;
        total_time_laps_raw: number;
        average_lap_raw: number;
        fastest_lap_raw: number;
        consecutives_raw: null;
        last_lap_raw: null;
        position: null;
      }[];
      by_consecutives: {
        pilot_id: number;
        callsign: string;
        team_name: string;
        laps: number;
        starts: number;
        node: number;
        total_time: string;
        total_time_laps: string;
        last_lap: null;
        average_lap: string;
        fastest_lap: string;
        consecutives: string;
        consecutives_base: number;
        consecutive_lap_start: null;
        fastest_lap_source: null;
        consecutives_source: null;
        total_time_raw: number;
        total_time_laps_raw: number;
        average_lap_raw: number;
        fastest_lap_raw: number;
        consecutives_raw: null;
        last_lap_raw: null;
        position: null;
      }[];
      meta: {
        primary_leaderboard:
          | "by_race_time"
          | "by_fastest_lap"
          | "by_consecutives";
        win_condition: number;
        team_racing_mode: number;
        start_behavior: number;
        consecutives_count: number;
        fastest_race_lap_data: null;
      };
    };
  };
  last_race: {
    displayname: string;
    heat: number;
    round: number;
    status_msg: string;
    leaderboard: {
      by_race_time: (
        | {
            pilot_id: number;
            callsign: string;
            team_name: string;
            laps: number;
            starts: number;
            node: number;
            total_time: string;
            total_time_laps: string;
            last_lap: string;
            average_lap: string;
            fastest_lap: string;
            consecutives: string;
            consecutives_base: number;
            consecutive_lap_start: number;
            fastest_lap_source: {
              round: number;
              heat: number;
              displayname: string;
            };
            consecutives_source: {
              round: number;
              heat: number;
              displayname: string;
            };
            total_time_raw: number;
            total_time_laps_raw: number;
            average_lap_raw: number;
            fastest_lap_raw: number;
            consecutives_raw: number;
            last_lap_raw: number;
            position: number;
            behind: number;
            time_behind?: undefined;
            time_behind_raw?: undefined;
          }
        | {
            pilot_id: number;
            callsign: string;
            team_name: string;
            laps: number;
            starts: number;
            node: number;
            total_time: string;
            total_time_laps: string;
            last_lap: string;
            average_lap: string;
            fastest_lap: string;
            time_behind: string;
            consecutives: string;
            consecutives_base: number;
            consecutive_lap_start: number;
            fastest_lap_source: {
              round: number;
              heat: number;
              displayname: string;
            };
            consecutives_source: {
              round: number;
              heat: number;
              displayname: string;
            };
            total_time_raw: number;
            total_time_laps_raw: number;
            average_lap_raw: number;
            fastest_lap_raw: number;
            time_behind_raw: number;
            consecutives_raw: number;
            last_lap_raw: number;
            position: number;
            behind: number;
          }
      )[];
      by_fastest_lap: (
        | {
            pilot_id: number;
            callsign: string;
            team_name: string;
            laps: number;
            starts: number;
            node: number;
            total_time: string;
            total_time_laps: string;
            last_lap: string;
            average_lap: string;
            fastest_lap: string;
            time_behind: string;
            consecutives: string;
            consecutives_base: number;
            consecutive_lap_start: number;
            fastest_lap_source: {
              round: number;
              heat: number;
              displayname: string;
            };
            consecutives_source: {
              round: number;
              heat: number;
              displayname: string;
            };
            total_time_raw: number;
            total_time_laps_raw: number;
            average_lap_raw: number;
            fastest_lap_raw: number;
            time_behind_raw: number;
            consecutives_raw: number;
            last_lap_raw: number;
            position: number;
          }
        | {
            pilot_id: number;
            callsign: string;
            team_name: string;
            laps: number;
            starts: number;
            node: number;
            total_time: string;
            total_time_laps: string;
            last_lap: string;
            average_lap: string;
            fastest_lap: string;
            consecutives: string;
            consecutives_base: number;
            consecutive_lap_start: number;
            fastest_lap_source: {
              round: number;
              heat: number;
              displayname: string;
            };
            consecutives_source: {
              round: number;
              heat: number;
              displayname: string;
            };
            total_time_raw: number;
            total_time_laps_raw: number;
            average_lap_raw: number;
            fastest_lap_raw: number;
            consecutives_raw: number;
            last_lap_raw: number;
            position: number;
            time_behind?: undefined;
            time_behind_raw?: undefined;
          }
      )[];
      by_consecutives: (
        | {
            pilot_id: number;
            callsign: string;
            team_name: string;
            laps: number;
            starts: number;
            node: number;
            total_time: string;
            total_time_laps: string;
            last_lap: string;
            average_lap: string;
            fastest_lap: string;
            time_behind: string;
            consecutives: string;
            consecutives_base: number;
            consecutive_lap_start: number;
            fastest_lap_source: {
              round: number;
              heat: number;
              displayname: string;
            };
            consecutives_source: {
              round: number;
              heat: number;
              displayname: string;
            };
            total_time_raw: number;
            total_time_laps_raw: number;
            average_lap_raw: number;
            fastest_lap_raw: number;
            time_behind_raw: number;
            consecutives_raw: number;
            last_lap_raw: number;
            position: number;
          }
        | {
            pilot_id: number;
            callsign: string;
            team_name: string;
            laps: number;
            starts: number;
            node: number;
            total_time: string;
            total_time_laps: string;
            last_lap: string;
            average_lap: string;
            fastest_lap: string;
            consecutives: string;
            consecutives_base: number;
            consecutive_lap_start: number;
            fastest_lap_source: {
              round: number;
              heat: number;
              displayname: string;
            };
            consecutives_source: {
              round: number;
              heat: number;
              displayname: string;
            };
            total_time_raw: number;
            total_time_laps_raw: number;
            average_lap_raw: number;
            fastest_lap_raw: number;
            consecutives_raw: number;
            last_lap_raw: number;
            position: number;
            time_behind?: undefined;
            time_behind_raw?: undefined;
          }
      )[];
      meta: {
        primary_leaderboard: string;
        win_condition: number;
        team_racing_mode: number;
        start_behavior: number;
        consecutives_count: number;
        fastest_race_lap_data: {
          phonetic: string[];
          text: string[];
        };
      };
    };
  };
};

export type PilotData = {
  pilots: {
    pilot_id: number;
    callsign: string;
    team: string;
    phonetic: string;
    name: string;
    active: boolean;
    team_options: string;
    color: string;
    locked: boolean;
    country: string;
  }[];
  pilotSort: string;
  attributes: {
    name: string;
    label: string;
    field_type: string;
    value: null | string;
    desc: null | string;
    placeholder: null;
    options:
      | null
      | {
          value: string;
          label: string;
        }[];
    order: number;
    html_attributes: null;
    section: null;
  }[];
};

export type CurrentLapMsg = {
  current: {
    node_index: {
      laps: {
        lap_index: number;
        lap_number: number;
        lap_time: number;
        lap_time_formatted: string;
        lap_time_stamp: number;
        lap_raw?: number;
        source: number;
        deleted: boolean;
        splits: { split_speed: unknown; split_time: unknown }[];
        late_lap: boolean;
      }[];
      fastest_lap_index: number | null;
      pilot: {
        id: number;
        name: string;
        callsign: string;
      } | null;
      finished_flag: boolean | null;
    }[];
  };
};

export type RaceStatusMsg = {
  race_status: number;
  race_format_id: number;
  race_heat_id: number;
  race_class_id: number;
  unlimited_time: number;
  race_time_sec: number;
  staging_tones: number;
  hide_stage_timer: boolean;
  pi_starts_at_s: number;
  pi_staging_at_s: number;
  show_init_time_flag: boolean;
  next_round: number;
};
