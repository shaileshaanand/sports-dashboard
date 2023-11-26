import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { updateUserPreferences } from "../api/api";
import { UserPreferences } from "../types";

const useUpdatePreferencesMutation = () => {
  const queryCLient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: UserPreferences) => updateUserPreferences(data),
    onSuccess: () => {
      queryCLient.invalidateQueries({ queryKey: ["userPrefrences"] });
      navigate(-1);
    },
  });
};

export default useUpdatePreferencesMutation;
