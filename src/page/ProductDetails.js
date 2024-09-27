import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import { TbEngine } from 'react-icons/tb';
import { ImPower } from 'react-icons/im';
import { MdOutlineAirlineSeatReclineExtra } from 'react-icons/md';
import { CiDroplet } from 'react-icons/ci';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSelector } from 'react-redux';
import AuthContext from '../context';
import Login from './Login';
import InquiryForm from '../componant/InquiryForm';

const ProductDetails = () => {
    const { isLoginOpen, isSignUpOpen, toggleLoginModal, isInquiryOpen, setIsInquiryOpen } = useContext(AuthContext);
    const user = useSelector((state) => state?.user?.user);
    const navigate = useNavigate()
    const [data, setData] = useState(null); // Start with null to indicate loading
    const { id } = useParams();

    const fetchProductDetails = async () => {
        try {
            const response = await fetch(SummaryApi.productDetails.url, {
                method: SummaryApi.productDetails.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    productId: id
                })
            });
            const dataResponse = await response.json();
            setData(dataResponse?.data);
        } catch (error) {
            console.error("Failed to fetch product details:", error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProductDetails();
    }, [id]); // Add id as a dependency to refetch when id changes
    const handleOpenLogin = () => {
        toggleLoginModal()
        return (
            isLoginOpen && <Login />
        )
    }
    const handleInqurifyForm = () => {
        setIsInquiryOpen(true)
        return (
            // <Navigate to="/inquiry" replace={true} state={data} />
            navigate('/inquiry', { state: { data: { email: user.email, brandName: data.brandName, modelName: data.modelName, id: id } } })
        )
    }

    return (
        <div className="container max-w-6xl my-5 mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row">
                <div className="relative w-full max-w-xl mx-auto">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={10}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        className="w-full"
                    >
                        {data?.productImage.length > 0 ? (
                            data.productImage.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img className="w-full h-80 object-cover rounded-lg" src={image} alt={`Slide ${index}`} />
                                </SwiperSlide>
                            ))
                        ) : (
                            <SwiperSlide>
                                <Skeleton height={320} className="w-full rounded-lg" />
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>

                <div className="md:w-1/2 md:pl-6 mt-6 md:mt-0">
                    {data ? (
                        <>
                            <h1 className="text-3xl font-bold mb-2">{data.brandName} {data.modelName}</h1>
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="text-yellow-500 text-lg">★★★★★</span>
                                <span className="text-gray-600">(102 Reviews)</span>
                                <button className="text-blue-500 text-sm">Rate & Win ₹1000</button>
                            </div>
                            <p className="text-gray-700 mb-4 line-clamp-5">{data.description}</p>
                            <div className="text-2xl font-semibold text-red-600 mb-4">{displayINRCurrency(data.startPrice, data.endPrice)}</div>

                            <p className="text-gray-500 mb-2">*Ex-showroom Price in <Link to="#" className="text-blue-500">Mumbai</Link></p>
                            <button
                                className="bg-red text-white px-4 py-2 rounded-lg"
                                onClick={user ? handleInqurifyForm : handleOpenLogin}
                            // {user && onclick}
                            >Inquiry</button>
                        </>
                    ) : (
                        <>
                            <Skeleton height={30} width={200} className="mb-4" />
                            <Skeleton height={20} width="80%" className="mb-4" />
                            <Skeleton height={40} width="60%" className="mb-4" />
                            <Skeleton height={30} width={150} className="mb-4" />
                        </>
                    )}
                </div>
            </div>

            <div className="p-4 bg-white shadow-md rounded-md border mt-6">
                <h2 className="text-xl font-semibold mb-4">{data?.modalName || <Skeleton width={200} />} specs & features</h2>
                <div className="border-b-2 border-gray-200 mb-4">
                    <div className="flex space-x-4 text-orange-500">
                        <button className="border-b-2 border-orange-500 pb-2">Key Specifications</button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {data ? (
                        <>
                            <div className="flex items-center space-x-2">
                                <span className="text-xl text-slate-600"><TbEngine /></span>
                                <div>
                                    <span className="text-gray-600">Engine Capacity</span>
                                    <p className="text-black">{data.engineCc} cc</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-lg"><ImPower /></span>
                                <div>
                                    <span className="text-gray-600">Power</span>
                                    <p className="text-black capitalize">{data.engineType} Transmission</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-lg">⛽</span>
                                <div>
                                    <span className="text-gray-600">Fuel Type</span>
                                    <p className="text-black">{data.fuelType}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-lg">🚪</span>
                                <div>
                                    <span className="text-gray-600">No. of Doors</span>
                                    <p className="text-black">{data.noOfDoors}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-lg"><MdOutlineAirlineSeatReclineExtra /></span>
                                <div>
                                    <span className="text-gray-600">Seating Capacity</span>
                                    <p className="text-black">{data.seatingCapacity}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-lg"><CiDroplet /></span>
                                <div>
                                    <span className="text-gray-600">Fuel Capacity</span>
                                    <p className="text-black">{data.fuelCapacity} L</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-lg">📏</span>
                                <div>
                                    <span className="text-gray-600">Dimensions</span>
                                    <p className="text-black">L: {data.length} mm, W: {data.width} mm, H: {data.height} mm</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center space-x-2">
                                <Skeleton circle height={40} width={40} />
                                <Skeleton width={100} />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Skeleton height={20} width={150} />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Skeleton height={20} width={150} />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Skeleton height={20} width={150} />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Skeleton height={20} width={150} />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Skeleton height={20} width={150} />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Skeleton height={20} width={150} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
