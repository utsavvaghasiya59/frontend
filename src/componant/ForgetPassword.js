import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import ClipLoader from 'react-spinners/ClipLoader';
import Context from '../context';

const ForgotPassword = ({ onBack }) => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false); // New state to track if OTP has been sent
    const { fetchUserDetails } = useContext(Context); // Assuming this is still needed

    // Function to handle sending the OTP
    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.forgotPassword.url, {
                method: SummaryApi.forgotPassword.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const result = await response.json();

            if (result.success) {
                toast.success(result.message);
                setIsOtpSent(true); // Set the flag to true to show OTP input
            } else {
                toast.error(result.message || "Error sending reset link");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Function to handle OTP verification
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.verifyOtp.url, {
                method: SummaryApi.verifyOtp.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }) // Send the email and OTP for verification
            });
            const result = await response.json();

            if (result.success) {
                toast.success(result.message);
                onBack(); // Call the function to go back to the login form
            } else {
                toast.error(result.message || "OTP verification failed");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col gap-4'>
            {!isOtpSent ? (
                // Email input form
                <form className='flex flex-col gap-4' onSubmit={handleForgotPasswordSubmit} autoComplete="off">
                    <div className='flex flex-col justify-center w-full max-w-md mx-auto'>
                        <label htmlFor="email" className="text-gray-700 font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Your Email Id'
                            className='border border-gray-300 p-3 rounded w-full'
                            required
                        />
                    </div>
                    <div className='flex flex-col justify-center w-full mt-3'>
                        <button
                            type="submit"
                            className="bg-red hover:bg-red-700 text-white hover:font-semibold p-3 rounded-md w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <ClipLoader color="#ffffff" size={24} />
                            ) : (
                                'Send OTP'
                            )}
                        </button>
                    </div>
                </form>
            ) : (
                // OTP input form
                <form className='flex flex-col gap-4' onSubmit={handleVerifyOtp} autoComplete="off">
                    <div className='flex flex-col justify-center w-full max-w-md mx-auto'>
                        <label htmlFor="otp" className="text-gray-700 font-semibold mb-1">Enter OTP</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder='Enter the OTP sent to your email'
                            className='border border-gray-300 p-3 rounded w-full'
                            required
                        />
                    </div>
                    <div className='flex flex-col justify-center w-full mt-3'>
                        <button
                            type="submit"
                            className="bg-red hover:bg-red-700 text-white hover:font-semibold p-3 rounded-md w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <ClipLoader color="#ffffff" size={24} />
                            ) : (
                                'Verify OTP'
                            )}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;
