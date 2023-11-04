import { useQuery } from "@tanstack/react-query";

import { getMatches } from "../api/api";

const useMatches = () =>
  useQuery({
    queryKey: ["matches"],
    queryFn: () => getMatches(),
  });

export default useMatches;
