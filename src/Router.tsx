import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoadingModal from "./components/LoadingModal";
import ArticleDetailModal from "./pages/ArticleDetailModal";
import { HomePage } from "./pages/Home";
import Layout from "./pages/Layout";
import Signin from "./pages/Signin";
import Signout from "./pages/Signout";
import Signup from "./pages/Signup";

const SettingsModal = lazy(() => import("./pages/SettingsModal"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
        children: [
          {
            path: "article/:articleId",
            element: <ArticleDetailModal />,
          },
          {
            path: "settings",
            element: (
              <LoadingModal title="Settings">
                <SettingsModal />
              </LoadingModal>
            ),
          },
        ],
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
