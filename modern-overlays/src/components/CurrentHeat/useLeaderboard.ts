import { useEffect, useState } from "react";
import { socket } from "../../socket";
import type { Leaderboard } from "./Leaderboard";

export const useLeaderboard = () => {
  const [leaderboard, setLeaderBoard] = useState<Leaderboard>();
  useEffect(() => {
    socket.on("leaderboard", setLeaderBoard);

    socket.emit("load_data", {
      load_types: ["leaderboard"],
    });
    return () => {
      socket.off("leaderboard", setLeaderBoard);
    };
  }, []);
  return leaderboard;
};
