import { useQuery } from "react-query";

import { getArticles } from "../api/api";

const useArticles = () => useQuery("articles", () => getArticles());

export default useArticles;
