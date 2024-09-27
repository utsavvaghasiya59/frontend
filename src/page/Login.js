import React, { useState, useRef, useContext } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Context from '../context';
import ClipLoader from 'react-spinners/ClipLoader';
import { IoClose } from "react-icons/io5";
import AuthContext from '../context';

import SummaryApi from '../common';
import ForgotPassword from '../componant/ForgetPassword';

const Login = () => {
    const { toggleLoginModal, toggleSignUpModal } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const navigate = useNavigate();
    const { fetchUserDetails } = useContext(Context);
    const modalRef = useRef(null);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.signIn.url, {
                method: SummaryApi.signIn.method,
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (result.success) {
                toast.success(result.message);
                fetchUserDetails();
                navigate('/');
                toggleLoginModal();
            } else {
                toast.error(result.message || "Login failed");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div ref={modalRef} className="relative bg-white p-6 max-w-lg w-full mx-auto rounded-lg shadow-md">
                <button className="absolute top-3 right-3 text-gray-500" onClick={toggleLoginModal}>
                    <IoClose size={18} />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center">{forgotPassword ? "Forgot Password" : "Login to Auto Junction"}</h2>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    {forgotPassword ? "Enter your email to receive a password reset link." : "This is necessary to personalize results for you."}
                </p>

                {forgotPassword ? (
                    <ForgotPassword onBack={() => setForgotPassword(false)} />
                ) : (
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit} autoComplete="off">
                        <div className='flex flex-col justify-center w-full max-w-md mx-auto'>
                            <label htmlFor="email" className="text-gray-700 font-semibold mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name='email'
                                value={data.email}
                                onChange={handleOnChange}
                                placeholder='Enter Your Email Id'
                                className='border border-gray-300 p-3 rounded w-full'
                                required
                            />
                        </div>
                        <div className='flex flex-col justify-center w-full max-w-md mx-auto'>
                            <label htmlFor="password" className="text-gray-700 font-semibold mb-1">Password</label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    placeholder='Enter Your Password'
                                    className='border border-gray-300 p-3 rounded w-full pr-10'
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer'
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <div className='flex justify-between w-full max-w-md mx-auto'>
                            <label className='flex items-center space-x-2'>
                                <input
                                    type='checkbox'
                                    className='form-checkbox h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500'
                                />
                                <span className='text-gray-700 cursor-pointer'>Keep me signed in</span>
                            </label>
                            <button type="button" onClick={() => setForgotPassword(true)} className='text-blue-600 hover:underline'>
                                Forgot Password?
                            </button>
                        </div>
                        <div className='flex flex-col justify-center w-full mt-3'>
                            <button
                                type="submit"
                                className="bg-red hover:bg-red-700 text-white hover:font-semibold p-3 rounded-md w-full"
                                disabled={loading}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                )}

                <p className='my-4 text-center'>
                    Don’t have an account? <button onClick={toggleSignUpModal} className='text-blue-600 hover:underline'>Sign Up</button>
                </p>
            </div>

            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <ClipLoader color="#ffffff" size={50} />
                </div>
            )}
        </div>
    );
};

export default Login;
