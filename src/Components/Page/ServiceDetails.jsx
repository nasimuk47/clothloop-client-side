/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "daisyui/dist/full.css";
import { AuthContext } from "../Auth/AuthProvider";

import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import UnderDetailsDervicesCollection from "./UnderDetailsServicesCollection";

import { Helmet } from "react-helmet";

const ServiceDetails = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [serviceTakingDate, setServiceTakingDate] = useState("");
    const [specialInstruction, setSpecialInstruction] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { user } = useContext(AuthContext);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handlePurchaseService = () => {
        console.log(serviceTakingDate);
        console.log(specialInstruction);

        const status = "pending";

        const bookingData = {
            serviceTakingDate,
            specialInstruction,
            userEmail: user?.email,
            saller: service?.seller,
            status,
            servicePrice: service.ServicePrice,
            serviceImage: service.ServiceImage,
            serviceName: service.ServiceName,
        };

        fetch("https://cloth-loop-server-site.vercel.app/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                closeModal();

                if (data.acknowledged) {
                    Swal.fire({
                        title: "Purchase successful!",
                        icon: "success",
                        timer: 3000,
                    });
                } else {
                    Swal.fire({
                        title: "Purchase failed. Please try again.",
                        icon: "error",
                        timer: 3000,
                    });
                }
            })
            .catch((error) => {
                console.error("Error booking service:", error);
                Swal.fire({
                    title: "Purchase failed. Please try again.",
                    icon: "error",
                    timer: 3000,
                });
            });
    };

    useEffect(() => {
        fetch(`https://cloth-loop-server-site.vercel.app/services/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setService(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    if (!service) {
        return (
            <div>
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>ClothLopp | services Details</title>
            </Helmet>
            <h2 className="text-center text-2xl font-bold">
                {service.ServiceName}
            </h2>
            <div className="flex justify-center mt-5">
                <div className="card w-[500px] bg-base-100 shadow-xl">
                    <figure>
                        <img
                            className="w-[400px] h-[420px]"
                            src={service.ServiceImage}
                            alt={service.ServiceName}
                        />
                    </figure>

                    <div className="space-y-2">
                        <h2 className="text-2xl text-center">
                            {service.ServiceName}
                        </h2>

                        <div className="flex justify-center items-center gap-1">
                            <img
                                className="w-[50px] h-[50px] rounded-full"
                                src={service.ServiceProviderImage}
                                alt=""
                            />
                            <p className="">{service.ServiceProviderName}</p>
                        </div>

                        <p className="text-center">{service.ServiceArea}</p>

                        <p className="text-center text-blue-700 font-bold">
                            Price: ${service.ServicePrice}
                        </p>
                    </div>
                    <a
                        href="#my_modal_8"
                        className="btn btn-accent text-center flex justify-center"
                        onClick={openModal}>
                        Book now
                    </a>
                </div>
            </div>
            {/* Modal section  */}
            {isModalOpen && (
                <div id="my_modal_8" className="modal">
                    <div className="modal-box h-[500px] space-y-3">
                        <p className="text-xl font-bold text-center">
                            Service Name: {service.ServiceName}
                        </p>
                        <div className="flex justify-center">
                            <img
                                src={service.ServiceImage}
                                alt={service.ServiceName}
                            />
                        </div>

                        <p className="text-center font-serif ">
                            User email: {user.email}
                        </p>
                        <div className="flex justify-center gap-6 ">
                            <input
                                className=" bg-slate-100 border border-sky-300"
                                type="date"
                                placeholder="Service Taking Date"
                                value={serviceTakingDate}
                                onChange={(e) =>
                                    setServiceTakingDate(e.target.value)
                                }
                            />
                            <textarea
                                className="bg-slate-100 border border-sky-300"
                                placeholder="Special Instruction "
                                value={specialInstruction}
                                onChange={(e) =>
                                    setSpecialInstruction(e.target.value)
                                }
                            />
                        </div>
                        <p className="font-bold text-center">
                            Price: ${service.ServicePrice}
                        </p>
                        <div className="flex justify-between">
                            {" "}
                            <div>
                                <a
                                    href="#"
                                    className="btn"
                                    onClick={closeModal}>
                                    Cancel
                                </a>
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={handlePurchaseService}>
                                Purchase
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <h2 className=" text-3xl font-serif text-center mt-5 ">
                    Our Another Collection
                </h2>

                <div>
                    <UnderDetailsDervicesCollection></UnderDetailsDervicesCollection>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
