import { Anchor, AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  const [opened, { toggle }] = useDisclosure();

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
            <Group ml="xl" visibleFrom="sm">
              <Anchor component={Link} to="/settings">
                Settings
              </Anchor>
              <Anchor component={Link} to="/logout">
                Logout
              </Anchor>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Anchor component={Link} to="/settings">
          Settings
        </Anchor>
        <Anchor component={Link} to="/logout">
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
