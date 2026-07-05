import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllVehicles from "../pages/AllVehicles/AllVehicles";
import AddVehicle from "../pages/AddVehicle/AddVehicle";
import MyVehicles from "../pages/MyVehicles/MyVehicles";
import MyBookings from "../pages/MyBookings/MyBookings";
import VehicleDetails from "../pages/VehicleDetails/VehicleDetails";
import UpdateVehicle from "../pages/UpdateVehicle/UpdateVehicle";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "all-vehicles",
        element: <AllVehicles />,
      },
      {
        path: "add-vehicle",
        element: <AddVehicle />,
      },
      {
        path: "my-vehicles",
        element: <MyVehicles />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "vehicle/:id",
        element: <VehicleDetails />,
      },
      {
        path: "update/:id",
        element: <UpdateVehicle />,
      },
    ],
  },
]);

export default router;