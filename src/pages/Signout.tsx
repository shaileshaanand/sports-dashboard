import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Signout = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const setAuthToken = useLocalStorage({
    key: "auth_token",
    defaultValue: undefined,
  })[1];
  useEffect(() => {
    setAuthToken(undefined);
    setLoggedOut(true);
  }, []);
  return loggedOut ? <Navigate to="/" /> : <></>;
};

export default Signout;
