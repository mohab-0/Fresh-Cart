import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";
import CatSlider from "../CatSlider/CatSlider";
import { Helmet } from "react-helmet";

export default function Home() {

    const [products, setproducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        getProducts()
    }, [])

    async function getProducts() {
        setIsLoading(true)
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        setproducts(data.data)
        setIsLoading(false)
    }

    return <>
        <Helmet>
            <title>Home</title>
        </Helmet>
        {
            isLoading ? <Loading />
                :
                <div>
                    <CatSlider />
                    <div className="grid  items-center justify-center md:grid-cols-4 md-px-10">
                        {products.map((product, index) => {
                            return <>
                                <Product product={product} key={index} />
                            </>
                        })}

                    </div>
                </div>
        }
    </>
}