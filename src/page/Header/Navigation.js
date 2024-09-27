import React, { useState, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";
import SearchDropdown from "./SearchDropdown";

const Navigation = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navRef = useRef(null);

    const toggleNav = () => setIsNavOpen(!isNavOpen);
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

    return (
        <nav className="bg-black text-white px-0 sm:px-4">
            <div className="flex items-center justify-between py-4 px-4 md:px-0 relative">
                <button
                    className="block md:hidden p-2 focus:outline-none"
                    onClick={toggleNav}
                    aria-expanded={isNavOpen}
                    aria-controls="navigation"
                >
                    <span className="sr-only">Toggle navigation</span>
                    <FaBars className="text-white" size={24} />
                </button>

                <div
                    ref={navRef}
                    className={`absolute md:relative top-full left-0 right-0 bg-black md:bg-transparent md:flex items-center space-x-6 z-40 transition-all duration-300 ease-in-out transform ${isNavOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 md:opacity-100 md:max-h-full"} overflow-hidden`}
                    id="navigation"
                >
                    <button
                        className="absolute top-0 right-0 md:hidden px-2"
                        onClick={toggleNav}
                    >
                        <FaTimes className="text-white" size={18} />
                    </button>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-red font-semibold py-2 block md:inline-block'
                                : 'hover:text-red font-semibold py-2 block md:inline-block'
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/aboutus"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-red font-semibold py-2 block md:inline-block'
                                : 'hover:text-red font-semibold py-2 block md:inline-block'
                        }
                    >
                        About Us
                    </NavLink>
                    {/* 
                    <NavLink
                        to="/faqs"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-red font-semibold py-2 block md:inline-block'
                                : 'hover:text-red font-semibold py-2 block md:inline-block'
                        }
                    >
                        FAQs
                    </NavLink> */}

                    <NavLink
                        to="/contactus"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-red font-semibold py-2 block md:inline-block'
                                : 'hover:text-red font-semibold py-2 block md:inline-block'
                        }
                    >
                        Contact Us
                    </NavLink>
                </div>

                <div className="flex items-center">
                    <UserMenu />

                    <div className="relative ml-4">
                        <button
                            className="block lg:hidden focus:outline-none border rounded-sm py-1 px-1"
                            onClick={toggleSearch}
                        >
                            <IoIosSearch className="text-white" size={24} />
                        </button>
                        <SearchDropdown isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
