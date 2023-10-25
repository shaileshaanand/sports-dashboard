import { ActionIcon, Paper } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import React from "react";
import { useQuery } from "react-query";

import { getMatch } from "../api/api";

const LiveMatchCard = ({ matchId }: { matchId: number }) => {
  const { isLoading, data, refetch } = useQuery(["liveMatch", matchId], () =>
    getMatch(matchId)
  );

  return !isLoading ? (
    <Paper shadow="md" p={6}>
      <p>{data.sportName}</p>
      <ActionIcon onClick={() => refetch()}>
        <IconRefresh />
      </ActionIcon>
      <p>{data.name}</p>
      <p>
        {data.teams[0].name}({data.score[data.teams[0].name]})
      </p>
      <p>
        {data.teams[1].name}({data.score[data.teams[1].name]})
      </p>
    </Paper>
  ) : (
    <p>Loading...</p>
  );
};

export default LiveMatchCard;
