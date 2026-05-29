import { useEffect, useState } from "react";
import { socket } from "../../socket";

export const useClass = () => {
  const [rhClass, setRhClass] = useState<unknown>();
  useEffect(() => {
    socket.on("class_data", setRhClass);
    socket.emit("load_data", {
      load_types: ["class_data"],
    });

    return () => {
      socket.off("class_data", setRhClass);
    };
  }, []);
  return rhClass;
};
