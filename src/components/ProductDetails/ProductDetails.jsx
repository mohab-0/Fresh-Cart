import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Ratings from '../Ratings/Ratings';
import Loading from '../Loading/Loading';
import ImageSlider from '../ImageSlider/ImageSlider';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import { addproductToCart } from '../../cartService';
import { AuthContext } from '../../Contexts/AuthContext';

export default function ProductDetails() {

    let { userToken } = useContext(AuthContext)

    let { id } = useParams()
    console.log(id);

    const [productDetails, setProductDetails] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getProductDetails()
    }, [id])

    async function getProductDetails() {
        setIsLoading(true)
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + id)
        setProductDetails(data.data);
        getRelatedproducts(data.data?.category._id)
        setIsLoading(false)
    }

    async function getRelatedproducts(categoryId) {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/", {
            params: {
                "category": categoryId
            }
        })
        setRelatedProducts(data.data);

    }


    return (
        <>
            {
                isLoading ? <Loading /> :
                    <div class="pt-10">
                        <div class="container mx-auto px-4 pt-8">
                            <div class="flex flex-wrap px-20 -mx-4">

                                <div class="w-full  md:w-4/12  px-4 ">
                                    <ImageSlider images={productDetails?.images} />
                                </div>

                                {/* <!-- Product Details --> */}
                                <div class="w-full md:w-7/12 px-4">
                                    <h2 class="text-3xl font-bold mb-2">{productDetails?.title}</h2>

                                    <div class="mb-4">
                                        <span class="text-2xl font-bold mr-2">${productDetails?.price}</span>
                                        {/* <span class="text-gray-500 line-through">$399.99</span> */}
                                    </div>
                                    <div class="flex items-center mb-4">
                                        <Ratings rating={productDetails?.ratingsAverage} />
                                    </div>
                                    <p class="text-gray-700 mb-6">
                                        {productDetails?.description}
                                    </p>
                                    <div class="mb-6">
                                        <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                                        <h3 className='font-bold'>{productDetails?.brand.name}</h3>
                                    </div>
                                    <div class="mb-6">
                                        <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <h3 className='font-bold'>{productDetails?.category.name}</h3>
                                    </div>
                                    <div class="mb-6">
                                        <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">SubCategory</label>
                                        <h3 className='font-bold'>{productDetails?.subcategory[0].name}</h3>
                                    </div>

                                    <div class="flex space-x-4 mb-6">
                                        <button onClick={() => addproductToCart(productDetails._id, userToken)}
                                            class="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                            </svg>
                                            Add to Cart
                                        </button>
                                        <button
                                            class="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                            </svg>
                                            Wishlist
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <RelatedProducts products={relatedProducts} />


                        </div>
                    </div>}
        </>
    )
}
