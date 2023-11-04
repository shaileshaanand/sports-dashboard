import { Paper } from "@mantine/core";
import React from "react";

const LiveMatchCardPaper = ({ children }: React.PropsWithChildren) => (
  <Paper shadow="md" px="md" py="xs" radius="md" withBorder w={250}>
    {children}
  </Paper>
);

export default LiveMatchCardPaper;
