import { useQuery } from "@tanstack/react-query";

import { getSports } from "../api/api";

const useSports = () =>
  useQuery({
    queryKey: ["sports"],
    queryFn: () => getSports(),
  });

export default useSports;
