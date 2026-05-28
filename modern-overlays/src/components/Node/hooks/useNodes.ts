import { useMemo } from "react";
import type { CurrentLapMsg, RaceStatusMsg } from "../types";

// N (streamnode), данные о кругах, статусе гонки и минимальном времени передаются как аргументы
export const useNodeLaps = (
  N: number,
  node_indexes: CurrentLapMsg["current"]["node_index"],
  raceStatus: RaceStatusMsg | undefined,
  minLapSec: number,
) => {
  //   // Стейт для обработанного списка кругов
  //   const [displayLaps, setDisplayLaps] = useState<
  //     ({
  //       displayNumber: unknown;
  //       isHoleShot: unknown;
  //       isFastest: unknown;
  //       isMinLapWarning: unknown;
  //       displayTimeFromRH: unknown;
  //       fullLapTimeStr: unknown;
  //     } & CurrentLapMsg["current"]["node_index"][0]["laps"][0])[]
  //   >([]);
  //   // Стейт для текстового статуса пилота (First Lap, FINISHED и т.д.)
  //   const [lapStatusText, setLapStatusText] = useState("");

  return useMemo(() => {
    let lapStatusText;
    // Проверяем наличие необходимых данных (аналог if (current_laps && rotorhazard.event.race_status))
    if (!raceStatus) {
      return;
    }

    const nodeIndex = node_indexes[N];
    if (!nodeIndex || !nodeIndex.laps) {
      return;
    }

    // Берем последние 10 кругов без мутации оригинального массива
    const recentLaps = nodeIndex.laps.slice(-10);

    // Обрабатываем каждый круг и сохраняем нужные флаги прямо в объект круга
    const processedLaps = recentLaps.map((lap) => {
      const lapTimeFromRH = lap.lap_time_formatted || lap.lap_time;
      let fullLapTimeStr = lapTimeFromRH;

      // Логика формирования строки со сплитами, если они есть
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
        ...lap, // Сохраняем исходные поля JSON на всякий случай
        displayNumber: lap.lap_number === 0 ? "HS" : lap.lap_number,
        isHoleShot: lap.lap_number === 0,
        isFastest: lap.lap_index === nodeIndex.fastest_lap_index,
        isMinLapWarning: (lap.lap_raw || lap.lap_time) < minLapSec * 1000,
        displayTimeFromRH: lapTimeFromRH,
        fullLapTimeStr: fullLapTimeStr, // Время + сплиты
      };
    });

    // 1. Сохраняем круги в стейт
    // setDisplayLaps(processedLaps);
    const displayLaps = processedLaps;
    console.log(displayLaps);

    // 2. Вычисляем и сохраняем текстовый статус
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

      // Если кругов больше 6, можно выводить дефолтный текст или оставить пустым
      lapStatusText =
        statusMap[recentLaps.length] || `Lap ${recentLaps.length}`;
    }
    return { displayLaps, lapStatusText };
  }, [N, node_indexes, raceStatus, minLapSec]); // Пересчитываем стейт при обновлении этих пропсов

  // Возвращаем стейты наружу
};
