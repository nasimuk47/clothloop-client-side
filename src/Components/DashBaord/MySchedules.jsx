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

            <div className="grid grid-cols-1 gap-2  space-x-20 ">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="card card-side bg-base-100 h-[290px] shadow-xl">
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

                            <p className="font-bold">status:{booking.status}</p>

                            <div>
                                <div className="dropdown  dropdown-right">
                                    <label
                                        tabIndex={0}
                                        className="btn btn-secondary">
                                        Change Status
                                    </label>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content z-[1] menu p-2 shadow bg-sky-300 rounded-box w-52">
                                        <li>
                                            <a>In Progress</a>
                                        </li>
                                        <li>
                                            <a>Completed</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className=" h-[140px]">
                <div className="card card-side ">
                    <figure>
                        <img
                            className="h-[130px] w-[150px]"
                            src="https://i.ibb.co/vY7DHPv/panjabi26.jpg"
                            alt="Movie"
                        />
                    </figure>
                    <div className="flex items-center space-x-10 bg-blue-200 w-[400px]  rounded-r-lg">
                        <div>
                            <h2 className="card-title ml-5">Service name</h2>
                        </div>
                        <div>
                            <p>price:</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">Status:</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MySchedules;
