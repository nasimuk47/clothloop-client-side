/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2"; // Import SweetAlert

const MySchedules = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch("https://cloth-loop-server-site.vercel.app/bookings")
            .then((response) => response.json())
            .then((data) => {
                const userBookings = data.filter(
                    (booking) => booking.userEmail === user?.email
                );
                setBookings(userBookings);
                setLoading(false);
            })
            .catch((err) => {
                setError("Error fetching data");
                setLoading(false);
            });
    }, [user.email]);

    const handleStatusChange = (newStatus, bookingId) => {
        const updatedBookings = bookings.map((booking) => {
            if (booking._id === bookingId) {
                return { ...booking, status: newStatus };
            }
            return booking;
        });
        setBookings(updatedBookings);

        fetch(`http://localhost:5000/bookings/${bookingId}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
        })
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

            <div className="grid grid-cols-1 gap-2   ">
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
                                User Email: {booking.userEmail}
                            </p>
                            <p className="font-medium">
                                Special Instructions:{" "}
                                {booking.specialInstruction}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="h-[140px] space-y-5">
                {bookings.map((booking) => (
                    <div key={booking._id} className="card card-side">
                        <figure>
                            <img
                                className="h-[130px] w-[150px]"
                                src={booking.serviceImage}
                                alt={booking.serviceName}
                            />
                        </figure>
                        <div className="flex items-center space-x-10 bg-blue-200 w-[350px] rounded-r-lg">
                            <div>
                                <h2 className="card-title ml-5">
                                    {booking.serviceName}
                                </h2>
                            </div>
                            <div>
                                <p>Price: {booking.servicePrice}</p>
                            </div>

                            <div>
                                <div>
                                    <div className="dropdown dropdown-bottom">
                                        <label
                                            tabIndex={0}
                                            className="btn btn-secondary">
                                            STATUS:{booking.status}
                                        </label>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content z-[1] menu p-2 shadow bg-sky-300 rounded-box w-52">
                                            <li>
                                                <a
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            "Pending",
                                                            booking._id
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
                                                            booking._id
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
                                                            booking._id
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
    );
};

export default MySchedules;
