import { Anchor } from "@mantine/core";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <>
      <h1>Sports Dashboard</h1>
      <Anchor component={Link} to="/signout">
        Logout
      </Anchor>
    </>
  );
}
