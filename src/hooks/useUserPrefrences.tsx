import { useQuery } from "@tanstack/react-query";

import { getUserPreferences } from "../api/api";

const useUserPrefrences = () =>
  useQuery({
    queryKey: ["userPrefrences"],
    queryFn: () => getUserPreferences(),
  });

export default useUserPrefrences;
