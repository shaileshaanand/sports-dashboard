import { Flex, Text } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import { format, formatDistanceToNow } from "date-fns";

const Time = ({ date }: { date: string }) => (
  <Flex gap="xs">
    <IconClock />
    <Text>
      {format(new Date(date), "h:mm a do MMM, yyyy")} (
      {formatDistanceToNow(new Date(date))} ago)
    </Text>
  </Flex>
);

export default Time;
