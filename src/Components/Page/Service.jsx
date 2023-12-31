/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ServiceDetails from "../Page/ServiceDetails";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const Service = () => {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAllServices, setShowAllServices] = useState(false);

    useEffect(() => {
        // Fetch the service data from your server
        fetch("https://cloth-loop-server-site.vercel.app/services")
            .then((response) => response.json())
            .then((data) => {
                setServices(data);
            })
            .catch((error) => {
                console.error("Error fetching service data:", error);
            });
    }, []);

    const filteredServices = services
        .filter((service) => {
            if (searchTerm) {
                return service.ServiceName.toLowerCase().includes(
                    searchTerm.toLowerCase()
                );
            }
            return true;
        })
        .slice(0, showAllServices ? services.length : 6);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleShowAllServices = () => {
        setShowAllServices(true);
    };

    return (
        <div>
            <Helmet>
                <title>ClothLopp | services</title>
            </Helmet>
            <div
                className="hero h-[150px] rounded-2xl"
                style={{
                    backgroundImage:
                        "url(https://i.ibb.co/nQwZf9V/service-banner.jpg)",
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <div className="flex items-center gap-1">
                            <input
                                type="text"
                                placeholder="Type service Name ...."
                                className="input input-bordered input-info w-full max-w-xs text-black"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <button className="btn btn-neutral">Search</button>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="text-4xl mt-3 font-bold text-center">
                Product Overview
            </h1>

            {/* Services card section */}
            <div className="sm:grid grid-cols-1 space-y-3 lg:grid-cols-4 mt-5 mb-2">
                {filteredServices.map((service) => (
                    <motion.div
                        key={service._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-72 h-[530px] bg-slate-200">
                        <div className="w-72 h-[530px] bg-slate-200">
                            <figure>
                                <img
                                    src={service.ServiceImage}
                                    alt={service.ServiceName}
                                    className="w-full h-[280px]"
                                />
                            </figure>
                            <div className="items-center space-y-2 bg-gray-200 text-center h-[210px]">
                                <h2 className="text-center font-serif">
                                    {service.ServiceName}
                                </h2>

                                <p>
                                    {service.ServiceDescription
                                        ? service.ServiceDescription.substring(
                                              0,
                                              100
                                          )
                                        : ""}
                                </p>

                                <div className="flex items-center gap-1 justify-center">
                                    <img
                                        src={service.ServiceProviderImage}
                                        alt={service.ServiceProviderName}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <p className="font-semibold">
                                        {service.ServiceProviderName}
                                    </p>
                                </div>

                                <p className="font-sans">
                                    {" "}
                                    Area: {service.ServiceArea}
                                </p>
                                <p className="font-sans text-blue-600">
                                    Price: ${service.ServicePrice}
                                </p>
                                <div className="text-center">
                                    <Link to={`/serviceDetails/${service._id}`}>
                                        <button className="btn btn-xs bg-slate-300 mb-1">
                                            Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {!showAllServices && (
                <div className="text-center mt-4">
                    <button
                        className="btn btn-primary"
                        onClick={handleShowAllServices}>
                        Show All Services
                    </button>
                </div>
            )}
        </div>
    );
};

export default Service;
