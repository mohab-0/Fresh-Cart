import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";

export default function Brands() {

  function getbrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { data, isLoading } = useQuery("brands", getbrands);
  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      {
        isLoading ?
          <Loading />
          :
          <>
            <h1 className="text-4xl font-semibold text-purple-600  text-center my-10">All Brands</h1>
            <div className="flex flex-col md:grid md:grid-cols-4 mx-6 gap-6 ">
              {data?.data.data.map((brand, idx) => {
                return <div className="col-md-4 border border-black col-sm-6 col-lg-3  hover:shadow-md hover:shadow-purple-600 hover:transition-all  my-3" key={idx}>
                  <img className=" w-full " src={brand.image} alt="" />
                  <h3 className="text-center text-main my-4">{brand.name}</h3>
                </div>
              })}
            </div>
          </>
      }

    </>
  );
}