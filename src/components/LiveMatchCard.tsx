import { ActionIcon, Flex, Paper, Space, Text } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import React from "react";
import { useQuery } from "react-query";

import { getMatch } from "../api/api";
import classes from "../styles.module.css";

const LiveMatchCard = ({ matchId }: { matchId: number }) => {
  const { data, refetch, isFetching } = useQuery(["liveMatch", matchId], () =>
    getMatch(matchId)
  );

  return data ? (
    <Paper shadow="md" p="md" radius="md" withBorder maw={250}>
      <Flex align="center" justify="space-between">
        <Text fw="bold">{data.sportName}</Text>
        <ActionIcon onClick={() => refetch()}>
          <IconRefresh className={isFetching ? classes.rotating : undefined} />
        </ActionIcon>
      </Flex>
      <Text size="sm" c="dimmed">
        {data.name}
      </Text>
      <Space h="xs" />
      <Flex justify="space-between">
        <Text fs="italic">{data.teams[0].name}</Text>
        <Text>{data.score[data.teams[0].name]}</Text>
      </Flex>
      <Flex justify="space-between">
        <Text fs="italic">{data.teams[1].name}</Text>
        <Text>{data.score[data.teams[1].name]}</Text>
      </Flex>
    </Paper>
  ) : (
    <Text>Loading...</Text>
  );
};

export default LiveMatchCard;
