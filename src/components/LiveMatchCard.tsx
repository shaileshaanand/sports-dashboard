import {
  ActionIcon,
  Box,
  Flex,
  Paper,
  Skeleton,
  Space,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconClock, IconRefresh } from "@tabler/icons-react";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useQuery } from "react-query";

import { getMatch } from "../api/api";
import classes from "../styles.module.css";

const LiveMatchCard = ({
  matchId,
  loading = false,
}: {
  matchId: number;
  loading?: boolean;
}) => {
  const { data, refetch, isFetching } = useQuery(["liveMatch", matchId], () =>
    getMatch(matchId)
  );

  const theme = useMantineTheme();

  return (
    <Paper shadow="md" px="md" py="xs" radius="md" withBorder w={250}>
      {data && !loading ? (
        <Stack gap="xs">
          <Flex align="center" justify="space-between">
            <Text fw="bold">{data.sportName}</Text>
            <ActionIcon onClick={() => refetch()}>
              <IconRefresh
                className={isFetching ? classes.rotating : undefined}
              />
            </ActionIcon>
          </Flex>
          <Text size="sm" c="dimmed">
            {data.name}
          </Text>
          <Box>
            <Flex justify="space-between">
              <Text fs="italic">{data.teams[0].name}</Text>
              <Text>{data.score[data.teams[0].name]}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fs="italic">{data.teams[1].name}</Text>
              <Text>{data.score[data.teams[1].name]}</Text>
            </Flex>
          </Box>
          <Flex gap={4}>
            <Text c="dimmed">
              <IconClock size={15} />
            </Text>
            <Text size="sm" c="dimmed">
              {formatDistanceToNow(new Date(data.endsAt))} left
            </Text>
          </Flex>
        </Stack>
      ) : (
        <Stack gap="xs">
          <Skeleton h={30} animate />
          <Skeleton h={theme.fontSizes.sm} animate />
          <Skeleton h={theme.fontSizes.sm} animate />
          <Skeleton h={theme.fontSizes.md} animate />
          <Skeleton h={theme.fontSizes.md} animate />
          <Space h={8.5} />
          <Skeleton h={theme.fontSizes.sm} animate />
        </Stack>
      )}
    </Paper>
  );
};

export default LiveMatchCard;
