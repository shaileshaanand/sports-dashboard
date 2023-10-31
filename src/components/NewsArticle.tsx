import {
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Image,
  Paper,
  Pill,
  Text,
} from "@mantine/core";
import { Link } from "react-router-dom";

import { Article } from "../types";

import Time from "./Time";

const NewsArticle = ({
  article,
  showShport,
}: {
  article: Article;
  showShport: boolean;
}) => (
  <Paper withBorder radius="md" shadow="sm">
    <Flex>
      <Box h={200} w={200}>
        <Image
          h={200}
          w={200}
          src={article.thumbnail}
          alt={article.title}
          fit="cover"
        />
      </Box>
      <Box
        px={20}
        style={{
          flexGrow: 1,
        }}
      >
        <Flex
          direction="column"
          justify="space-between"
          style={{
            height: "100%",
          }}
        >
          <Box>
            <Flex justify="space-between" align="center">
              <Text fw={500} mt="xs">
                {article.title}
              </Text>
              {showShport && <Badge size="sm">{article.sport.name}</Badge>}
            </Flex>
            <Text mt="xs" c="dimmed">
              {article.summary}
            </Text>
          </Box>
          <Box pb="md">
            <Group mb="xs">
              {article.teams.map((team) => (
                <Pill key={team.id}>{team.name}</Pill>
              ))}
            </Group>
            <Flex justify="space-between" align="end">
              {article?.date && <Time date={article.date} />}
              <Button
                component={Link}
                to={`/article/${article.id}`}
                variant="outline"
              >
                Read More
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  </Paper>
);

export default NewsArticle;
