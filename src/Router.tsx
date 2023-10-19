import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage } from "./pages/Home";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
