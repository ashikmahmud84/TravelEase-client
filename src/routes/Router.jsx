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
import PrivateRoute from "./PrivateRoute";

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
        element: (
          <PrivateRoute>
            <AddVehicle />
          </PrivateRoute>
        ),
      },
      {
        path: "my-vehicles",
        element: (
          <PrivateRoute>
            <MyVehicles />
          </PrivateRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "vehicle/:id",
        element: (
          <PrivateRoute>
            <VehicleDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          <PrivateRoute>
            <UpdateVehicle />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
