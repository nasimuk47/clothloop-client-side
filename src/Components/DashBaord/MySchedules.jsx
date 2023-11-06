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
        fetch("http://localhost:5000/bookings")
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
        <div>
            <Helmet>
                <title>ClothLopp MySchedules</title>
            </Helmet>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div className="sm:grid grid-cols-1  lg:grid-cols-2 gap-2">
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
        </div>
    );
};

export default MySchedules;
