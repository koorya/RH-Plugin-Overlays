import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import type { Heat } from "./Heat";

export const useNextHeat = () => {
  const [nextHeatData, setNextHeatData] = useState<Heat>();

  useEffect(() => {
    let heatData: { heats: Heat[] } | undefined;
    const onNextHeatData = function (next_heat_data: {
      displayEmpty: boolean;
      nextHeatId: number;
    }) {
      if (!next_heat_data?.displayEmpty && heatData) {
        const nextRace = heatData.heats.find(
          ({ id }) => id === next_heat_data.nextHeatId,
        );
        setNextHeatData(nextRace);
      }
    };

    socket.on("next_heat_data", onNextHeatData);

    const onLeaderboard = function (msg: { current: { heat: Heat } }) {
      const race = msg.current;
      console.log("onLeaderboard", msg.current);
      socket.emit("get_next_heat", race.heat);
    };
    socket.on("leaderboard", onLeaderboard);

    const onHeatsLoad = (msg: { heats: Heat[] }) => {
      heatData = msg;
      console.log("heatdata: ", heatData);
    };
    socket.on("heat_data", onHeatsLoad);

    socket.emit("load_data", {
      load_types: ["leaderboard", "heat_data"],
    });

    return () => {
      socket.off("next_heat_data", onNextHeatData);

      socket.off("leaderboard", onLeaderboard);
      socket.off("heat_data", onHeatsLoad);
    };
  }, []);
  return nextHeatData;
};
