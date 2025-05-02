import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Catalog from "../../pages/Catalog/Catalog";
import Profile from "../../pages/Profile/Profile";
import RegPage from "../../pages/Auth/RegPage/RegPage";
import LogPage from "../../pages/Auth/LogPage/LogPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/catalog",
        element: <Catalog />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/auth/register",
        element: <RegPage />,
      },
      {
        path: "/auth/login",
        element: <LogPage />,
      },
    ],
  },
]);

export default router