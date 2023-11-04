/* eslint-disable no-unused-vars */

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="bg-yellow-300 mt-5 w-10/12 mx-auto h-[500px]">
            <div className="">
                <h1 className="text-4xl font-serif text-center">
                    404 - Page Not Found
                </h1>

                <p className="text-xl font-serif text-center mt-5">
                    The page you are looking for does not exist.
                </p>
            </div>
            <div className="flex justify-center mt-5">
                <Link to="/">
                    <button className="btn btn-error">Go Home</button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
