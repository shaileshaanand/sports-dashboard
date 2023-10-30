import { useQuery } from "react-query";

import { getSports } from "../api/api";

const useSports = () => useQuery("sports", () => getSports());

export default useSports;
