import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { useAppStore } from "../state/store";

const Signout = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const setAuthToken = useAppStore((state) => state.setAuthToken);
  useEffect(() => {
    setAuthToken(undefined);
    setLoggedOut(true);
  }, []);
  return loggedOut ? <Navigate to="/" /> : <></>;
};

export default Signout;
