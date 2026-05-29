import { useEffect, useState } from "react";
import { socket } from "../../../socket";

export const usePilotData = () => {
  const [pilotData, setPilotData] = useState<{
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
  }>();
  useEffect(() => {
    socket.on("pilot_data", setPilotData);
    socket.emit("load_data", {
      load_types: ["pilot_data"],
    });

    return () => {
      socket.off("pilot_data", setPilotData);
    };
  }, []);
  return pilotData?.pilots;
};
