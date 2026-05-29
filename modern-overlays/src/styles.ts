import styled from "@emotion/styled";

export const OverlayContainer = styled.div`
  width: 1920px;
  height: 1080px;
  position: relative;
  overflow: hidden;
`;

export const OverlayContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
`;
