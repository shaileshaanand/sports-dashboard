import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";

import { Router } from "./Router";
import { theme } from "./theme";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={new QueryClient()}>
        <Router />
      </QueryClientProvider>
    </MantineProvider>
  );
}
