import React from 'react';
import img1 from '../assest/cars/Aston-Martin-DB11-Right-Front-Three-Quarter-82872.webp';
import displayINRCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';

const SearchProductCard = ({ product }) => {
    console.log(product);

    return (
        // <div className="max-w-full  h-auto p-2 flex flex-col gap-3 bg-white rounded-xl  overflow-hidden md:max-w-4xl">
        <Link to={`/product/${product?._id}`} className="flex flex-col border rounded-md shadow-md overflow-hidden md:h-56 md:flex-row h-full ">
            {/* Image Section */}
            <div className="w-full md:w-1/3 h-auto">
                <img
                    className="w-full h-full  object-scale-down mix-blend-multiply pointer-events-none" // Adjust object-fit as needed
                    src={product?.productImage[0]} // Ensure this is the correct image path
                    alt={product?.brandName + " " + product.modelName}
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between p-4 md:w-2/3">
                <div className=''>
                    <div className='flex items-center'>
                        <h2 className="text-lg font-bold text-gray-900">{product?.brandName + " " + product?.modelName}</h2>
                        <MdKeyboardArrowRight size={20} />
                    </div>
                    <p className="text-base md:text-xl font-semibold text-gray-900 mt-2">
                        {displayINRCurrency(product?.startPrice, product?.endPrice)} <span className="text-[10px] text-gray-500">(Price in Surat)</span>
                    </p>
                    <p className="text-xs md:text:sm text-gray-500 mt-1">{product?.fuelType} • {product?.cityMileage} • {product?.transmission}</p>
                </div>

                <button className="mt-4 w-full md:max-w-64 text-center text-red border border-red rounded-lg py-2  transition">
                    Check Offers
                </button>
            </div>
        </Link>
        // </div >
    );
};

export default SearchProductCard;
