/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { AuthContext } from "../Auth/AuthProvider";
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/login-animation.json";

const Registration = () => {
    const { createUser, signInUser, signInWithGoogle } =
        useContext(AuthContext);

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Invalid Password",
                text: "Password must be at least 6 characters long.",
            });
            return;
        }

        if (!/[A-Z]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Password",
                text: "Password must contain at least one capital letter.",
            });
            return;
        }

        if (!/[!@#$%^&*]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Password",
                text: "Password must contain at least one special character (!@#$%^&*).",
            });
            return;
        }

        createUser(email, password, photo, name)
            .then((result) => {
                console.log(result.user);
                Swal.fire({
                    icon: "success",
                    title: "Registration successful!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                e.target.reset();
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Registration failed",
                    text: "An error occurred during registration.",
                });
            });
    };

    const handleGoogleRegister = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user);
                Swal.fire({
                    icon: "success",
                    title: "Google Sign-In successful!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Google Sign-In failed",
                    text: "An error occurred during Google Sign-In.",
                });
            });
    };

    return (
        <div>
            <Helmet>
                <title>ClothLoop | Registration</title>
            </Helmet>
            <div className="mt-16">
                <div className="hero-content flex gap-5 lg:flex-row-reverse">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="input input-bordered"
                                    name="name"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">PhotoURL</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="PhotoURL"
                                    className="input input-bordered"
                                    name="photo"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="input input-bordered"
                                    name="email"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered"
                                    name="password"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">
                                    Register Now
                                </button>
                            </div>
                        </form>

                        <h1 className="font-serif ml-8 mb-2">
                            Or Register With
                        </h1>

                        <div className="flex justify-center">
                            <button
                                onClick={handleGoogleRegister}
                                className="btn bg-sky-400 mb-2 w-[200px]">
                                Register With Google
                            </button>
                        </div>
                        <h1 className="font-bold flex justify-center">
                            Already have an account?
                        </h1>
                        <Link
                            to="/Login"
                            className="text-center mb-10 underline text-blue-600">
                            Login Now
                        </Link>
                    </div>
                    <Lottie animationData={loginAnimation} autoPlay loop />
                </div>
            </div>
        </div>
    );
};

export default Registration;
