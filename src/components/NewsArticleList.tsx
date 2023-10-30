import { Stack } from "@mantine/core";

import { ArticleList } from "../types";

import NewsArticle from "./NewsArticle";

const NewsArticleList = ({
  articleList,
  showSport = false,
}: {
  articleList: ArticleList;
  showSport?: boolean;
}) => (
  <Stack gap={20} p={20}>
    {articleList.map((article) => (
      <NewsArticle article={article} showShport={showSport} key={article.id} />
    ))}
  </Stack>
);

export default NewsArticleList;
