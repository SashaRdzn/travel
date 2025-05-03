import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Country from "../../pages/Country/Country";
import Profile from "../../pages/Profile/Profile";
import RegPage from "../../pages/Auth/RegPage/RegPage";
import LogPage from "../../pages/Auth/LogPage/LogPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/country",
        element: <Country />,
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