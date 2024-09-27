import { createContext, useState, useEffect } from 'react';
import SummaryApi from '../common';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isInquiryOpen, setIsInquiryOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const toggleLoginModal = () => setIsLoginOpen(!isLoginOpen);
    const toggleSignUpModal = () => {
        setIsLoginOpen(false);
        setIsSignUpOpen(!isSignUpOpen);
    };
    const toggleSignInModal = () => {
        setIsSignUpOpen(false);
        setIsLoginOpen(!isLoginOpen);
    };

    const fetchUserDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(SummaryApi.current_user.url, {
                method: SummaryApi.current_user.method,
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success) {
                dispatch(setUserDetails(data.data));
            } else {
                setError('Failed to fetch user details');
            }
        } catch (err) {
            setError('An error occurred while fetching user details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoginOpen,
            isSignUpOpen,
            isInquiryOpen,
            setIsInquiryOpen,
            toggleLoginModal,
            toggleSignUpModal,
            toggleSignInModal,
            fetchUserDetails,  // Exposing fetchUserDetails to be used anywhere in the app
            loading,
            error
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
