import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Bounce, toast } from 'react-toastify'
import Loading from '../Loading/Loading'
import CartProduct from '../CartProduct/CartProduct'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Cart() {
    const [isLoading, setIsLoading] = useState(true)
    const [cart, setCart] = useState(null)

    useEffect(() => {
        getUserCart()
    }, [])
    async function getUserCart() {
        setIsLoading(true)
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        setCart(data)
        setIsLoading(false)
    }

    async function clearCart() {
        let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        setCart(null)
    }

    return <>
        <Helmet>
            <title>Cart</title>
        </Helmet>
        {isLoading ? <Loading />
            :

            <div className=" min-h-screen py-8 px-10">
                <div className="container mx-auto px-4">
                    <div className='flex justify-between w-3/4'>
                        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                        {/* <button onClick={clearCart} className='text-red-500 border-2  border-red-500 rounded-md  px-2 hover:text-white hover:bg-red-500 block '>Clear Cart</button> */}
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-3/4">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                <table className="w-full">
                                    <thead className=''>
                                        <tr>
                                            <th className="text-left font-semibold">Product</th>
                                            <th className="text-left font-semibold">Price</th>
                                            <th className="text-left font-semibold">Quantity</th>
                                            <th className="text-left font-semibold">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {cart?.data.products.map((product, index) => {
                                            return (
                                                <CartProduct key={index} product={product} setCart={setCart} cart={cart} />
                                            )
                                        })}
                                        {/* <!-- More product rows --> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="md:w-1/4">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>${cart?.data.totalCartPrice}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Shipping</span>
                                    <span>$0.00</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold">${cart?.data.totalCartPrice}</span>
                                </div>
                                <div className='flex'>
                                    <Link to={'/ShippingAddress/' + cart?.data._id} className="bg-blue-500 text-center text-white  py-2 px-4 rounded-lg mt-4 w-full">Checkout</Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>

}
























