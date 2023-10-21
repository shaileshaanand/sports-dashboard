import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import { HomePage } from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
