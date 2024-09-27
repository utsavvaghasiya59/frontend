import React, { useState, useEffect, useRef } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import the loader from react-spinners
import SummaryApi from "../../common";
import { toast } from 'react-toastify';
import { setUserDetails } from '../../store/userSlice';
import ROLE from "../../common/role";

const UserMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const menuRef = useRef(null);
    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
    };

    const handleLogout = async () => {
        setIsMenuOpen(false);
        setIsLoading(true); // Start loading
        try {
            const fetchData = await fetch(SummaryApi.logout_user.url, {
                method: "GET",
                credentials: 'include'
            });
            const data = await fetchData.json();
            if (data.success) {
                toast.success(data.message);
                dispatch(setUserDetails(null));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to logout. Please try again.");
        } finally {
            setIsLoading(false); // End loading
        }
    };

    return (
        <div className="relative inline-block" ref={menuRef}>
            {user && (
                <div className="dropdown inline-block relative">
                    <button
                        className="text-white font-semibold text-sm gap-1 py-1 px-2 rounded flex border items-center justify-center"
                        onClick={toggleMenu}
                    >
                        <FaCircleUser />
                        <span className="mr-1 flex items-center uppercase justify-between">
                            <p>{user?.name}</p>
                            <IoIosArrowDown className="text-sm" />
                        </span>
                    </button>
                    <ul
                        className={`dropdown-menu absolute right-0 p-2 mt-2 z-50 w-48 bg-black text-white shadow-lg ${isMenuOpen ? "block" : "hidden"
                            }`}
                    >
                        {user?.role === ROLE.ADMIN
                            &&
                            <li>
                                <Link
                                    to="admin-panel/all-product"
                                    className="block px-4 py-1 hover:bg-white hover:text-black"
                                    onClick={handleMenuItemClick}
                                >
                                    Admin Pannel
                                </Link>
                            </li>
                        }
                        <li>
                            <Link
                                to="/profile/inquiries"
                                className="block px-4 py-1 hover:bg-white hover:text-black"
                                onClick={handleMenuItemClick}
                            >
                                Profile Settings
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/update-password"
                                className="block px-4 py-1 hover:bg-white hover:text-black"
                                onClick={handleMenuItemClick}
                            >
                                Update Password
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile/inquiries"
                                className="block px-4 py-1 hover:bg-white hover:text-black"
                                onClick={handleMenuItemClick}
                            >
                                My Inquiry
                            </Link>
                        </li>

                        <li>
                            <button
                                className="block px-4 py-1 w-full text-start hover:bg-white hover:text-black "
                                onClick={handleLogout}
                            >
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>
            )}
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <ClipLoader color="white" size={50} />
                </div>
            )}
        </div>
    );
};

export default UserMenu;
