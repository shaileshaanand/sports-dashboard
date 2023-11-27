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
import { Link, Outlet } from "react-router-dom";

import LiveMatchCard from "../components/LiveMatchCard";
import LiveMatchCardSkeleton from "../components/LiveMatchCard/LiveMatchCardSkeleton";
import NewsArticleList from "../components/NewsArticleList";
import useArticles from "../hooks/useArticles";
import useMatches from "../hooks/useMatches";
import useSports from "../hooks/useSports";
import useTeams from "../hooks/useTeams";
import useUserPrefrences from "../hooks/useUserPrefrences";
import { useAppStore } from "../state/store";
import { Sport, Team } from "../types";

export function HomePage() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const { data: matchList } = useMatches();
  const { data: sportsList } = useSports();
  const { data: articleList } = useArticles();
  const { data: teamsList } = useTeams();

  const isLoggeedIn = !!useAppStore((state) => state.authToken);
  const { data: userPreferences } = useUserPrefrences({
    enabled: isLoggeedIn,
  });

  const currentSportTeams = teamsList?.filter(
    (team) => team.plays === selectedSport
  );

  useEffect(() => {
    if (sportsList && teamsList) {
      setSelectedSport(
        isLoggeedIn
          ? (
              sportsList.sports.find(
                (sport) =>
                  userPreferences?.preferences.favoriteSports[0] === sport.id
              ) as Sport
            ).name
          : sportsList.sports[0].name
      );
      setSelectedTeam(
        teamsList.filter(
          (team) =>
            team.plays ===
            (isLoggeedIn
              ? (
                  sportsList.sports.find(
                    (sport) =>
                      userPreferences?.preferences.favoriteSports[0] ===
                      sport.id
                  ) as Sport
                ).name
              : sportsList.sports[0].name)
        )[0]?.name ?? null
      );
    }
  }, [teamsList, sportsList]);

  return (
    <>
      <Box component="section" pb="md">
        <Title order={2} mb="sm">
          Live Matches
        </Title>
        <Group gap={10}>
          {matchList?.matches && (isLoggeedIn ? userPreferences : true) ? (
            matchList.matches
              .filter(
                (match) =>
                  match.isRunning &&
                  (isLoggeedIn
                    ? userPreferences?.preferences.favoriteTeams.some(
                        (teamId) =>
                          match.teams.map((t) => t.id).includes(teamId)
                      )
                    : true)
              )
              .sort(
                (a, b) =>
                  new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime()
              )
              .slice(0, 4) // only show last 5 matches
              .map((match) => (
                <LiveMatchCard matchId={match.id} key={match.id} />
              ))
          ) : (
            <>
              <LiveMatchCardSkeleton />
              <LiveMatchCardSkeleton />
              <LiveMatchCardSkeleton />
              <LiveMatchCardSkeleton />
            </>
          )}
        </Group>
      </Box>
      <Title order={2} pb={10}>
        Trending News
      </Title>
      <Grid>
        <Grid.Col span={9}>
          <Box component="section">
            <Tabs
              variant="outline"
              defaultValue={
                isLoggeedIn ? "yournews" : sportsList?.sports[0].id.toString()
              }
            >
              <Tabs.List>
                {isLoggeedIn && <Tabs.Tab value="yournews">Your News</Tabs.Tab>}
                {sportsList?.sports.map((sport: any) => (
                  <Tabs.Tab key={sport.id} value={sport.id.toString()}>
                    {sport.name}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
              {isLoggeedIn && articleList && userPreferences && (
                <Tabs.Panel value="yournews">
                  <NewsArticleList
                    articleList={articleList.filter((article) =>
                      userPreferences.preferences.favoriteTeams.some((team) =>
                        article.teams.map((t) => t.id).includes(team)
                      )
                    )}
                    showSport
                  />
                </Tabs.Panel>
              )}
              {sportsList?.sports.map((sport) => (
                <Tabs.Panel key={sport.id} value={sport.id.toString()}>
                  <NewsArticleList
                    articleList={articleList?.filter(
                      (article) => article.sport.id === sport.id
                    )}
                  />
                </Tabs.Panel>
              ))}
            </Tabs>
          </Box>
        </Grid.Col>
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
                  data={
                    isLoggeedIn
                      ? userPreferences?.preferences.favoriteSports
                          .map(
                            (sportId) =>
                              sportsList?.sports.find(
                                (sport) => sport.id === sportId
                              )
                          )
                          .map((sport) => (sport as Sport).name)
                      : sportsList.sports.map((sport) => sport.name)
                  }
                  value={selectedSport}
                  onChange={(value) => {
                    setSelectedTeam(null);
                    setSelectedSport(value);
                  }}
                />
                <Select
                  placeholder="Select a team"
                  searchable
                  data={
                    isLoggeedIn
                      ? userPreferences?.preferences.favoriteTeams
                          .filter(
                            (teamId) =>
                              currentSportTeams
                                ?.map((team) => team.id)
                                .includes(teamId)
                          )
                          .map((teamId) =>
                            teamsList.find((team) => team.id === teamId)
                          )
                          .map((team) => (team as Team).name)
                      : currentSportTeams?.map((team) => team.name)
                  }
                  value={selectedTeam}
                  onChange={(value) => {
                    setSelectedTeam(value);
                  }}
                />
              </Stack>

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
            </Box>
          </Grid.Col>
        )}
      </Grid>
      <Anchor component={Link} to="/signout">
        Logout
      </Anchor>
      <Outlet />
    </>
  );
}
