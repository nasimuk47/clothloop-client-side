import { Helmet } from "react-helmet";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";

const ManageService = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    const { user, token } = useContext(AuthContext); // Assuming you have a user and token from your AuthContext

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Service",
            text: "Are you sure you want to delete this service?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // User confirmed to delete
                fetch(`http://localhost:5000/bookings/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                "Deleted!",
                                "Service deleted successfully",
                                "success"
                            );

                            setBookings((prevBookings) =>
                                prevBookings.filter(
                                    (booking) => booking._id !== id
                                )
                            );
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting service:", error);
                        Swal.fire(
                            "Error",
                            "An error occurred while deleting the service",
                            "error"
                        );
                    });
            }
        });
    };

    useEffect(() => {
        if (user) {
            fetch("http://localhost:5000/bookings", {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the JWT token in the request header
                },
            })
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
    }, [user, token]);

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
                                    <button
                                        onClick={() =>
                                            handleDelete(booking._id)
                                        }
                                        className="btn btn-neutral ">
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
