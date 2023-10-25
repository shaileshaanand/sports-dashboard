import { useQuery } from "react-query";

import { getMatches } from "../api/api";

const useMatches = () => useQuery("matches", () => getMatches());

export default useMatches;
