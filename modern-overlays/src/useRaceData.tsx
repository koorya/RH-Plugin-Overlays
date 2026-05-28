import { useState, useEffect } from "react";
import { socket } from "./socket";
import type {
  LeaderboardMsg,
  RaceStatusMsg,
  CurrentLapMsg,
  PilotData,
} from "./components/Node/types";

export const useRaceData = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardMsg | null>(null);
  const [raceStatus, setRaceStatus] = useState<RaceStatusMsg>();
  const [currentLaps, setCurrentLaps] = useState<
    CurrentLapMsg["current"]["node_index"]
  >([]);
  const [frequencies, setFrequencies] = useState<{ fdata: any[] }>({
    fdata: [],
  });
  const [pilotsData, setPilotsData] = useState<PilotData | null>(null);

  useEffect(() => {
    // ЕДИНСТВЕННЫЙ запрос на загрузку данных при старте
    socket.emit("load_data", {
      load_types: [
        "leaderboard",
        "result_data",
        "heat_data",
        "class_data",
        "pilot_data",
        "frequency_data",
        "current_laps",
        "race_status",
      ],
    });

    const onLeaderBoard = (msg: LeaderboardMsg) => {
      setLeaderboard(msg);
      // Запрашиваем пилотов только если лидерборд обновился
      socket.emit("load_data", { load_types: ["pilot_data"] });
    };

    // ... остальной маппинг слушателей
    socket.on("leaderboard", onLeaderBoard);
    socket.on("race_status", setRaceStatus);
    const onCurrentLaps = (msg: CurrentLapMsg) =>
      setCurrentLaps(msg.current.node_index);
    socket.on("current_laps", onCurrentLaps);
    socket.on("frequency_data", setFrequencies);
    socket.on("pilot_data", setPilotsData);

    return () => {
      socket.off("leaderboard", onLeaderBoard);
      socket.off("race_status", setRaceStatus);
      socket.off("current_laps", onCurrentLaps);
      socket.off("frequency_data", setFrequencies);
      socket.off("pilot_data", setPilotsData);
      // ... отписываемся от остального
    };
  }, []);

  return { leaderboard, raceStatus, currentLaps, frequencies, pilotsData };
};
