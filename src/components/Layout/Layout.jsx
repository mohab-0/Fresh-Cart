import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return <>
        <Navbar />
        <div className="py-20 mx-auto bg-gray-100">
            <Outlet />
        </div>
        <Footer />
    </>
}