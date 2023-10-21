import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";

import { Router } from "./Router";
import { theme } from "./theme";

import "@mantine/notifications/styles.css";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={new QueryClient()}>
        <Notifications position="top-right" />
        <Router />
      </QueryClientProvider>
    </MantineProvider>
  );
}
