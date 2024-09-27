import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";

import { toast } from 'react-toastify';
import SummaryApi from '../common';

const ChangeInquiryStatus = ({ inquiryId, currentStatus, onClose, refreshInquiries }) => {
    const [newStatus, setNewStatus] = useState(currentStatus);

    const handleStatusChange = (e) => {
        setNewStatus(e.target.value);
    };

    const updateInquiryStatus = async () => {
        try {
            const fetchResponse = await fetch(SummaryApi.updateInquiry.url, {
                method: SummaryApi.updateInquiry.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    inquiryId, // Send inquiryId here
                    status: newStatus // Send new status here
                })
            });

            const responseData = await fetchResponse.json();
            if (responseData.success) {
                toast.success(responseData.message);
                onClose(); // Close the modal
                refreshInquiries(); // Refresh the inquiry list after updating the status
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            toast.error("Failed to update the status. Please try again.");
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
                <h1 className='pb-4 font-medium text-lg text-center'>Change Inquiry Status</h1>
                <div className='mb-6'>
                    <label className='block text-sm text-gray-700 mb-2' htmlFor="statusSelect">Status:</label>
                    <select
                        id="statusSelect"
                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        value={newStatus}
                        onChange={handleStatusChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
                <button
                    className='w-full py-2 bg-red text-white rounded-full hover:bg-red-700 transition-all duration-200'
                    onClick={updateInquiryStatus}
                >
                    Update Status
                </button>
            </div>
        </div>
    );
};

export default ChangeInquiryStatus;
