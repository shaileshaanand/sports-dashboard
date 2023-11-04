import { Skeleton, Space, Stack, useMantineTheme } from "@mantine/core";

const LiveMatchCardSkeletonBase = () => {
  const theme = useMantineTheme();
  return (
    <Stack gap="xs">
      <Skeleton h={30} animate />
      <Skeleton h={theme.fontSizes.sm} animate />
      <Skeleton h={theme.fontSizes.sm} animate />
      <Skeleton h={theme.fontSizes.md} animate />
      <Skeleton h={theme.fontSizes.md} animate />
      <Space h={8.5} />
      <Skeleton h={theme.fontSizes.sm} animate />
    </Stack>
  );
};

export default LiveMatchCardSkeletonBase;
