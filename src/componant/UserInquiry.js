import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { useSelector } from 'react-redux';

const UserInquiry = () => {
    const user = useSelector(state => state?.user?.user);
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInquiries = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${SummaryApi.getUserWiseInquiry.url}?email=${encodeURIComponent(user.email)}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch inquiries');
                }

                const dataResponse = await response.json();
                if (dataResponse.success) {
                    setInquiries(dataResponse.data);
                } else {
                    toast.error(dataResponse.message);
                }
            } catch (error) {
                setError(error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchUserInquiries();
        }
    }, [user]);

    if (loading) {
        return <div className="text-center animate-pulse">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">My Inquiries</h2>
            {inquiries.length === 0 ? (
                <div className="text-center">No inquiries found.</div>
            ) : (
                <ul className="space-y-4 max-h-96 overflow-y-auto scrollbar-hide">
                    {inquiries.map((inquiry, index) => (
                        <li
                            key={inquiry.srNo}
                            className="border rounded-lg p-4 shadow-md bg-white transform transition duration-500 hover:scale-105 hover:shadow-xl animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }} // staggered animations
                        >
                            <h3 className="font-semibold text-lg">{inquiry.brand} {inquiry.model}</h3>
                            <p className="text-gray-600">{inquiry.description}</p>
                            <p><strong>Status:</strong> {inquiry.status}</p>
                            <span className="block text-sm text-gray-500">
                                Date: {new Date(inquiry.createdAt).toLocaleDateString()}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserInquiry;
