import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Router } from "./Router";
import { theme } from "./theme";

import "@mantine/notifications/styles.css";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <QueryClientProvider client={new QueryClient()}>
          <Notifications position="top-right" />
          <Router />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
