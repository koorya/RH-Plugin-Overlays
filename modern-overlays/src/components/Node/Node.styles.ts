import styled from "@emotion/styled";

export const Channel = styled.div`
  font-weight: 900;
  font-size: 44px;
  font-family: Inter;
  color: #fff;
  margin-left: 10px;
`;
export const Position = styled.div`
  position: relative;
  top: 2px;
  font-weight: 500;
  font-size: 48px;
  font-family: teko;
  color: #040404;
  width: 50px;
  height: 75px;
  sup {
    vertical-align: super;
    font-size: 18px;
    position: relative;
    left: -10px;
  }
`;

export const DVRNodes = styled.div`
  margin-left: 32px;
  margin-top: 3px;
  max-width: 1380px;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  row-gap: 6px;
`;

export const FrameContainer = styled.div`
  width: 676px;
  height: 461px;
  /* border: solid red 1px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const FrameTopPanel = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-start;
`;
export const FrameBottomPanel = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const NodeAvatar = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background-color: #b9b9b9;
  margin-left: 20px;
  overflow: hidden;
`;

export const NodeAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PilotFlag = styled.img`
  width: 36px;
  height: 18px;
  font-size: 24px;
  box-shadow: 0 0 0px 2px #fff;

  margin-left: 5px;
  margin-bottom: 20px;
  align-self: flex-end;
  transform: rotate(0.15turn);
`;

export const CallSign = styled.div`
  font-weight: 800;
  font-size: 26px;
  font-family: Inter;
  color: rgb(21, 21, 78);
  margin-left: 10px;
  margin-right: 20px;
`;
export const RankStat = styled.div`
  font-size: 20px;
  position: relative;
  bottom: 2px;
  margin-right: 10px;
  width: 120px;
  text-align: right;
  font-family: Inter;
`;
export const LapStatus = styled.div`
  font-size: 20px;
  line-height: 1;
  margin-left: auto;
  margin-right: 30px;
  overflow-wrap: normal;
  text-transform: uppercase;
  font-family: Inter;
`;
export const DisplayedLaps = styled.div`
  height: 300px;
  width: 200px;
  overflow: hidden;
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 0 4px #000;

  font-family: "Barlow", sans-serif;
  font-variant-numeric: tabular-nums;
  margin-right: 20px;
`;

export const DisplayedLapsRow = styled.div`
  display: flex;
  justify-content: end;
`;
