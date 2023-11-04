import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Auth/AuthProvider";

const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const result = await signInUser(email, password);
            console.log(result.user);
            e.target.reset();

            toast.success("Successfully logged in", {
                position: "top-right",
            });
            navigate("/");
        } catch (error) {
            console.error(error);

            toast.error(error.message, {
                position: "top-right",
            });
        }
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user);
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    required
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    placeholder="password"
                                    className="input input-bordered"
                                />
                                <label className="label">
                                    <a
                                        href="#"
                                        className="label-text-alt link link-hover">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </form>
                        <button onClick={handleGoogleSignIn} className="btn">
                            Google
                        </button>
                        <p>
                            New to this site? Please{" "}
                            <Link to="/Registration">
                                <button className="btn btn-link">
                                    Register
                                </button>
                            </Link>{" "}
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-left" />
        </div>
    );
};

export default Login;
