import styled from "@emotion/styled";

export const Container = styled.div`
  width: 1618px;
  height: 92px;

  /* border: solid 1px red; */
  margin-top: 0px;
  margin-left: 270px;
  display: flex;
  align-items: center;
`;

export const HeatName = styled.div`
  /* border: solid 1px red; */
  font-weight: 800;
  font-size: 54px;
  text-transform: uppercase;
  font-family: Inter;
  color: #16546c;
  margin-left: 24px;
`;

export const PilotsContainer = styled.div`
  border-left: solid 6px #e8d3a7;
  height: 65%;

  display: flex;
  align-items: center;
  margin-left: 14px;
`;
export const PilotBlock = styled.div`
  padding: 0 14px;
  letter-spacing: -2px;
  border-right: solid 6px #d62821;
  height: 70%;

  display: flex;
  align-items: center;

  font-weight: 800;
  font-size: 36px;
  font-family: Inter;
  color: #16546c;

  &:last-child {
    border: none;
  }
`;

export const Channel = styled.div`
  color: white;
  background-color: ${(props) => props.color || "red"};
  width: 50px;
  height: 50px;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-left: 10px;
`;
