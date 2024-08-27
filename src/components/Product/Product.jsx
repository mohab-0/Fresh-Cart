import React, { useContext } from 'react'
import Ratings from '../Ratings/Ratings'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import { addproductToCart } from '../../cartService'

export default function Product({ product }) {

    let { userToken } = useContext(AuthContext)

    return <>
        <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <Link className="relative flex h-60 overflow-hidden rounded-xl" to={"/productdetails/" + product._id}>
                <img className="w-full" src={product.imageCover} alt="product image" />
            </Link>
            <div className="mt-4 px-5 pb-5">
                <Link to={"/productdetails/" + product._id}>
                    <h5 className="text-xl font-semibold tracking-tight text-slate-900 line-clamp-1">{product.title}</h5>

                </Link>
                <p className="line-clamp-2 text-gray-400">{product.description}</p>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                        <span className="text-3xl font-bold text-slate-900">{product.price}$</span>
                    </p>
                    <Ratings rating={product.ratingsAverage} />
                </div>
                <button onClick={() => addproductToCart(product._id, userToken)} className="w-full flex items-center justify-center rounded-md bg-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-white focus:outline-none border hover:text-purple-700 hover:border hover:border-purple-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to cart</button>
            </div>
        </div>
    </>
}
