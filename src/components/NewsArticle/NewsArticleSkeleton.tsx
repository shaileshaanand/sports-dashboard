import { Box, Flex, Skeleton, useMantineTheme } from "@mantine/core";
import React from "react";

import NewsArticlePaper from "./NewsArticlePaper";

const NewsArticleSkeleton = () => {
  const theme = useMantineTheme();

  return (
    <NewsArticlePaper>
      <Flex>
        <Skeleton h={200} w={200} animate />
        <Flex
          direction="column"
          justify="space-between"
          style={{ flexGrow: 1 }}
          px={20}
          pb="md"
        >
          <Box w="100%">
            <Skeleton mt="xs" h={theme.fontSizes.xl} animate />
            <Skeleton mt="lg" h={theme.fontSizes.md} animate />
          </Box>
          <Flex justify="space-between" w="100%" align="end">
            <Skeleton h={theme.fontSizes.xl} w={325} animate />
            <Skeleton h={35} w={105} animate />
          </Flex>
        </Flex>
      </Flex>
    </NewsArticlePaper>
  );
};

export default NewsArticleSkeleton;
