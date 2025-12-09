import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import ClubDetails from "../pages/Clubs/ClubDetails";
import Clubs from "../pages/Clubs/Clubs";
import Event from "../pages/Event/Event";
import EventDetails from "../pages/Event/EventDetails";
import PaymentSuccess from "../pages/payment/PaymentSuccess ";
import PaymentCancelled from "../pages/payment/PaymentCancelled";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/club",
        element: <Clubs />,
      },
      {
        path: "/club/:id",
        element: <ClubDetails />,
      },
      {
        path: "/events",
        element: <Event />,
      },
      {
        path: "/events/:id",
        element: <EventDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      // <PrivateRoute>
      <DashboardLayout />
      // </PrivateRoute>
    ),
    children: [
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled />,
      },
    ],
  },
]);
