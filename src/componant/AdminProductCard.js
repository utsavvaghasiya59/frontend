import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import AdminDeleteProduct from './AdminDeleteProduct';
const AdminProductCard = ({ data, fetchData }) => {
    const [editProduct, setEditProduct] = useState(false)
    const [deleteProduct, setDeleteProduct] = useState(false)
    return (
        <>
            <div class="relative max-w-72 h-84 mb-5 rounded-lg overflow-hidden shadow-md bg-white">
                <div class="relative">
                    <img class="w-full h-48 object-cover" src={data?.productImage[0]} alt="Car Image" />
                    <div class="absolute bottom-0 w-full bg-gray-400 text-white flex justify-between items-center p-2 text-xs">
                        <div class="flex items-center gap-1 capitalize">
                            <FaCalendarAlt /> {data?.modelYear} Model
                        </div>
                        <div class="flex items-center gap-1 capitalize">
                            <FaLocationDot /> {data?.country}
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-2 px-4 py-3">
                    <div class="flex flex-col gap-1">
                        <p class="font-semibold text-sm">{data?.brandName}  {data?.modelName}</p>
                        <p class="text-sm font-semibold text-gray-800">
                            {displayINRCurrency(data?.startPrice, data?.endPrice)}
                        </p>
                    </div>
                    <p class="text-gray-700 text-xs line-clamp-2">
                        {data?.description}
                    </p>
                </div>
                <div className='absolute bottom-2 right-2 flex gap-2'>
                    <div className='p-2  bg-gray-100 hover:bg-gray-600 rounded-full cursor-pointer hover:text-white text-gray-600' onClick={() => setEditProduct(true)}>
                        <MdModeEditOutline />
                    </div>
                    <div className='p-2  bg-gray-100 hover:bg-gray-600 rounded-full cursor-pointer hover:text-white text-gray-600' onClick={() => setDeleteProduct(true)}>
                        <MdDelete />
                    </div>
                </div>
                {editProduct && (
                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchData={fetchData} />
                )}
                {deleteProduct && (
                    <AdminDeleteProduct onClose={() => setDeleteProduct(false)} productData={data} fetchData={fetchData} />
                )}
            </div>

        </>
    )
}

export default AdminProductCard