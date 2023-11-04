/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PopolerService from "./PopolerService";
import Footer from "./Footer";

const Home = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div>
            <div>
                <div
                    className="hero h-[560px] relative"
                    style={{
                        backgroundImage:
                            "url(https://i.ibb.co/HnJCKBg/banner2.jpg)",
                    }}>
                    <div className="absolute left-24 top-48 space-y-5">
                        <h1
                            data-aos="slide-left"
                            className="text-2xl font-bold text-gray-500">
                            NEW ARRIVAL
                        </h1>
                        <h2
                            data-aos="slide-right"
                            className="text-5xl font-bold text-gray">
                            Unlimited <br /> Clothes
                        </h2>
                        <div data-aos="slide-left">
                            <button className="btn btn-primary flex justify-end bg-red-500 text-white">
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <PopolerService></PopolerService>

            <Footer></Footer>
        </div>
    );
};

export default Home;
