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
import MemberOverview from "../pages/Dashboard/Member/MemberOverview";
import MyClubS from "../pages/Dashboard/Member/MyClubs";
import MyEvents from "../pages/Dashboard/Member/MyEvents";
import PaymentHistory from "../pages/Dashboard/Member/PaymentHistory";
import ManagerOverview from "../pages/Dashboard/Manager/ManagerOverview";
import AdminOverview from "../pages/Dashboard/Admin/AdminOverview";
import ManageClubs from "../pages/Dashboard/Admin/ManageClubs";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import DashboardRedirect from "../pages/Dashboard/DashboardRedirect ";
import ViewPayments from "../pages/Dashboard/Admin/ViewPayments";
import ClubMembers from "../pages/Dashboard/Manager/ClubMembers";
import EventsManagement from "../pages/Dashboard/Manager/EventsManagement";
import EventRegistrations from "../pages/Dashboard/Manager/EventRegistrations";
import ManagerClubs from "../pages/Dashboard/Manager/ManagerClubs";

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
      <PrivateRoute allowedRoles={["member", "manager", "admin"]}>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardRedirect />,
      },

      // Member routes
      { path: "member", element: <MemberOverview /> },
      { path: "member/member-my-clubs", element: <MyClubS /> },
      { path: "member/my-events", element: <MyEvents /> },
      { path: "member/payment-history", element: <PaymentHistory /> },

      // Manager routes
      { path: "manager", element: <ManagerOverview /> },
      { path: "manager/my-clubs", element: <ManagerClubs /> },
      { path: "manager/events", element: <EventsManagement /> },
      { path: "manager/members", element: <ClubMembers /> },
      { path: "manager/events-registration", element: <EventRegistrations /> },

      // Admin routes
      { path: "admin", element: <AdminOverview /> },
      { path: "admin/manage-users", element: <ManageUsers /> },
      { path: "admin/manage-clubs", element: <ManageClubs /> },
      { path: "admin/payments", element: <ViewPayments /> },

      // Payment Pages
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "payment-cancelled", element: <PaymentCancelled /> },
    ],
  },
]);
