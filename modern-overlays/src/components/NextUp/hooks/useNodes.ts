import { useEffect, useState } from "react";
import { socket } from "../../../socket";

export const useNodes = () => {
  const [nodes, setNodes] = useState<{
    fdata: (
      | {
          band: string;
          channel: number;
          frequency: number;
        }
      | {
          band: number;
          channel: number;
          frequency: number;
        }
    )[];
  }>();
  useEffect(() => {
    socket.on("frequency_data", setNodes);
    socket.emit("load_data", {
      load_types: ["frequency_data"],
    });

    return () => {
      socket.off("frequency_data", setNodes);
    };
  }, []);
  return nodes;
};
