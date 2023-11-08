/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const Client = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        // Fetch data from "Client.json"
        fetch("Client.json")
            .then((response) => response.json())
            .then((data) => setClients(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <div className="mt-16">
                <h1 className="text-4xl font-semibold text-center text-gray-600 ">
                    <span className="font-bold"></span> Our Clients{" "}
                    <span className="font-extrabold text-red-400"> Say</span>
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-16 w-11/12 mx-auto ">
                    {clients.map((client) => (
                        <div
                            key={client.id}
                            className="card w-[280px]  h-[420px]  shadow-xl">
                            <figure className="px-10 pt-10">
                                <img
                                    src={client.ClientImg}
                                    alt={client.ClientName}
                                    className="h-[150px] w-[150px] rounded-full"
                                />
                            </figure>
                            <h2 className="text-xl font-bold flex justify-center mt-3">
                                {client.ClientName}
                            </h2>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title"></h2>
                                <div>
                                    <div className="rating">
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-orange-400"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-orange-400"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-orange-400"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-orange-400"
                                        />
                                    </div>
                                </div>
                                <p>{client.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Client;
