import { Stack } from "@mantine/core";

import { ArticleList } from "../types";

import NewsArticle from "./NewsArticle";
import NewsArticleSkeleton from "./NewsArticle/NewsArticleSkeleton";

const NewsArticleList = ({
  articleList,
  showSport = false,
}: {
  articleList: ArticleList | undefined;
  showSport?: boolean;
}) => (
  <Stack gap={20} p={20}>
    {articleList ? (
      articleList.length > 0 ? (
        articleList.map((article) => (
          <NewsArticle
            article={article}
            showShport={showSport}
            key={article.id}
          />
        ))
      ) : (
        <p>No articles found</p>
      )
    ) : (
      <>
        <NewsArticleSkeleton />
        <NewsArticleSkeleton />
        <NewsArticleSkeleton />
      </>
    )}
  </Stack>
);

export default NewsArticleList;
