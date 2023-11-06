/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const UpdateService = () => {
    const [serviceData, setServiceData] = useState({
        serviceName: "",
        servicePrice: 0,
        serviceTakingDate: "",
        specialInstruction: "",
        photoURL: "",
    });

    const handleUpdateService = () => {
        const id = "6548d315909a26782ff8ba60";

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(serviceData),
        };

        fetch(`http://localhost:5000/bookings/${id}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error updating service");
                }
            })
            .then((data) => {
                console.log("Service updated successfully", data);
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData({
            ...serviceData,
            [name]: value,
        });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold flex justify-center">
                Update Service
            </h1>
            <div className="bg-gray-300 mt-5 flex justify-center w-[700px] mx-auto h-[600px] rounded-lg">
                <form>
                    <div className="mt-16">
                        <label className="text-white">Service Name:</label>
                        <input
                            type="text"
                            name="serviceName"
                            value={serviceData.serviceName}
                            onChange={handleChange}
                            className="input input-bordered input-secondary w-full max-w-xs"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="text-white">Service Price:</label>
                        <input
                            type="number"
                            name="servicePrice"
                            value={serviceData.servicePrice}
                            onChange={handleChange}
                            className="input input-bordered input-secondary w-full max-w-xs"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="text-white">
                            Service Taking Date:
                        </label>
                        <input
                            type="date"
                            name="serviceTakingDate"
                            value={serviceData.serviceTakingDate}
                            onChange={handleChange}
                            className="input input-bordered input-secondary w-full max-w-xs"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="text-white">
                            Special Instruction:
                        </label>
                        <textarea
                            name="specialInstruction"
                            value={serviceData.specialInstruction}
                            onChange={handleChange}
                            className="input input-bordered input-secondary w-full max-w-xs"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="text-white">Photo URL:</label>
                        <input
                            type="text"
                            name="photoURL"
                            value={serviceData.photoURL}
                            onChange={handleChange}
                            className="input input-bordered input-secondary w-full max-w-xs"
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary w-[330px] mt-4"
                        onClick={handleUpdateService}>
                        Update Service
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateService;
