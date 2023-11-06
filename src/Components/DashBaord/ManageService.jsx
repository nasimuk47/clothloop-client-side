import { Helmet } from "react-helmet";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";

const ManageService = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetch("http://localhost:5000/bookings")
                .then((response) => response.json())
                .then((data) => {
                    const filteredBookings = data.filter(
                        (booking) => booking.userEmail === user.email
                    );
                    setBookings(filteredBookings);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [user]);

    function handleUpdateClick(bookingId) {
        navigate(`/manage-services/${bookingId}`);
    }

    return (
        <div>
            <Helmet>
                <title> ClothLooop | Manage Service </title>
            </Helmet>
            <div className="sm:grid grid-cols-1  lg:grid-cols-2 gap-2">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="card card-side bg-base-100 shadow-xl">
                        <figure>
                            <img src={booking.serviceImage} alt="Movie" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {booking.serviceName}
                            </h2>

                            <p>Service Price: {booking.servicePrice}</p>
                            <p>
                                Service Taking Date: {booking.serviceTakingDate}
                            </p>
                            <p>User Email: {booking.userEmail}</p>
                            <p>
                                Special Instructions:{" "}
                                {booking.specialInstruction}
                            </p>
                            <div className="card-actions justify-end">
                                <div className="btn-group btn-group-vertical lg:btn-group-horizontal">
                                    <button
                                        className=" btn btn-info"
                                        onClick={() =>
                                            handleUpdateClick(booking._id)
                                        }>
                                        Edit
                                    </button>
                                    <button className="btn btn-neutral ">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageService;
