import React, { useState, useRef, useEffect, useContext } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import SummaryApi from '../common';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context';

const emailRegx = /^[a-zA-z][a-zA-Z.!@#$%^&*()_-\d]{2,}[@][a-zA-Z]{2,}[.][a-zA-Z]{2,6}$/;
const usernameRegx = /^[a-zA-Z][\w!@#$%^&*()-_.]{2,23}$/;
const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*()])[\w!@#$%^&*()]{8,24}$/;

const SignUp = () => {
    const { toggleSignInModal, toggleSignUpModal } = useContext(AuthContext);
    const [data, setData] = useState({
        email: localStorage.getItem('email') || "",
        password: "",
        name: localStorage.getItem('name') || "",
        confirmPassword: "",
        otp: "",
        userId: localStorage.getItem('userId') || ""
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otpSent, setOtpSent] = useState(localStorage.getItem('otpSent') === 'true' || false);
    const [loading, setLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    const modalRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('otpSent', otpSent);
    }, [toggleSignUpModal, otpSent]);

    useEffect(() => {
        let timer;
        if (resendCooldown > 0) {
            timer = setInterval(() => {
                setResendCooldown(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendCooldown]);

    const validateField = (name, value) => {
        let error = '';

        if (name === 'email') {
            if (!emailRegx.test(value)) error = 'Invalid email format.';
        } else if (name === 'password') {
            if (!passwordRegx.test(value)) error = 'Password must be 8-24 characters with uppercase, lowercase, number, and special character.';
        } else if (name === 'confirmPassword') {
            if (value !== data.password) error = 'Passwords do not match.';
        } else if (name === 'name') {
            if (!usernameRegx.test(value)) error = 'Name should be 3-24 characters.';
        }

        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));

        // Trigger validation on change
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure all fields are valid before submitting
        let isValid = true;
        ['email', 'password', 'confirmPassword', 'name'].forEach((field) => {
            if (!data[field]) {
                validateField(field, data[field]);
                isValid = false;
            }
        });

        if (Object.keys(errors).some((key) => errors[key])) {
            isValid = false;
        }

        if (!isValid) {
            toast.error("Please fix validation errors.");
            return;
        }

        if (!otpSent) {
            try {
                setLoading(true);
                const response = await fetch(SummaryApi.signUp.url, {
                    method: SummaryApi.signUp.method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: data.email,
                        name: data.name,
                        password: data.password,
                        role: "GENERAL"
                    })
                });

                const responseData = await response.json();

                if (response.ok && responseData.success) {
                    setOtpSent(true);
                    setData(prevData => ({
                        ...prevData,
                        userId: responseData.data._id
                    }));
                    localStorage.setItem('email', data.email);
                    localStorage.setItem('name', data.name);
                    localStorage.setItem('userId', responseData.data._id);
                    toast.success("OTP sent to your email.");
                } else {
                    toast.error(responseData.message || "Failed to send OTP.");
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.");
            } finally {
                setLoading(false);
            }
        } else {
            try {
                setLoading(true);
                const verifyResponse = await fetch(SummaryApi.verifyOtp.url, {
                    method: SummaryApi.verifyOtp.method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: data.userId, otp: data.otp })
                });

                const verifyData = await verifyResponse.json();

                if (verifyResponse.ok && verifyData.success) {
                    toast.success(verifyData.message);
                    localStorage.clear();
                    toggleSignUpModal();
                } else {
                    toast.error(verifyData.message || "OTP verification failed.");
                }
            } catch (error) {
                toast.error("An error occurred during OTP verification. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleResendOtp = async () => {
        if (resendCooldown > 0) return;

        setLoading(true);

        try {
            const response = await fetch(SummaryApi.resendOtp.url, {
                method: SummaryApi.resendOtp.method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: data.email })
            });

            const responseData = await response.json();

            if (responseData.success) {
                setResendCooldown(60);
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            toast.error("Failed to resend OTP.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 scrollbar-hide">
            <div
                ref={modalRef}
                className="relative bg-white px-4 py-4 max-w-lg w-full mx-auto rounded-lg shadow-md flex flex-col z-50 transform transition-transform duration-300 scale-100"
                style={{ maxHeight: '90vh' }}
            >
                <button className="absolute top-3 right-3 text-gray-500" onClick={toggleSignUpModal}>
                    <IoClose size={18} />
                </button>
                <div className="mb-3">
                    <h2 className="text-2xl font-bold mb-2 text-left">Sign Up to Auto Junction</h2>
                    <p className="text-sm text-gray-600 mb-3 text-left">Join us and explore amazing car deals</p>
                </div>

                <div className="flex-grow overflow-y-auto scrollbar-hide">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit} autoComplete="off">
                        {!otpSent && (
                            <>
                                <div className='flex flex-col w-full max-w-md mx-auto'>
                                    <label htmlFor="name" className="text-gray-700 font-semibold mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name='name'
                                        value={data.name}
                                        onChange={handleOnChange}
                                        placeholder='Enter Your Name'
                                        className={`border ${errors.name ? 'border-red' : 'border-gray-300'} p-3 rounded w-full`}
                                        required
                                    />
                                    {errors.name && <span className="text-red text-sm">{errors.name}</span>}
                                </div>

                                <div className='flex flex-col w-full max-w-md mx-auto'>
                                    <label htmlFor="email" className="text-gray-700 font-semibold mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name='email'
                                        value={data.email}
                                        onChange={handleOnChange}
                                        placeholder='Enter Your Email Id'
                                        className={`border ${errors.email ? 'border-red' : 'border-gray-300'} p-3 rounded w-full`}
                                        required
                                    />
                                    {errors.email && <span className="text-red text-sm">{errors.email}</span>}
                                </div>

                                <div className='flex flex-col w-full max-w-md mx-auto'>
                                    <label htmlFor="password" className="text-gray-700 font-semibold mb-1">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            value={data.password}
                                            onChange={handleOnChange}
                                            placeholder='Enter Your Password'
                                            className={`border ${errors.password ? 'border-red' : 'border-gray-300'} p-3 rounded w-full`}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    {errors.password && <span className="text-red text-sm">{errors.password}</span>}
                                </div>

                                <div className='flex flex-col w-full max-w-md mx-auto'>
                                    <label htmlFor="confirmPassword" className="text-gray-700 font-semibold mb-1">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={data.confirmPassword}
                                            onChange={handleOnChange}
                                            placeholder='Confirm Your Password'
                                            className={`border ${errors.confirmPassword ? 'border-red' : 'border-gray-300'} p-3 rounded w-full`}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <span className="text-red text-sm">{errors.confirmPassword}</span>}
                                </div>
                            </>
                        )}

                        {otpSent && (
                            <div className='flex flex-col w-full max-w-md mx-auto'>
                                <label htmlFor="otp" className="text-gray-700 font-semibold mb-1">Enter OTP</label>
                                <input
                                    type="text"
                                    id="otp"
                                    name='otp'
                                    value={data.otp}
                                    onChange={handleOnChange}
                                    placeholder='Enter the OTP sent to your email'
                                    className="border border-gray-300 p-3 rounded w-full"
                                    required
                                />
                            </div>
                        )}

                        <div className="flex flex-col w-full max-w-md mx-auto">
                            <button
                                type="submit"
                                className="bg-red text-white py-3 px-4 rounded hover:bg-red-700 transition-all duration-300 ease-in-out"
                                disabled={loading}
                            >
                                {loading ? <ClipLoader color={"#fff"} size={20} /> : otpSent ? 'Verify OTP' : 'Sign Up'}
                            </button>

                            {otpSent && resendCooldown > 0 && (
                                <span className="text-gray-600 text-sm mt-2">Resend OTP in {resendCooldown} seconds.</span>
                            )}

                            {otpSent && resendCooldown === 0 && (
                                <button
                                    type="button"
                                    className="mt-2 text-sm  text-blue-600 hover:underline"
                                    onClick={handleResendOtp}
                                    disabled={loading}
                                >
                                    Resend OTP
                                </button>
                            )}
                        </div>

                    </form>
                    <p className='my-4 text-center'>
                        Alreay have an account? <button onClick={toggleSignInModal} className='text-blue-600 hover:underline'>Sign in</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
