import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { pathname } = useLocation();

  try {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      throw new Error();
    }
    JSON.parse(authToken);
  } catch (error) {
    return <Navigate to="/signin" replace state={{ referrer: pathname }} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
