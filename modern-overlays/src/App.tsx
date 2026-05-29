// import BackgroundImage from "./assets/dvr-overlay-mn-sample.svg?react";
// import BackgroundImage from "./assets/dvr-overlay-mn.svg?react";
import BackgroundImage from "./assets/dvr-overlay-mn-mirror.svg?react";
import { DVRNodes } from "./components/Node/Node.styles";
import { useRaceData } from "./useRaceData";
import { Node } from "./components/Node/Node";
import { NextUp } from "./components/NextUp/NextUp";
import { OverlayContainer, OverlayContent } from "./styles";
import { ClassName } from "./components/ClassName/ClassName";
import { CurrentHeat } from "./components/CurrentHeat/CurrentHeat";

export function App() {
  const globalData = useRaceData();
  const nodes = [0, 1, 2, 3];
  return (
    <>
      <OverlayContainer>
        <BackgroundImage className="overlay-background" />

        <OverlayContent>
          <ClassName />

          <CurrentHeat />
          <DVRNodes>
            {nodes.map((n) => (
              <Node key={n} N={n} globalData={globalData} />
            ))}
          </DVRNodes>
          <NextUp />
        </OverlayContent>
      </OverlayContainer>
    </>
  );
}
