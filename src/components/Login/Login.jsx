import React, { useContext, useState } from "react"
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()
  let { setUserToken } = useContext(AuthContext)


  const initialValues = {
    "email": "",
    "password": "",
  }

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Please enter valid Email"),
    password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Minimum eight characters, at least one letter, one number and one special character:"),
  })

  let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })

  async function onSubmit() {
    setErrorMsg("")
    setIsLoading(true)
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then(({ data }) => {
      setIsLoading(false)
      setUserToken(data.token);
      localStorage.setItem("token", data.token)
      if (location.pathname == "/login") {
        navigate("/")
      } else {
        navigate(location.pathname)
      }
    }).catch((err) => {
      setIsLoading(false)
      setErrorMsg(err.response.data.message)
    })
    console.log(data);
  }

  return <>

    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg  px-8 py-10 flex flex-col items-center mt-32 mb-28">
      <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to Fresh Cart</h1>
      <form onSubmit={handleSubmit} action="#" className="w-full flex flex-col gap-4">

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

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500" disabled={isLoading}>Log in {isLoading && <i className="fas fa-spinner fa-spin"></i>}</button>
        {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
      </form>

      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500 dark:text-gray-300">Don't have an account? </span>
        <Link to={'/registeration'} className="text-blue-500 hover:text-blue-600">Register</Link>
      </div>

    </div >

  </>
}