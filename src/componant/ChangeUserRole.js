import React, { useState } from 'react';
import ROLE from '../common/role';
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
    const [userRole, setUserRole] = useState(role);

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
    };

    const updateUserRole = async () => {
        try {
            const fetchResponse = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    role: userRole
                })
            });

            const responseData = await fetchResponse.json();
            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                callFunc();
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            toast.error("Failed to update the role. Please try again.");
        }
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-slate-200 bg-opacity-50 z-10'>
            <div className='relative bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mx-4'>
                <button
                    className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'
                    onClick={onClose}
                >
                    <IoMdClose size={24} />
                </button>
                <h1 className='pb-4 font-medium text-lg text-center'>Change User Role</h1>
                <div className='mb-4'>
                    <p className='text-sm text-gray-700'><strong>Name:</strong> {name}</p>
                    <p className='text-sm text-gray-700'><strong>Email:</strong> {email}</p>
                </div>
                <div className='mb-6'>
                    <label className='block text-sm text-gray-700 mb-2' htmlFor="userRole">Role:</label>
                    <select
                        id="userRole"
                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        value={userRole}
                        onChange={handleOnChangeSelect}
                    >
                        {Object.values(ROLE).map(el => (
                            <option value={el} key={el}>{el}</option>
                        ))}
                    </select>
                </div>
                <button
                    className='w-full py-2 bg-red text-white rounded-full hover:bg-red-700 transition-all duration-200'
                    onClick={updateUserRole}
                >
                    Change Role
                </button>
            </div>
        </div>
    );
};

export default ChangeUserRole;
