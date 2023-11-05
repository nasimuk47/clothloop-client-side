import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./Components/Page/Home";
import MainLayout from "./Components/Layout/MainLayout";
import NotFound from "./Components/Page/NotFound";
import AuthProvider from "./Components/Auth/AuthProvider";
import Login from "./Components/Page/Login";
import Registration from "./Components/Page/Registration";
import Service from "./Components/Page/Service";

import AddService from "./Components/DashBaord/AddService";
import MySchedules from "./Components/DashBaord/MySchedules";
import ServiceDetails from "./Components/Page/ServiceDetails";
import PrivateRoute from "./Components/Page/PrivateRoute,";
import ManageService from "./Components/DashBaord/ManageService";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "Login",
                element: <Login></Login>,
            },
            {
                path: "Registration",
                element: <Registration></Registration>,
            },
            {
                path: "service",
                element: <Service></Service>,
            },

            {
                path: "manage-services",
                element: <ManageService></ManageService>,
            },
            {
                path: "add-services",
                element: (
                    <PrivateRoute>
                        <AddService></AddService>
                    </PrivateRoute>
                ),
            },
            {
                path: "my-schedules",
                element: <MySchedules></MySchedules>,
            },
            {
                path: "serviceDetails/:id",
                element: (
                    <PrivateRoute>
                        <ServiceDetails></ServiceDetails>
                    </PrivateRoute>
                ),
            },

            {
                path: "*",
                element: <NotFound></NotFound>,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            {" "}
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
