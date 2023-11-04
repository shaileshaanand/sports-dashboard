import { useQuery } from "@tanstack/react-query";

import { getArticles } from "../api/api";

const useArticles = () =>
  useQuery({
    queryKey: ["articles"],
    queryFn: () => getArticles(),
  });

export default useArticles;
