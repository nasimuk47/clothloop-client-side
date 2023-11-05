/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../Header/Navber.css";
import { AuthContext } from "../Auth/AuthProvider";

const Navber = () => {
    const { user, logOut } = useContext(AuthContext);
    const [showDashboardMenu, setShowDashboardMenu] = useState(false);

    const toggleDashboardMenu = () => {
        setShowDashboardMenu(!showDashboardMenu);
    };

    return (
        <div>
            <div className="flex justify-between items-center mt-2 px-4   rounded-md lg:h-20 md:flex-col lg:flex-row">
                <Link to="/">
                    {" "}
                    <h1 className="text-red-500 sm:text-3xl md:text-3xl text-xl font-extrabold">
                        Cloth
                        <span className="text-black sm:text-3xl md:text-3xl text-xl font-serif">
                            Loop
                        </span>
                    </h1>
                </Link>
                <nav>
                    <ul className="flex gap-4">
                        <li>
                            <NavLink to="/" activeClassName="active">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/service" activeClassName="active">
                                Service
                            </NavLink>
                        </li>
                        {user ? (
                            <li>
                                <a
                                    onClick={toggleDashboardMenu}
                                    className="cursor-pointer ">
                                    Dashboard
                                </a>
                                {showDashboardMenu && (
                                    <ul className="bg-purple-300 rounded right-[500px]  -mt-16 p-2  absolute">
                                        <li>
                                            <NavLink
                                                to="/manage-services"
                                                activeClassName="text-red-500 underline">
                                                Manage-services
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/add-services"
                                                activeClassName="text-red-500 underline">
                                                Add-services
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/my-schedules"
                                                activeClassName="btn btn-primary">
                                                My-schedules
                                            </NavLink>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        ) : (
                            <li className="login">
                                <NavLink
                                    to="/Login"
                                    activeClassName="text-red-500 underline">
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
                <div className="flex items-center">
                    {user ? (
                        <>
                            <img
                                src={user?.photoURL}
                                alt="User Profile"
                                className="h-10 rounded-full"
                            />
                            <span className="text-red-500 underline user-email">
                                {user.displayName}
                            </span>
                            <button
                                onClick={logOut}
                                className="bg-blue-500 text-white px-3 py-1 rounded-md ml-2">
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink to="/Login">
                            <button className="bg-blue-500 text-white px-3 py-1 rounded-md ml-2">
                                Login
                            </button>
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navber;
