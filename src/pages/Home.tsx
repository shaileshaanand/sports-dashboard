import {
  Anchor,
  Box,
  Button,
  Center,
  Grid,
  Group,
  Paper,
  Select,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LiveMatchCard from "../components/LiveMatchCard";
import NewsArticleList from "../components/NewsArticleList";
import useArticles from "../hooks/useArticles";
import useMatches from "../hooks/useMatches";
import useSports from "../hooks/useSports";
import useTeams from "../hooks/useTeams";

export function HomePage() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const { data: matchList } = useMatches();
  const { data: sportsList } = useSports();
  const { data: articleList } = useArticles();
  const { data: teamsList } = useTeams();

  const currentSportTeams = teamsList?.filter(
    (team) => team.plays === selectedSport
  );

  useEffect(() => {
    if (sportsList && teamsList) {
      setSelectedSport(sportsList.sports[0].name);
      setSelectedTeam(
        teamsList.filter((team) => team.plays === sportsList.sports[0].name)[0]
          ?.name ?? null
      );
    }
  }, [teamsList, sportsList]);

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
      <Title order={2} pb={10}>
        Trending News
      </Title>
      <Grid>
        {sportsList && (
          <Grid.Col span={9}>
            <Box component="section">
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
          </Grid.Col>
        )}
        {articleList && sportsList && teamsList && (
          <Grid.Col span={3}>
            <Box component="aside" p="md" bg="blue.1">
              <Center>
                <Title order={4}>Favorites</Title>
              </Center>
              <Stack gap="sm" mt="sm">
                <Select
                  placeholder="Select a sport"
                  searchable
                  data={sportsList.sports.map((sport) => sport.name)}
                  value={selectedSport}
                  onChange={(value) => {
                    setSelectedTeam(null);
                    setSelectedSport(value);
                  }}
                />
                <Select
                  placeholder="Select a team"
                  searchable
                  data={currentSportTeams?.map((team) => team.name)}
                  value={selectedTeam}
                  onChange={(value) => {
                    setSelectedTeam(value);
                  }}
                />
              </Stack>
              {articleList && (
                <Box py="sm">
                  <Stack gap="sm">
                    {articleList
                      .filter((article) =>
                        selectedTeam && article.teams
                          ? article.teams
                              .map((team) => team.name)
                              .includes(selectedTeam)
                          : false
                      )
                      .map((article) => (
                        <Paper key={article.id} withBorder p="xs">
                          <Stack>
                            <Text fw={700}>{article.title}</Text>
                            <Text>{article.summary}</Text>
                            <Button
                              fullWidth
                              component={Link}
                              to={`/article/${article.id}`}
                            >
                              Read more
                            </Button>
                          </Stack>
                        </Paper>
                      ))}
                  </Stack>
                </Box>
              )}
            </Box>
          </Grid.Col>
        )}
      </Grid>
      <Anchor component={Link} to="/signout">
        Logout
      </Anchor>
    </>
  );
}
