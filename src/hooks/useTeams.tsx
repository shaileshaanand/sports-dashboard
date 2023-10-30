import { useQuery } from "react-query";

import { getTeams } from "../api/api";

const useTeams = () => useQuery("teams", () => getTeams());

export default useTeams;
