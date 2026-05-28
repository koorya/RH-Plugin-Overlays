import { useState, useEffect, useMemo } from "react";
import * as S from "./Node.styles";

import { getFlagURL, getPilotImgURL } from "../../ddr_overlays";
import { HostUrl } from "../../HostUrl";
import type { useRaceData } from "../../useRaceData";
import { useNodeLaps } from "./hooks/useNodes";

export const Node = ({
  N,
  globalData,
}: {
  N: number;
  globalData: ReturnType<typeof useRaceData>;
}) => {
  const { leaderboard, raceStatus, currentLaps, frequencies, pilotsData } =
    globalData;

  const nodeLaps = useNodeLaps(N, currentLaps, raceStatus, 1);

  const pilotDataForNode = useMemo(() => {
    if (!leaderboard) return null;
    const race = leaderboard.current.leaderboard;
    const primary_leaderboard = race.meta.primary_leaderboard;
    const currentLeaderboard = race[primary_leaderboard];

    return currentLeaderboard.find((p) => p.node === N) || null;
  }, [leaderboard, N]);

  const posElement = useMemo(() => {
    if (!pilotDataForNode?.position) return <></>;
    const position = pilotDataForNode.position;
    const suffix = ["st", "nd", "rd", "th"][Math.max(position - 1, 3)];
    return (
      <>
        {position} <sup>{suffix}</sup>
      </>
    );
  }, [pilotDataForNode]);

  const rankStat = useMemo(() => {
    if (!leaderboard) return;

    const race = leaderboard.current.leaderboard;
    const primary_leaderboard = race.meta.primary_leaderboard;
    if (pilotDataForNode) {
      let rank_stat;
      if (primary_leaderboard == "by_fastest_lap") {
        rank_stat = pilotDataForNode.fastest_lap;
      } else if (primary_leaderboard == "by_consecutives") {
        rank_stat = pilotDataForNode.consecutives;
      } else {
        rank_stat = pilotDataForNode.laps + " / " + pilotDataForNode.total_time;
      }
      return rank_stat;
    }
  }, [leaderboard, pilotDataForNode]);

  const [pilotImage, setPilotImage] = useState(
    `${HostUrl}/ddr_overlays/static/imgs/no_avatar.png`,
  );
  const [pilotFlag, setPilotFlag] = useState(
    `${HostUrl}/ddr_overlays/static/imgs/flags/mn.jpg`,
  );

  useEffect(() => {
    if (!pilotDataForNode) return;

    let isMounted = true;

    getPilotImgURL(pilotDataForNode).then((url) => {
      if (isMounted) setPilotImage(url);
    });
    if (pilotsData) {
      getFlagURL(pilotDataForNode.pilot_id, pilotsData.pilots).then((url) => {
        if (isMounted) setPilotFlag(url);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [pilotDataForNode, pilotsData]);

  return (
    <S.FrameContainer>
      <S.FrameTopPanel>
        <S.Channel>
          {frequencies.fdata[N]?.band}
          {frequencies.fdata[N]?.channel}
        </S.Channel>
        <S.DisplayedLaps>
          {nodeLaps?.displayLaps.map((l) => (
            <S.DisplayedLapsRow key={l.lap_time}>
              {l.displayNumber}: {l.lap_time_formatted}
            </S.DisplayedLapsRow>
          ))}
        </S.DisplayedLaps>
      </S.FrameTopPanel>
      <S.FrameBottomPanel>
        <S.PilotFlag src={pilotFlag} />
        <S.NodeAvatar>
          <S.NodeAvatarImg src={pilotImage} />
        </S.NodeAvatar>
        <S.CallSign>{pilotDataForNode?.callsign}</S.CallSign>
        <S.LapStatus>{nodeLaps?.lapStatusText}</S.LapStatus>
        <S.RankStat>{rankStat}</S.RankStat>
        <S.Position>{posElement}</S.Position>
      </S.FrameBottomPanel>
    </S.FrameContainer>
  );
};
