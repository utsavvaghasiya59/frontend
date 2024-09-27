import React from 'react'
import { MdClose } from "react-icons/md";

const DisplayImage = ({ imgUrl, onClose }) => {
    return (
        <div className='fixed bottom-0 left-0 right-0 top-0 max-h flex justify-center items-center z-50'>
            <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer z-50' onClick={onClose}>
                    <MdClose />
                </div>
                <div className='flex justify-center p-4 max-w-[70vh] max-h-[70vh]'>
                    <img src={imgUrl} alt="" className='w-full h-full' />
                </div>
            </div>
        </div>
    )
}

export default DisplayImage