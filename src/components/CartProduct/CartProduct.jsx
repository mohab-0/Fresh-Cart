import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function CartProduct({ product, setCart, cart }) {
    const [isIncreaseLoading, setIsIncreaseLoading] = useState(false)
    const [isDecreaseLoading, setIsDecreaseLoading] = useState(false)
    const [productCount, setProductCount] = useState(product.count)


    async function updateProductCart(productId, count) {
        if (count > product.count) {
            setIsIncreaseLoading(true)
        } else {
            setIsDecreaseLoading(true)
        }
        let { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
            count
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        setCart(data);
        setIsIncreaseLoading(false)
        setIsDecreaseLoading(false)
    }

    useEffect(() => {
        setProductCount(product.count)
    }, [cart])

    async function removeProductFromCart(productId) {
        let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        setCart(data);
        toast.success("Product has been Removed Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    // useEffect(() => {
    //     updateProductCart(product.product._id, productCount)
    // }, [productCount])

    return (
        <tr>
            <td className="py-4">
                <div className="flex items-center">
                    <img className="h-16 w-16 mr-4" src={product.product.imageCover} alt="Product image" />
                    <span className="font-semibold">{product.product.title}</span>
                </div>
            </td>
            <td className="py-4">${product.price}</td>
            <td className="py-4">
                <div className="flex items-center">
                    <button disabled={isDecreaseLoading} onClick={() => updateProductCart(product.product._id, product.count - 1)} className="border rounded-md py-2 px-4 mr-2">{isDecreaseLoading ? <i className='fas fa-spinner fa-spin text-sm'></i> : "-"}</button>
                    <input onBlur={() => product.count != productCount && updateProductCart(product.product._id, productCount)} onChange={(e) => setProductCount(e.target.value)} className="text-center w-8 border-0" value={productCount} />
                    <button disabled={isIncreaseLoading} onClick={() => updateProductCart(product.product._id, product.count + 1)} className="border rounded-md py-2 px-4 ml-2">{isIncreaseLoading ? <i className='fas fa-spinner fa-spin text-sm'></i> : "+"}</button>
                </div>
            </td>
            <td className="py-4">${product.price * product.count}</td>
            <td onClick={() => removeProductFromCart(product.product._id)}><i class="fa-solid fa-trash text-red-600 cursor-pointer"></i></td>
        </tr>
    )
}




