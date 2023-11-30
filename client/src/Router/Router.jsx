import { createBrowserRouter } from "react-router-dom";
import GuestButton from "../Components/GuestButton";
import Intro from "../Components/Intro";
import StudentButton from "../Components/StudentButton";
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
      { path: "/student", element: <StudentButton /> },
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
