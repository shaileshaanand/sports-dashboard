import { Anchor, AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet } from "react-router-dom";

import { useAppStore } from "../state/store";

const Layout = () => {
  const [opened, { toggle }] = useDisclosure();
  const isLoggedIn = !!useAppStore((state) => state.authToken);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Title>Sports Dashboard</Title>
            {isLoggedIn ? (
              <Group ml="xl" visibleFrom="sm">
                <Anchor component={Link} to="/settings">
                  Settings
                </Anchor>
                <Anchor component={Link} to="/signout">
                  Logout
                </Anchor>
              </Group>
            ) : (
              <Group ml="xl" visibleFrom="sm">
                <Anchor component={Link} to="/signin">
                  Login
                </Anchor>
                <Anchor component={Link} to="/signup">
                  Signup
                </Anchor>
              </Group>
            )}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Anchor component={Link} to="/settings">
          Settings
        </Anchor>
        <Anchor component={Link} to="/signout">
          Logout
        </Anchor>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
