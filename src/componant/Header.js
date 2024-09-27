import React, { useState } from 'react';
import { FaSearch, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileMenu from './ProfileMenu'; // Adjust the import path if necessary

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user?.user);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const userAvatar = user?.name ? user.name.charAt(0).toUpperCase() : null;

    const handleProfileClick = () => {
        if (!user) {
            navigate('/login');
        } else {
            setIsProfileMenuOpen(!isProfileMenuOpen);
        }
    };

    const handleLogout = () => {
        setIsProfileMenuOpen(false);
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className="bg-white border-b shadow-lg z-10">
                <div className="container mx-auto px-4 flex justify-between items-center py-2">
                    {/* Logo */}
                    <Link to={'/'} className="flex items-center">
                        <span className="font-bold text-xl text-gray-700">Auto Junction</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link to="#" className="text-gray-600 font-semibold hover:text-orange-600">NEW CARS</Link>
                        <Link to="#" className="text-gray-600 font-semibold hover:text-orange-600">USED CARS</Link>
                        <Link to="#" className="text-gray-600 font-semibold hover:text-orange-600">REVIEWS & NEWS</Link>
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="text-gray-600 font-semibold hover:text-orange-600">ADMIN PANEL</Link>
                        )}
                    </nav>

                    {/* Search & Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center border rounded-md overflow-hidden w-full max-w-xs">
                            <input
                                type="text"
                                placeholder="Search"
                                className="py-1 px-2 w-72 h-10 focus:outline-none"
                            />
                            <button className="px-3 text-lg text-gray-600">
                                <FiSearch />
                            </button>
                        </div>

                        {/* Profile Avatar */}
                        <div className="relative">
                            <button onClick={handleProfileClick} className="text-gray-600 focus:outline-none">
                                {user?._id ? (
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-600 text-white">
                                        {userAvatar}
                                    </div>
                                ) : (
                                    <FaUserCircle className="text-2xl" />
                                )}
                            </button>

                            {/* Profile Dropdown Menu */}
                            {isProfileMenuOpen && (
                                <ProfileMenu
                                    user={user}
                                    onLogout={handleLogout}
                                    onClose={() => setIsProfileMenuOpen(false)}
                                />
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu and Search Icons */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button onClick={() => setIsSearchOpen(true)} className="text-gray-600 focus:outline-none">
                            <FaSearch className="text-xl" />
                        </button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 focus:outline-none">
                            {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed top-0 left-0 w-full bg-white z-20 transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'
                        } transition-transform duration-300 ease-in-out md:hidden`}
                >
                    <div className="flex flex-col justify-between h-full py-6 px-6 overflow-y-auto">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <span className="text-2xl font-bold text-gray-800">Auto Junction</span>
                            </div>
                            <button onClick={() => setIsMenuOpen(false)} className="text-gray-600 focus:outline-none">
                                <FaTimes className="text-2xl" />
                            </button>
                        </div>

                        <div className="flex flex-col space-y-4 mt-6">
                            <Link to="#" className="text-lg text-gray-600 hover:text-orange-600">NEW CARS</Link>
                            <Link to="#" className="text-lg text-gray-600 hover:text-orange-600">USED CARS</Link>
                            <Link to="#" className="text-lg text-gray-600 hover:text-orange-600">REVIEWS & NEWS</Link>
                            {user?.role === 'admin' && (
                                <Link to="/admin" className="text-lg text-gray-600 hover:text-orange-600">ADMIN PANEL</Link>
                            )}
                        </div>

                        {user && (
                            <div className="mt-auto">
                                <button
                                    onClick={handleLogout}
                                    className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 mt-6"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Search Panel */}
                <div
                    className={`fixed top-0 left-0 w-full bg-white z-30 p-6 transform ${isSearchOpen ? 'translate-y-0' : '-translate-y-full'
                        } transition-transform duration-300 ease-in-out md:hidden`}
                >
                    <div className="flex items-center justify-between">
                        <input
                            type="text"
                            placeholder="Search for cars..."
                            className="border w-full rounded-md py-2 px-4"
                        />
                        <button onClick={() => setIsSearchOpen(false)} className="text-gray-600 ml-4 focus:outline-none">
                            <FaTimes className="text-2xl" />
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div
                        onClick={() => setIsMenuOpen(false)}
                        className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
                    />
                )}
                {isSearchOpen && (
                    <div
                        onClick={() => setIsSearchOpen(false)}
                        className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
                    />
                )}
            </header>
        </>
    );
};

export default Header;
