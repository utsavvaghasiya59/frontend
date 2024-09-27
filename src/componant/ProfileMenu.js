import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { toast } from 'react-toastify';
import SummaryApi from '../common'; // Ensure this path is correct

const ProfileMenu = ({ user, onLogout, onClose }) => {
    const dispatch = useDispatch();
    const profileMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleLogout = async () => {
        try {
            const response = await fetch(SummaryApi.logout_user.url, {
                method: SummaryApi.logout_user.method,
                credentials: 'include'
            });
            const data = await response.json();

            if (data?.success) {
                toast.success(data?.message);
                dispatch(setUserDetails(null));
                onLogout();
            }
            if (data?.error) {
                toast.error(data?.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleMenuItemClick = () => {
        onClose();
    };

    return (
        <div
            ref={profileMenuRef}
            className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2 z-20"
        >
            {user?.role === "ADMIN" &&
                <Link
                    to="/admin-panel/all-product"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                    Admin Panel
                </Link>
            }
            <Link
                to="/profile"
                onClick={handleMenuItemClick}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
                View Profile
            </Link>
            <button
                onClick={() => {
                    handleLogout();
                    handleMenuItemClick(); // Close the menu after logout
                }}
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
                Logout
            </button>
        </div>
    );
};

export default ProfileMenu;
