import { useNextUp } from "./hooks/useNextUp";
import * as N from "./NextUp.styles";

export const NextUp = () => {
  const { nextHeat, slots } = useNextUp();
  const channelColors = ["#d62821", "#16546c", "#48bbde", "#dbba74"];
  return (
    <N.Container>
      <N.HeatName>
        {nextHeat
          ? nextHeat.displayname + "/" + (nextHeat.next_round + 1)
          : "loading"}
      </N.HeatName>
      <N.PilotsContainer>
        {slots?.map((p, idx) => (
          <N.PilotBlock key={idx}>
            {p.pilot?.callsign}
            <N.Channel color={channelColors[idx]}>{p.freq}</N.Channel>
          </N.PilotBlock>
        ))}
      </N.PilotsContainer>
    </N.Container>
  );
};
