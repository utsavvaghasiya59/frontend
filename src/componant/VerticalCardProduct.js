import React, { useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight, FaCalendarAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

// Skeleton Loader Component
const SkeletonLoader = () => (
    <div className='min-w-[280px] md:min-w-[320px] w-full max-w-[320px] h-80 bg-white rounded-lg shadow-md'>
        <div className='bg-slate-200 h-48 flex justify-center items-center animate-pulse'></div>
        <div className='p-4 space-y-3'>
            <h2 className='font-semibold text-base text-black md:text-lg bg-slate-200 animate-pulse rounded-full h-6 w-full'></h2>
            <p className='bg-slate-200 animate-pulse rounded-full h-4 w-full'></p>
            <div className='flex gap-3'>
                <p className='bg-slate-200 animate-pulse rounded-full h-4 w-full'></p>
                <p className='bg-slate-200 animate-pulse rounded-full h-4 w-full'></p>
            </div>
            <button className='text-sm bg-slate-200 animate-pulse rounded-full h-8 w-full'></button>
        </div>
    </div>
);

const VerticalCardProduct = ({ brandName, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  // Error handling state
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef();

    const fetchData = async () => {
        setLoading(true);
        setError(null); // Reset error state before fetching new data
        try {
            const categoryProduct = await fetchCategoryWiseProduct(brandName);
            setData(categoryProduct?.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch product data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [brandName]);  // Fetch data whenever brandName changes

    const updateScrollButtons = () => {
        if (scrollElement.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollElement.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
        }
    };

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    useEffect(() => {
        updateScrollButtons(); // Initial check when data is loaded
        if (scrollElement.current) {
            scrollElement.current.addEventListener('scroll', updateScrollButtons);
        }
        return () => {
            if (scrollElement.current) {
                scrollElement.current.removeEventListener('scroll', updateScrollButtons);
            }
        };
    }, [data]);

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-bold py-4'>{heading}</h2>
            <div
                className='flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-hide transition-all'
                ref={scrollElement}
            >
                {canScrollLeft && (
                    <button
                        className='bg-white bg-opacity-40 shadow-md z-10 p-1 absolute left-0 text-lg hidden md:block'
                        onClick={scrollLeft}
                    >
                        <FaAngleLeft />
                    </button>
                )}
                {canScrollRight && (
                    <button
                        className='bg-white bg-opacity-40 shadow-md z-10 p-1 absolute right-0 text-lg hidden md:block'
                        onClick={scrollRight}
                    >
                        <FaAngleRight />
                    </button>
                )}

                {loading
                    ? loadingList?.map((_, index) => <SkeletonLoader key={index} />)  // Skeleton component for loading state
                    : error
                        ? <p className="text-red-500">{error}</p>  // Display error message if an error occurs
                        : data?.map((item, index) => (
                            <Link
                                to={'product/' + item?._id}
                                className='min-w-[280px] md:min-w-[320px] w-full max-w-[320px] h-80 rounded-lg overflow-hidden shadow-md border bg-white'
                                key={index}
                            >
                                <div className='relative'>
                                    <img
                                        className='w-full h-48 object-cover'
                                        src={item?.productImage[0]}
                                        alt='Car Image'
                                    />
                                    <div className='absolute bottom-0 w-full bg-gray-400 text-white flex justify-between items-center p-2 text-xs'>
                                        <div className='flex items-center gap-1 capitalize'>
                                            <FaCalendarAlt /> {item?.modelYear} Model
                                        </div>
                                        <div className='flex items-center gap-1 capitalize'>
                                            <FaLocationDot /> {item?.country}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 px-4 py-3'>
                                    <div className='flex flex-col gap-1'>
                                        <p className='font-semibold text-sm'>{item?.brandName} {item?.modelName}</p>
                                        <p className='text-sm font-semibold text-gray-800'>
                                            {displayINRCurrency(item?.startPrice, item?.endPrice)}
                                        </p>
                                    </div>
                                    <p className='text-gray-700 text-xs line-clamp-2'>{item?.description}</p>
                                </div>
                            </Link>
                        ))}
            </div>
        </div>
    );
};

export default VerticalCardProduct;
