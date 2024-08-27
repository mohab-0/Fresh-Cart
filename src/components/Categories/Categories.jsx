import React from "react";
import { Helmet } from "react-helmet";
import axios, { Axios } from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";

export default function Categories() {
    function getCats() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }

    let { data, isLoading } = useQuery("pcats", getCats);


    return (
        <div className="">
            <Helmet>
                <title>{window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]}</title>
            </Helmet>
            {isLoading ?
                <Loading />
                :
                <div className=" flex flex-col md:grid md:grid-cols-3 mx-6 gap-6">

                    {data?.data.data.map((cat, idx) => {
                        return <>
                            <div class="relative rounded overflow-hidden hover:shadow-lg hover:shadow-purple-600 hover:transition-all" key={idx}>
                                <img src={cat.image} alt="Categories-image" class="w-full" />
                                <p
                                    class="cursor-pointer absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-2xl text-center text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
                                    {cat.name}
                                </p>
                            </div>
                        </>

                    })}

                </div>

            }
        </div>
    );
}