/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import Navber from "../Header/Navber";

const MainLayout = () => {
    return (
        <div className="w-full lg:w-[1230px] mx-auto p-4">
            <Navber />
            <div className="">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
