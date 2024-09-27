import React, { useEffect } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../../common/role';
import { useMediaQuery } from 'react-responsive';
import { ToastContainer } from 'react-toastify';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();

    // Media query to check if the screen width is at least 768px (tablet size)
    const isTabletOrLarger = useMediaQuery({ query: '(min-width: 768px)' });

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate('/');
        } else if (!isTabletOrLarger) {
            navigate('/'); // Redirect to home if screen is smaller than tablet size
        }
    }, [user, navigate, isTabletOrLarger]);

    return (
        <div className='flex min-h-screen'>
            <aside className='bg-white w-60 shadow-lg fixed top-0 left-0 h-full'>
                <div className='h-32 flex flex-col items-center justify-center border-b'>
                    <div className='text-5xl cursor-pointer relative'>
                        {
                            user?.profilePic ? (
                                <img src={user.profilePic} alt={user?.name} className='w-20 h-20 rounded-full' />
                            ) : (
                                <FaRegUserCircle />
                            )
                        }
                    </div>
                    <p className='font-semibold capitalize text-lg mt-2'>{user?.name}</p>
                    <p className='text-xs'>{user?.role}</p>
                </div>
                {/* Navigation */}
                <nav className='flex flex-col p-4 mt-4'>
                    <Link to={"all-users"} className="py-2 px-4 hover:bg-gray-100 rounded-md">All Users</Link>
                    <Link to={"all-product"} className="py-2 px-4 hover:bg-gray-100 rounded-md mt-2">All Cars</Link>
                    <Link to={"all-inquiry"} className="py-2 px-4 hover:bg-gray-100 rounded-md mt-2">All Inquiry</Link>
                </nav>
            </aside>
            <ToastContainer />
            <main className='flex-1 ml-60 p-4 overflow-y-auto'>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPanel;
