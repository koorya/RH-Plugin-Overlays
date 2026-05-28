import { useMemo } from "react";
import type { CurrentLapMsg, RaceStatusMsg } from "../types";

// N (streamnode), данные о кругах, статусе гонки и минимальном времени передаются как аргументы
export const useNodeLaps = (
  N: number,
  node_indexes: CurrentLapMsg["current"]["node_index"],
  raceStatus: RaceStatusMsg | undefined,
  minLapSec: number,
) => {
  return useMemo(() => {
    let lapStatusText;
    if (!raceStatus) {
      return;
    }

    const nodeIndex = node_indexes[N];
    if (!nodeIndex || !nodeIndex.laps) {
      return;
    }

    const recentLaps = nodeIndex.laps.slice(-10);

    const processedLaps = recentLaps.map((lap) => {
      const lapTimeFromRH = lap.lap_time_formatted || lap.lap_time;
      let fullLapTimeStr = lapTimeFromRH;

      if (lap.splits && lap.splits.length > 0) {
        const splitsStr = lap.splits
          .map((split) => {
            return split.split_speed
              ? `${split.split_time}/${split.split_speed}`
              : split.split_time;
          })
          .join(", ");
        fullLapTimeStr += ` (${splitsStr})`;
      }

      return {
        ...lap,
        displayNumber: lap.lap_number === 0 ? "HS" : lap.lap_number,
        isHoleShot: lap.lap_number === 0,
        isFastest: lap.lap_index === nodeIndex.fastest_lap_index,
        isMinLapWarning: (lap.lap_raw || lap.lap_time) < minLapSec * 1000,
        displayTimeFromRH: lapTimeFromRH,
        fullLapTimeStr: fullLapTimeStr, // Время + сплиты
      };
    });

    const displayLaps = processedLaps;
    console.log(displayLaps);

    if (nodeIndex.finished_flag) {
      lapStatusText = "FINISHED";
    } else if (recentLaps.length === 0) {
      lapStatusText = "STARTING";
    } else {
      const statusMap = [
        "STARTING",
        "First Lap",
        "Second Lap",
        "Third Lap",
        "Fourth Lap",
        "Fifth Lap",
        "Sixth Lap",
      ];

      lapStatusText =
        statusMap[recentLaps.length] || `Lap ${recentLaps.length}`;
    }
    return { displayLaps, lapStatusText };
  }, [N, node_indexes, raceStatus, minLapSec]);
};
