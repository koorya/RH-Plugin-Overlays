import { useNextHeat } from "./useNextHeat";
import { useNodes } from "./useNodes";
import { usePilotData } from "./usePilotData";

export const useNextUp = () => {
  const pilots = usePilotData();
  const nextHeat = useNextHeat();
  const freq = useNodes();

  const slots = nextHeat?.slots
    .map((slot, idx) => {
      return {
        pilot: pilots?.find(({ pilot_id }) => pilot_id === slot.pilot_id),
        freq: freq
          ? `${freq?.fdata[idx]?.band}${freq?.fdata[idx]?.channel}`
          : "",
        slot,
      };
    })
    .filter(({ pilot }) => pilot);
  return { nextHeat, slots };
};
