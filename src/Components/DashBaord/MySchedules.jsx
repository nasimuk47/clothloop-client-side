/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";
import { AiFillCaretDown } from "react-icons/ai";

const MySchedules = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [PendingData, setPendingData] = useState([]);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch("https://cloth-loop-server-site.vercel.app/bookings")
            .then((response) => response.json())
            .then((data) => {
                const userBookings = data.filter(
                    (booking) => booking?.userEmail === user?.email
                );
                setBookings(userBookings);
                setLoading(false);
            })
            .then((data) => {
                const pendings = data.filter(
                    (booking) => booking?.saller === user?.email
                );
                setPendingData(pendings);
                setLoading(false);
            })
            .catch((err) => {
                setError("Error fetching data");
                setLoading(false);
            });
    }, [user?.email]);

    const handleStatusChange = (newStatus, bookingId) => {
        const updatedBookings = bookings.map((booking) => {
            if (booking._id === bookingId) {
                return { ...booking, status: newStatus };
            }
            return booking;
        });
        setBookings(updatedBookings);

        fetch(
            `https://cloth-loop-server-site.vercel.app/bookings/${bookingId}/status`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            }
        )
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        title: "Success",
                        text: "Status updated successfully",
                        icon: "success",
                    });
                    console.log(`Status updated for booking ID: ${bookingId}`);
                } else {
                    console.error("Failed to update status");
                }
            })
            .catch((error) => {
                console.error("Error updating status:", error);
            });
    };

    return (
        <div className="grid grid-cols-2 gap-5">
            <Helmet>
                <title>ClothLopp MySchedules</title>
            </Helmet>

            {loading && (
                <p>
                    <span className="loading loading-infinity loading-lg"></span>
                </p>
            )}
            {error && <p>{error}</p>}

            <div className="grid grid-cols-1 gap-2 bg-slate-100   ">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="card card-side bg-base-100  shadow-xl">
                        {/* Render booking details */}
                        <figure>
                            <img src={booking.serviceImage} alt="Service" />
                        </figure>
                        <div className="card-body bg-slate-100">
                            <h2 className="card-title">
                                {booking.serviceName}
                            </h2>
                            <p className="font-serif">
                                Service Price: {booking.servicePrice}
                            </p>
                            <p className="font-bold">
                                Service Taking Date: {booking.serviceTakingDate}
                            </p>
                            <p className="font-serif">
                                User Email: {booking?.userEmail}
                            </p>
                            <p className="font-medium">
                                Special Instructions:{" "}
                                {booking.specialInstruction}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gray-200">
                <div className="h-[140px]  space-y-5">
                    {PendingData.length > 0 &&
                        PendingData.map((pd) => (
                            <div key={pd?._id} className="card card-side">
                                <figure>
                                    <img
                                        className="h-[130px] w-[150px]"
                                        src={pd?.serviceImage}
                                        alt={pd?.serviceName}
                                    />
                                </figure>
                                <div className="flex items-center space-x-8 bg-blue-200 w-full rounded-r-lg">
                                    <div>
                                        <h2 className="card-title ml-5">
                                            {pd?.serviceName}
                                        </h2>
                                    </div>
                                    <div>
                                        <p className=" font-serif">
                                            Price: {pd?.servicePrice}
                                        </p>
                                    </div>

                                    <div>
                                        <div>
                                            <div className="dropdown dropdown-bottom">
                                                <span className=" text-xl font-bold mr-2">
                                                    status :
                                                </span>
                                                <label
                                                    tabIndex={0}
                                                    className="btn btn-secondary">
                                                    {PendingData?.status}{" "}
                                                    <AiFillCaretDown />{" "}
                                                    {/* Use the icon component */}
                                                </label>
                                                <ul
                                                    tabIndex={0}
                                                    className="dropdown-content z-[1] menu p-2 shadow bg-sky-300 rounded-box w-52">
                                                    <li>
                                                        <a
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    "Pending",
                                                                    pd?._id
                                                                )
                                                            }>
                                                            Pending
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    "In Progress",
                                                                    pd?._id
                                                                )
                                                            }>
                                                            In Progress
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    "Completed",
                                                                    pd?._id
                                                                )
                                                            }>
                                                            Completed
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default MySchedules;
