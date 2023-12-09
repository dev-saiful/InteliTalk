import { createBrowserRouter } from "react-router-dom";
import GuestButton from "../Components/GuestButton";
import Intro from "../Components/Intro";
import LoginPage from "../Components/LoginPage";
import MainLayout from "../Layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Intro />,
      },
      { path: "/login", element: <LoginPage /> },
      {
        path: "/guest",
        element: <GuestButton />,
      },
    ],
  },
  {
    path: "*",
    element: <p className="text-center">No route founded </p>,
  },
]);
