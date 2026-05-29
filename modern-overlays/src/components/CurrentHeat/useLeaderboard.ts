import { useEffect, useState } from "react";
import { socket } from "../../socket";
export const useLeaderboard = () => {
  const [leaderboard, setLeaderBoard] = useState();
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
