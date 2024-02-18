import { createBrowserRouter } from "react-router-dom";
import GuestButton from "../Components/GuestButton";
import Intro from "../Components/Intro";
import LoginPage from "../Components/LoginPage";
import MainLayout from "../Layout/MainLayout";
import Chat from "../Components/Chat"

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
      {
        path: "/chat",
        element: <Chat />, 
      },
    ],
  },
  {
    path: "*",
    element: <p className="text-center">No route founded </p>,
  },
]);
