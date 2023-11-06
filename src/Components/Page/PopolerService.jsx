/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../Components/Page/PopolerService.css"; // Import your CSS file
import { Link } from "react-router-dom";

const PopolerService = () => {
    const [popularServices, setPopularServices] = useState([]);

    useEffect(() => {
        fetch("/PopolerService.json")
            .then((response) => response.json())
            .then((data) => {
                setPopularServices(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h2 className="text-center text-4xl font-bold mt-5 text-gray-700">
                Popular Services
            </h2>
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mt-5">
                {popularServices.map((service, index) => (
                    <div
                        key={index}
                        className="card-container bg-base-100 shadow-xl relative w-[600px] h-[400px] space-y-44">
                        <figure
                            style={{
                                backgroundImage: `url(${service.serviceImage})`,
                            }}
                            className="bg-cover bg-center w-full h-[400px] absolute inset-0"></figure>
                        <div className="card-body absolute inset-0 flex flex-col justify-center items-center text-center">
                            <h2 className="card-title text-2xl font-bold text-gray-200">
                                {service.serviceName}
                            </h2>
                            <p className="font-bold text-gray-300">
                                {service.serviceDescription}
                            </p>

                            <div className="flex space-x-3 items-center">
                                <img
                                    className="w-[50px] h-[50px] rounded-full"
                                    src={service.providerImage}
                                    alt=""
                                />

                                <h1 className="font-bold text-sky-500 ">
                                    {service.providerName}
                                </h1>
                            </div>
                            <h1 className="text-xl font-bold text-yellow-400">
                                {service.servicePrice}
                            </h1>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mb-4 ">
                <Link to="/service">
                    {" "}
                    <button className="btn btn-sm btn-info  mt-5 ">
                        Show All
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PopolerService;
