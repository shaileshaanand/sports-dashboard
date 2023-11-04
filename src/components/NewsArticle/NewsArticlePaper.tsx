import { Paper } from "@mantine/core";
import React from "react";

const NewsArticlePaper = ({ children }: React.PropsWithChildren) => (
  <Paper withBorder radius="md" shadow="sm">
    {children}
  </Paper>
);

export default NewsArticlePaper;
