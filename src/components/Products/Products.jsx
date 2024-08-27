import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Products() {
    const [products, setproducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [filterText, setfilterText] = useState('')


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
            <title>{window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]}</title>
        </Helmet>

        {
            isLoading ? <Loading />
                :
                <>
                    <div className="text-center w-50 mx-auto my-5">
                        <i className="fa-solid fa-magnifying-glass fs-4 text-xl mx-2"></i>
                        <input type="search" className="form-control w-1/2 p-2 rounded-lg"
                            placeholder="search... "
                            value={filterText}
                            onChange={(e) => setfilterText(e.target.value)}
                        />
                    </div>

                    <div className="grid  items-center justify-center md:grid-cols-4 md-px-10">
                        {products.map((product, index) => {
                            if (
                                product.title.toLowerCase().indexOf(filterText.toLowerCase()) === -1
                            ) {
                                return;
                            }

                            return <>
                                <Product product={product} key={index} />
                            </>
                        })}

                    </div>
                </>}
    </>
}