import {
  Badge,
  Box,
  Flex,
  Group,
  Image,
  Modal,
  Pill,
  Skeleton,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { getArticle } from "../api/api";
import Time from "../components/Time";
import { Article, ArticleDetail, ArticleList } from "../types";

const articleToArticleDetail = (
  article?: Article
): ArticleDetail | undefined =>
  article
    ? {
        ...article,
        content: "",
      }
    : undefined;

const ArticleDetailModal = () => {
  const articleId = Number(useParams().articleId);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const theme = useMantineTheme();

  const { data } = useQuery<ArticleDetail>(
    ["article", articleId],
    () => getArticle(articleId),
    {
      placeholderData: () =>
        articleToArticleDetail(
          queryClient
            .getQueryData<ArticleList>("articles")
            ?.find((article) => article.id === articleId)
        ),
    }
  );

  return (
    <Modal
      opened
      centered
      size="85%"
      onClose={() => navigate(-1)}
      title={data ? data.title : "Loading.."}
      styles={{
        title: {
          fontWeight: theme.headings.fontWeight,
          fontSize: theme.headings.sizes.h3.fontSize,
        },
      }}
    >
      <>
        <Box h={400} mb="md">
          <Image src={data?.thumbnail} fit="cover" h={400} />
        </Box>
        <Stack>
          <Flex align="center" justify="space-between">
            {data?.sport && <Badge>{data.sport.name}</Badge>}
            {data?.teams && data.teams.length > 0 && (
              <Group>
                {data.teams.map((team) => (
                  <Pill key={team.id}>{team.name}</Pill>
                ))}
              </Group>
            )}
          </Flex>
          {data ? (
            data.content.length > 0 ? (
              <Text>{data.content}</Text>
            ) : (
              <>
                <Text>{data.summary}</Text>
                <Skeleton h={theme.fontSizes.md} animate />
                <Skeleton h={theme.fontSizes.md} animate />
                <Skeleton h={theme.fontSizes.md} animate />
                <Skeleton h={theme.fontSizes.md} animate />
                <Skeleton h={theme.fontSizes.md} animate />
                <Skeleton h={theme.fontSizes.md} animate />
              </>
            )
          ) : (
            <>
              <Skeleton h={theme.fontSizes.md} animate />
              <Skeleton h={theme.fontSizes.md} animate />
              <Skeleton h={theme.fontSizes.md} animate />
              <Skeleton h={theme.fontSizes.md} animate />
              <Skeleton h={theme.fontSizes.md} animate />
              <Skeleton h={theme.fontSizes.md} animate />
            </>
          )}

          {data?.date && <Time date={data.date} />}
        </Stack>
      </>
    </Modal>
  );
};

export default ArticleDetailModal;
