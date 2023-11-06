/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Auth/AuthProvider";
import { Helmet } from "react-helmet";

const AddService = () => {
    const { user } = useContext(AuthContext);

    console.log(user);

    const handleAddService = async (event) => {
        event.preventDefault();

        const form = event.target;

        const ServiceName = form.serviceName.value;
        const ServiceProviderName = user?.displayName;
        const Email = user?.email;
        const ServicePrice = form.price.value;
        const ServiceArea = form.serviceArea.value;
        const ServiceDescription = form.description.value;
        const ServiceImage = form.photoUrl.value;
        const ServiceProviderImage = user?.photoURL;

        const newService = {
            ServiceName,
            ServiceProviderName,
            Email,
            ServicePrice,
            ServiceArea,
            ServiceDescription,
            ServiceImage,
            ServiceProviderImage,
        };

        console.log(newService);

        try {
            const response = await fetch("http://localhost:5000/services", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newService),
            });

            const data = await response.json();
            console.log(data);

            if (data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Service added successfully",
                    icon: "success",
                    confirmButtonText: "Cool",
                });
            }
        } catch (error) {
            console.error("Error adding service:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to add the service. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div>
            <Helmet>
                <title>Clothloop | Add Service</title>
            </Helmet>
            <div className="bg-[#F4F3F0] p-4 sm:p-8 lg:p-24 w-full sm:w-10/12 mx-auto">
                <h2 className="text-3xl font-extrabold text-center mb-5">
                    Add Service
                </h2>
                <form onSubmit={handleAddService}>
                    <div className="lg:flex sm:flex mb-8">
                        <div className="form-control w-full lg:w-1/2 sm:w-1/2">
                            <label className="label">
                                <span className="label-text">Service Name</span>
                            </label>
                            <label className="input-group">
                                <input
                                    type="text"
                                    name="serviceName"
                                    placeholder="Service Name"
                                    className="input input-bordered w-full"
                                />
                            </label>
                        </div>
                        <input
                            type="text"
                            placeholder="Your name"
                            value={user.displayName} // Populate with user's name
                            className="input input-bordered input-primary max-w-xs w-full sm:w-1/2"
                        />
                        <input
                            type="email"
                            placeholder="Your email"
                            name="yourEmail"
                            value={user.email} // Populate with user's email
                            className="input input-bordered input-primary w-full sm:w-1/2"
                        />
                    </div>
                    <div className="lg:flex sm:flex mb-8">
                        <div className="form-control w-full lg:w-1/2 sm:w-1/2">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <label className="input-group">
                                <input
                                    type="text"
                                    name="price"
                                    placeholder="Price"
                                    className="input input-bordered w-full"
                                />
                            </label>
                        </div>
                        <div className="form-control w-full lg:w-1/2 sm:w-1/2 mt-4 sm:mt-0">
                            <label className="label">
                                <span className="label-text">Service Area</span>
                            </label>
                            <label className="input-group">
                                <input
                                    type="text"
                                    name="serviceArea"
                                    placeholder="Service Area"
                                    className="input input-bordered w-full"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <label className="textarea textarea-bordered w-full">
                            <textarea
                                name="description"
                                placeholder="Description"
                                className="textarea"></textarea>
                        </label>
                    </div>
                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                name="photoUrl"
                                placeholder="Photo URL"
                                className="input input-bordered w-full"
                            />
                        </label>
                    </div>
                    <input
                        type="submit"
                        value="Add Service"
                        className="btn btn-primary w-full"
                    />
                </form>
            </div>
        </div>
    );
};

export default AddService;
