/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const UnderDetailsDervicesCollection = () => {
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

    const handleShowAllServices = () => {
        setShowAllServices(true);
    };

    return (
        <div>
            {/* Services card section */}
            <div className="sm:grid grid-cols-1 lg:grid-cols-4 mt-5 mb-2">
                {filteredServices.map((service) => (
                    <div
                        key={service._id}
                        className="w-72 h-[430px] bg-slate-200">
                        <figure>
                            <img
                                src={service.ServiceImage}
                                alt={service.ServiceName}
                                className="w-full h-[280px]"
                            />
                        </figure>
                        <div className="items-center space-y-2 bg-gray-200 text-center h-[100px]">
                            <h2 className="text-center font-serif">
                                {service.ServiceName}
                            </h2>

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

export default UnderDetailsDervicesCollection;
