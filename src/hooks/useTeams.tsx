import { useQuery } from "@tanstack/react-query";

import { getTeams } from "../api/api";

const useTeams = () =>
  useQuery({
    queryKey: ["teams"],
    queryFn: () => getTeams(),
  });

export default useTeams;
