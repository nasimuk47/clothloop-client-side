/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PopolerService from "./PopolerService";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import NewSellProduct from "./NewSellProduct";
import Client from "./Client ";

const Home = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div>
            <Helmet>
                <title>ClothLoop | Home</title>
            </Helmet>
            <div>
                <div
                    className="hero  lg: h-[570px] relative"
                    style={{
                        backgroundImage:
                            "url(https://i.ibb.co/HnJCKBg/banner2.jpg)",
                    }}>
                    <div className="absolute left-24 top-48 space-y-5">
                        <h1
                            data-aos="slide-left"
                            className="text-2xl lg:text-4xl font-bold text-gray-500">
                            NEW ARRIVAL
                        </h1>
                        <h2
                            data-aos="slide-right"
                            className="text-4xl lg:text-6xl font-bold text-gray">
                            Unlimited <br className="lg:hidden" /> Clothes
                        </h2>
                        <div data-aos="slide-left">
                            <Link to="/service">
                                <button className="btn btn-primary flex justify-end bg-red-500 text-white">
                                    Shop Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <PopolerService></PopolerService>
            <NewSellProduct></NewSellProduct>

            <Client></Client>

            <Footer></Footer>
        </div>
    );
};

export default Home;
