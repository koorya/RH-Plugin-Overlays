import BackgroundImage from "./assets/dvr-overlay-mn.svg?react";
import { DVRNodes } from "./components/Node/Node.styles";
import { useRaceData } from "./useRaceData";
import { Node } from "./components/Node/Node";

export function App() {
  const globalData = useRaceData();
  const nodes = [0, 1, 2, 3];
  return (
    <>
      <div className="overlay-container">
        <BackgroundImage className="overlay-background" />

        <div className="overlay-content">
          <DVRNodes>
            {nodes.map((n) => (
              <Node key={n} N={n} globalData={globalData} />
            ))}
          </DVRNodes>
        </div>
      </div>
    </>
  );
}
