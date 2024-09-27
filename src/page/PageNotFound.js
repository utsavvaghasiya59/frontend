import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
                <button
                    onClick={goToHome}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

export default PageNotFound;
