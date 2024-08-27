import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import favIcon from "../../assets/fav-icon.png"

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false)
    let { userToken, setUserToken } = useContext(AuthContext)
    const navigate = useNavigate()

    function signOut() {
        setUserToken("");
        localStorage.removeItem("token")
        navigate('/login')
    }

    return <>
        <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900 shadow-lg absolute w-full top-0 z-50">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                <Link to={'/'} className="flex items-center">
                    <img src={favIcon} className="h-6 sm:h-9" alt="Landwind Logo"/>
                    <span className="self-center text-xl font-extrabold whitespace-nowrap dark:text-white text-purple-700">FRESH CART</span>
                </Link>
                <div className="flex items-center lg:order-2">
                    <div className="hidden mt-2 mr-4 sm:inline-block">
                        <span></span>
                    </div>
                    <div className="">
                        <ul className="flex justify-center items-center gap-5">
                            {!userToken && <>
                                <li> <NavLink to={'/login'}
                                    className="text-black hover:text-purple-800 font-semibold">Log in</NavLink></li>
                                <li>  <NavLink to={'/registeration'}
                                    className="text-blach hover:text-purple-800 font-semibold">Register</NavLink></li>
                            </>}
                            {userToken && <li> <button onClick={signOut}
                                className="text-white bg-purple-700 p-2 rounded-lg font-normal">Sign out</button></li>}
                        </ul>
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} data-collapse-toggle="mobile-menu-2" type="button"
                        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="mobile-menu-2" aria-expanded="true">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                {userToken && <div className={isOpen ? "items-center justify-between w-full lg:flex lg:w-auto lg:order-1" : "items-center justify-between w-full lg:flex lg:w-auto lg:order-1 hidden"} id="mobile-menu-2">
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <NavLink to={'/'}
                                className="block py-2 pl-3 pr-4 lg:hover:text-purple-700  bg-purple-700 rounded lg:bg-transparent lg:p-0 dark:text-white"
                                aria-current="page">HOME</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/products'}
                                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">PRODUCTS</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/categories'}
                                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">CATEGORIES</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/brands'}
                                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">BRANDS</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/cart'}
                                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">CART</NavLink>
                        </li>

                    </ul>
                </div>}

            </div>
        </nav>

        <script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js"></script>
    </>
}