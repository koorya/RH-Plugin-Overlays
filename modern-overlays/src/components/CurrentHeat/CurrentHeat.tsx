import * as CH from "./current-heat.styles";
import { useLeaderboard } from "./useLeaderboard";
export const CurrentHeat = () => {
  const leaderboard = useLeaderboard();
  return (
    <CH.Container>
      <CH.RaceTitle>
        {leaderboard?.current.displayname}/{leaderboard?.current.round}
      </CH.RaceTitle>
    </CH.Container>
  );
};
