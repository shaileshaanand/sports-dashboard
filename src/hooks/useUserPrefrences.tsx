import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

import { getUserPreferences } from "../api/api";
import { UserPreferences } from "../types";

const useUserPrefrences = (
  options: Omit<
    UndefinedInitialDataOptions<
      UserPreferences,
      Error,
      UserPreferences,
      string[]
    >,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: ["userPrefrences"],
    queryFn: () => getUserPreferences(),
    ...options,
  });

export default useUserPrefrences;
