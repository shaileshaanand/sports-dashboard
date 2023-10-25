import { Anchor, Flex } from "@mantine/core";
import { Link } from "react-router-dom";

import LiveMatchCard from "../components/LiveMatchCard";
import useMatches from "../hooks/useMatches";

export function HomePage() {
  const { data } = useMatches();

  return (
    <>
      <h1>Sports Dashboard</h1>
      <Flex gap={10}>
        {data?.matches &&
          data.matches
            .filter((match: any) => match.isRunning === true)
            .map((match: any) => (
              <LiveMatchCard matchId={match.id} key={match.id} />
            ))}
      </Flex>
      <Anchor component={Link} to="/signout">
        Logout
      </Anchor>
    </>
  );
}
