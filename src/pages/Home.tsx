import { Anchor, Box, Group, Tabs, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

import LiveMatchCard from "../components/LiveMatchCard";
import NewsArticleList from "../components/NewsArticleList";
import useArticles from "../hooks/useArticles";
import useMatches from "../hooks/useMatches";
import useSports from "../hooks/useSports";

export function HomePage() {
  const { data: matchList } = useMatches();
  const { data: sportsList } = useSports();
  const { data: articleList } = useArticles();

  return (
    <>
      <h1>Sports Dashboard</h1>
      <Box component="section">
        <Title order={2}>Live Matches</Title>
        <Group gap={10}>
          {matchList?.matches &&
            matchList.matches
              .filter((match) => match.isRunning)
              .map((match) => (
                <LiveMatchCard matchId={match.id} key={match.id} />
              ))}
        </Group>
      </Box>
      {sportsList && (
        <Box component="section" mt={20}>
          <Title order={2} pb={10}>
            Trending Matches
          </Title>
          <Tabs variant="outline" defaultValue="yournews">
            <Tabs.List>
              <Tabs.Tab value="yournews">Your News</Tabs.Tab>
              {sportsList?.sports.map((sport: any) => (
                <Tabs.Tab key={sport.id} value={sport.id.toString()}>
                  {sport.name}
                </Tabs.Tab>
              ))}
            </Tabs.List>
            <Tabs.Panel value="yournews">
              {articleList ? (
                <NewsArticleList articleList={articleList} showSport />
              ) : (
                <Text>Loading...</Text>
              )}
            </Tabs.Panel>
            {sportsList?.sports.map((sport) => (
              <Tabs.Panel key={sport.id} value={sport.id.toString()}>
                {articleList ? (
                  <NewsArticleList
                    articleList={articleList.filter(
                      (article) => article.sport.id === sport.id
                    )}
                  />
                ) : (
                  <Text>Loading...</Text>
                )}
              </Tabs.Panel>
            ))}
          </Tabs>
        </Box>
      )}
      <Anchor component={Link} to="/signout">
        Logout
      </Anchor>
    </>
  );
}
