import React, { useContext, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../Login";
import SignUp from "../SignUp";
import AuthContext from "../../context";

const Header = () => {
    const user = useSelector((state) => state?.user?.user);
    const { isLoginOpen, isSignUpOpen, toggleLoginModal } = useContext(AuthContext);

    useEffect(() => {
        if (isLoginOpen || isSignUpOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isLoginOpen, isSignUpOpen]);

    return (
        <header className="bg-white shadow-md py-3 px-0 sm:px-8">
            <div className="flex justify-between items-center px-2 md:px-4">
                <Link to="/" className="font-bold text-xl text-gray-800 sm:text-2xl">
                    Auto Junction
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <div className="items-center hidden lg:flex">
                        <div className="circle-icon flex items-center justify-center border border-gray-800 rounded-full w-8 h-8">
                            <MdEmail className="text-gray-800" />
                        </div>
                        <div className="ml-2">
                            <p className="text-xs uppercase font-bold text-gray-600 ">
                                For Support Mail Us:
                            </p>
                            <Link
                                to="mailto:mern.carforyou@gmail.com"
                                className="text-sm text-gray-600 hover:text-orange-600"
                            >
                                mern.carforyou@gmail.com
                            </Link>
                        </div>
                    </div>

                    <div className="items-center hidden lg:flex">
                        <div className="circle-icon flex items-center justify-center border border-gray-800 rounded-full w-8 h-8">
                            <IoMdCall className="text-gray-800" />
                        </div>
                        <div className="ml-2">
                            <p className="text-xs uppercase font-bold text-gray-600">
                                Service Helpline Call Us:
                            </p>
                            <Link
                                to="tel:+0000000000"
                                className="text-sm text-gray-600 hover:text-orange-600"
                            >
                                +0000000000
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="text-sm font-semibold text-gray-800 capitalize">
                            Welcome To Auto Junction, {user?.name}
                        </div>
                    ) : (
                        <button
                            onClick={toggleLoginModal}
                            className="bg-red text-white font-semibold py-2 px-4 uppercase text-xs rounded-sm transition hover:bg-red-700"
                        >
                            Login / Register
                        </button>
                    )}
                </div>
            </div>

            {isLoginOpen && <Login />}
            {isSignUpOpen && <SignUp />}
        </header>
    );
};

export default Header;
