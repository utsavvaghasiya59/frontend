import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import SummaryApi from '../common';

const UpdatePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validatePasswordStrength = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        if (!validatePasswordStrength(newPassword)) {
            setError("Password must be at least 8 characters long, include an uppercase letter, and contain a number.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(SummaryApi.updatePassword.url, {
                method: SummaryApi.updatePassword.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldPassword: currentPassword,
                    newPassword,
                }),
            });
            console.log(response);

            const data = await response.json();

            console.log(data); // Log the response data for debugging

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update password');
            }

            setSuccess("Password updated successfully!");
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.message);
            console.error("Error updating password:", err); // Log the error for debugging
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full max-w-[720px] p-6 mx-auto">
            <h2 className="mb-6 text-2xl font-bold text-center text-red-600">Update Password</h2>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            {success && <div className="mb-4 text-green-600">{success}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Current Password</label>
                    <input
                        type="text"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="text"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                        type="text"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                    disabled={loading}
                >
                    {loading ? (
                        <ClipLoader color="#ffffff" loading={loading} size={24} />
                    ) : (
                        'Update Password'
                    )}
                </button>
            </form>
        </div>
    );
};

export default UpdatePassword;
