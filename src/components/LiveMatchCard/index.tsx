import { ActionIcon, Box, Flex, Stack, Text } from "@mantine/core";
import { IconClock, IconRefresh } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

import { getMatch } from "../../api/api";
import classes from "../../styles.module.css";

import LiveMatchCardPaper from "./LiveMatchCardPaper";
import LiveMatchCardSkeletonBase from "./LiveMatchCardSkeleton/LiveMatchCardSkeletonBase";

const LiveMatchCard = ({
  matchId,
  loading = false,
}: {
  matchId: number;
  loading?: boolean;
}) => {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["liveMatch", matchId],
    queryFn: () => getMatch(matchId),
  });

  return (
    <LiveMatchCardPaper>
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
        <LiveMatchCardSkeletonBase />
      )}
    </LiveMatchCardPaper>
  );
};

export default LiveMatchCard;
