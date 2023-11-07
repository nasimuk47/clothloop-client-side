/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Auth/AuthProvider";

const MySchedules = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        // Fetch data from the API
        fetch("https://cloth-loop-server-site.vercel.app/bookings")
            .then((response) => response.json())
            .then((data) => {
                const userBookings = data.filter(
                    (booking) => booking.userEmail === user.email
                );
                setBookings(userBookings);
                setLoading(false);
            })
            .catch((err) => {
                setError("Error fetching data");
                setLoading(false);
            });
    }, [user.email]);
    return (
        <div className="grid grid-cols-2">
            <Helmet>
                <title>ClothLopp MySchedules</title>
            </Helmet>

            {loading && (
                <p>
                    <span className="loading loading-infinity loading-lg"></span>
                </p>
            )}
            {error && <p>{error}</p>}

            <div className="grid grid-cols-1 gap-2 flex[1] ">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="card card-side bg-base-100 shadow-xl">
                        {/* Render booking details */}
                        <figure>
                            <img src={booking.serviceImage} alt="Service" />
                        </figure>
                        <div className="card-body">
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

            <div className="flex[1] bg-green-600 text-center">
                pending works
            </div>
        </div>
    );
};

export default MySchedules;
