import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaBoxOpen, FaSignOutAlt } from 'react-icons/fa';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify'; // Make sure to import toast
import { setUserDetails } from '../store/userSlice';

const UserProfile = () => {
    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('inquiries');
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator

    const handleLogout = async () => {
        setIsLoading(true); // Start loading
        try {
            const response = await fetch(SummaryApi.logout_user.url, {
                method: "GET",
                credentials: 'include'
            });
            const data = await response.json();
            if (data.success) {
                navigate('/')
                dispatch(setUserDetails(null));
                toast.success(data.message);
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
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-4">
            {/* Sidebar */}
            <div className="fixed w-full md:w-1/4 p-4 bg-white border rounded-lg shadow-lg md:relative md:h-auto md:sticky top-0">
                <div className="flex flex-col items-center">
                    <div className="bg-gray-300 h-20 w-20 rounded-full flex items-center justify-center text-2xl text-white">
                        {user?.name.charAt(0)}
                    </div>
                    <div className="mt-4 text-center">
                        <h2 className="font-semibold text-lg">{user?.name}</h2>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                </div>
                <nav className="mt-6 space-y-2">
                    <Link
                        to="./inquiries"
                        className={`flex items-center p-2 rounded-lg transition duration-300 hover:bg-blue-100 ${activeTab === 'inquiries' ? 'bg-blue-100 text-blue-500' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('inquiries')}
                    >
                        <FaBoxOpen className="mr-2" /> My Inquiries
                    </Link>
                    <Link
                        to="./update-password"
                        className={`flex items-center p-2 rounded-lg transition duration-300 hover:bg-blue-100 ${activeTab === 'updatePassword' ? 'bg-blue-100 text-blue-500' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('updatePassword')}
                    >
                        <FaBoxOpen className="mr-2" /> Update Password
                    </Link>
                    <button
                        onClick={handleLogout}
                        className={`flex items-center p-2 w-full rounded-lg transition duration-300 hover:bg-red-100 text-gray-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging out..." : <><FaSignOutAlt className="mr-2" /> Logout</>}
                    </button>
                </nav>
            </div>

            {/* Main Content with Outlet */}
            <div className="flex-1 md:ml-1/4 p-4 bg-white border rounded-lg shadow-lg">
                <Outlet />
            </div>
        </div>
    );
};

export default UserProfile;
