import React from 'react'
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminDeleteProduct = ({ productData, onClose, fetchData }) => {
    const handleDelete = async (e) => {
        e.preventDefault();
        console.log(productData);

        try {
            const response = await fetch(SummaryApi.deleteProduct.url, {
                method: SummaryApi.deleteProduct.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: productData._id })
            });
            const responseData = await response.json()
            if (responseData.success) {
                toast.success(responseData?.message)
                onClose()
                fetchData()
            }
            if (responseData.error) {
                toast.error(responseData?.message)
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while trying to delete the product.');
        }
    };
    return (
        <div className='fixed bg-slate-200 bg-opacity-50 w-full h-full top-0 left-0 flex justify-center items-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
                <h2 className='text-xl font-semibold mb-4 text-center'>
                    Are you sure you want to delete <span className='text-red-600'>{productData?.modelName}</span>?
                </h2>
                <div className='flex justify-between'>
                    <button
                        onClick={() => onClose()}
                        className='bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded'>
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className='bg-red hover:bg-red-700 text-white py-2 px-4 rounded'>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminDeleteProduct
