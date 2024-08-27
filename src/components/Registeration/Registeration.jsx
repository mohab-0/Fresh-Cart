import React, { useState } from "react"
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Registeration() {

    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const navigate = useNavigate()

    const initialValues = {
        "name": "",
        "email": "",
        "password": "",
        "rePassword": "",
        "phone": ""
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required").min(3, "Name length must be more than 3 letters").max(20, "Name length must be less than 20 letters"),
        email: Yup.string().required("Email is required").email("Please enter valid Email"),
        password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Minimum eight characters, at least one letter, one number and one special character:"),
        rePassword: Yup.string().required("Re-Enter your Password").oneOf([Yup.ref("password")], "Your password must be matches"),
        phone: Yup.string().required("Phone number is required")
    })

    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    async function onSubmit() {
        setSuccessMsg("")
        setErrorMsg("")
        setIsLoading(true)
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then((response) => {
            setIsLoading(false)
            console.log(response.data.message);
            setSuccessMsg(response.data.message)
            setTimeout(() => {
                navigate("/login")
            }, 500);
        }).catch((err) => {
            setIsLoading(false)
            console.log(err.response.data.message);
            setErrorMsg(err.response.data.message)

        })
    }

    return <>

        <div className="max-w-lg mt-20 mb-24 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg px-8 py-10 flex flex-col items-center">
            <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to My Company</h1>
            <form onSubmit={handleSubmit} action="#" className="w-full flex flex-col gap-4">
                <div className="flex items-start flex-col justify-start">
                    <label htmlFor="firstName" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Name:</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.name} type="text" id="Name" name="name" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {touched.name && errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>

                <div className="flex items-start flex-col justify-start">
                    <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {touched.email && errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>

                <div className="flex items-start flex-col justify-start">
                    <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {touched.password && errors.password && <p className="text-red-500">{errors.password}</p>}
                </div>

                <div className="flex items-start flex-col justify-start">
                    <label htmlFor="confirmPassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Confirm Password:</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} type="password" id="rePassword" name="rePassword" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {touched.rePassword && errors.rePassword && <p className="text-red-500">{errors.rePassword}</p>}
                </div>

                <div className="flex items-start flex-col justify-start">
                    <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone Number:</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {touched.phone && errors.phone && <p className="text-red-500">{errors.phone}</p>}
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500" disabled={isLoading}>Register {isLoading && <i className="fas fa-spinner fa-spin"></i>}</button>
                {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
                {successMsg && <p className="text-green-500 capitalize text-center">{successMsg}</p>}
            </form>

            <div className="mt-4 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
                <Link to={'/login'} className="text-blue-500 hover:text-blue-600">Login</Link>
            </div>

        </div >

    </>
}