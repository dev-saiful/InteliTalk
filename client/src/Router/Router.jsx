import { createBrowserRouter } from "react-router-dom";
import StudentUi from "../Components/StudentUi";
import Intro from "../Components/Intro";
import LoginPage from "../Components/LoginPage";
import MainLayout from "../Layout/MainLayout";
import Chat from "../Components/Chat"
import Admin from "../Components/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Intro />,
      },
      { path: "/login",
       element: <LoginPage />
      },
      {
        path: "/student",
        element: <StudentUi />,
      },
      {
        path: "/admin",
        element: <Admin />,
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
