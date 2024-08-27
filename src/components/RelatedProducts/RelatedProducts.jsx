import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick'
import { addproductToCart } from '../../cartService';
import { AuthContext } from '../../Contexts/AuthContext';


export default function RelatedProducts({ products }) {

    let { userToken } = useContext(AuthContext)

    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true
    };

    return (
        <>

            <div className='p-28'>
                <h3 className='text-gray-600 text-2xl mb-10 font-medium'>More Products</h3>
                <Slider {...settings}>
                    {products.map((product, index) => {
                        return < div key={index} className='w-full max-w-sm mx-auto rounded-md p-3 overflow-hidden'>
                            <div className='shadow-md'>
                                <div className='flex items-end justify-end h-56 w-full bg-center bg-cover' style={{ "background-image": `url(${product.imageCover})` }}>
                                    <button onClick={() => addproductToCart(product._id, userToken)} className='p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500'>
                                        <i className="fa-solid fa-cart-shopping"></i>
                                    </button>
                                </div>
                                <div className='px-5 py-3'>
                                    <Link to={"/productdetails/" + product._id}>
                                        <h3 className='text-gray-700 capitalize line-clamp-1 font-bold'>{product.title}</h3>
                                    </Link>
                                    <span className='text-gray-500 mt-2 font-medium'>${product.price}</span>
                                </div>
                            </div>
                        </div>
                    })}
                </Slider>
            </div>
        </>
    )
}
