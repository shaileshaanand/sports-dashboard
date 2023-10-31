import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ArticleDetailModal from "./pages/ArticleDetailModal";
import { HomePage } from "./pages/Home";
import Signin from "./pages/Signin";
import Signout from "./pages/Signout";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "article/:articleId",
        element: <ArticleDetailModal />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signout",
    element: <Signout />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
