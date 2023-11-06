/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const NewSellProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch data from "sellProduct.json"
        fetch("sellProduct.json")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="bg-gray-200 h-[450px] p-8">
            <div className="mt-4">
                <h2 className="text-3xl font-serif text-center">
                    New Sell Products
                </h2>
                <h2 className="text-center">
                    The trendy and versatile design ensures you can wear it for
                    any occasion, be it a casual day out, <br /> a formal
                    gathering, or a special event.
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                {products.map((product) => (
                    <div key={product.id} className="card">
                        <figure>
                            <img
                                className="w-[200px]"
                                src={product.product_img}
                                alt={product.name}
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{product.name}</h2>
                            <p>{`Price: $${product.price}`}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewSellProduct;
