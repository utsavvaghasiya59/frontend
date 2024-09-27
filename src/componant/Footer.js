
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin, FaGooglePlusSquare, FaInstagram, FaChevronUp } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { IoIosArrowDroprightCircle } from 'react-icons/io';

const Footer = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer>
            <div className="bg-semi-black-light text-gray-400 py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 mb-10 md:mb-0">
                            <h6 className="text-white text-base font-semibold uppercase mb-10 pl-4">About Us</h6>
                            <ul className="list-none p-0">
                                <li className="relative flex items-center gap-1 text-white text-sm leading-6 mb-4 pl-3 hover:text-red">
                                    <MdKeyboardArrowRight size={17} />
                                    <Link to="/aboutus">About Us</Link>
                                </li>
                                <li className="relative flex items-center gap-1 text-white text-sm leading-6 mb-4 pl-3 hover:text-red">
                                    <MdKeyboardArrowRight size={17} />
                                    <Link to="/faqs">FAQs</Link>
                                </li>
                                <li className="relative flex items-center gap-1 text-white text-sm leading-6 mb-4 pl-3 hover:text-red">
                                    <MdKeyboardArrowRight size={17} />
                                    <Link to="/privacy">Privacy</Link>
                                </li>
                                <li className="relative flex items-center gap-1 text-white text-sm leading-6 mb-4 pl-3 hover:text-red">
                                    <MdKeyboardArrowRight size={17} />
                                    <Link to="/terms">Terms of use</Link>
                                </li>
                                <li className="relative flex items-center gap-1 text-white text-sm leading-6 mb-4 pl-3 hover:text-red">
                                    <MdKeyboardArrowRight size={17} />
                                    <Link to="/admin">Admin Login</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="max-w-64 md:w-1/3">
                            <h6 className="text-white text-base font-semibold uppercase mb-10">Subscribe Newsletter</h6>
                            <div className="newsletter-form">
                                <form method="post">
                                    <div className="form-group mb-4">
                                        <input
                                            type="email"
                                            name="subscriberemail"
                                            className="w-full bg-transparent border border-gray-300 rounded-sm text-sm focus-within:outline-none focus:border-blue-300 text-gray-200 py-2 px-3"
                                            required
                                            placeholder="Enter Email Address"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        name="emailsubscibe"
                                        className="w-full bg-red text-white font-semibold text-lg shadow-lg py-2 px-4 rounded-md flex items-center justify-center"
                                    >
                                        Subscribe
                                        <span className="ml-2">
                                            <IoIosArrowDroprightCircle size={24} />
                                        </span>
                                    </button>
                                </form>
                                <p className="text-gray-500 text-xs mt-2">
                                    *We send great deals and latest auto news to our subscribed users every week.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-semi-black-dark py-5">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
                        <div className="w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
                            <p className="text-white text-sm">© {new Date().getFullYear()} Auto Junction Pvt. Ltd.</p>
                        </div>
                        <div className="w-full md:w-auto flex items-center justify-center md:justify-end text-center">
                            <p className="text-white text-sm mr-0 md:mr-4 mb-2 md:mb-0">Connect with Us:</p>
                            <ul className="list-none p-0 flex justify-center md:justify-end">
                                <li className="inline-block mx-1">
                                    <Link to="/" className="text-white text-xl hover:text-gray-300">
                                        <FaFacebookSquare />
                                    </Link>
                                </li>
                                <li className="inline-block mx-1">
                                    <Link to="/" className="text-white text-xl hover:text-gray-300">
                                        <FaTwitterSquare />
                                    </Link>
                                </li>
                                <li className="inline-block mx-1">
                                    <Link to="/" className="text-white text-xl hover:text-gray-300">
                                        <FaLinkedin />
                                    </Link>
                                </li>
                                <li className="inline-block mx-1">
                                    <Link to="/" className="text-white text-xl hover:text-gray-300">
                                        <FaGooglePlusSquare />
                                    </Link>
                                </li>
                                <li className="inline-block mx-1">
                                    <Link to="/" className="text-white text-xl hover:text-gray-300">
                                        <FaInstagram />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            {showScrollButton && (
                <div className="fixed bottom-8 right-8 z-10">
                    <button
                        onClick={scrollToTop}
                        className="bg-red text-white rounded-full h-10 w-10 flex items-center justify-center"
                    >
                        <FaChevronUp size={15} />
                    </button>
                </div>
            )}
        </footer>
    );
};

export default Footer;
