import React, { useState } from 'react'
import { MdClose } from "react-icons/md";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImages';
import DisplayImage from './DisplayImage';
import { TiDelete } from "react-icons/ti";
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import fuelType from '../helpers/fuelType';
import seatingCapacity from '../helpers/seatingCapacity';

const AdminEditProduct = ({ onClose, productData, fetchData }) => {
    const [data, setData] = useState({
        ...productData,
        brandName: productData?.brandName,
        modelName: productData?.modelName,
        transmission: productData?.transmission,
        engineType: productData?.engineType,
        startPrice: productData?.startPrice,
        endPrice: productData?.endPrice,
        height: productData?.height,
        width: productData?.width,
        length: productData?.length,
        seatingCapacity: productData?.seatingCapacity,
        fuelType: productData?.fuelType,
        fuelCapacity: productData?.fuelCapacity,
        productImage: [...productData?.productImage],
        description: productData?.description,
        modelYear: productData?.modelYear,
        country: productData?.country,
        engineCc: productData?.engineCc,
        noOfDoors: productData?.noOfDoors
    })
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        const uploadImageCloudinary = await uploadImage(file)
        setData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }
        })
    }
    const handleProductImageDelete = async (index) => {
        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)
        setData((prev) => {
            return {
                ...prev,
                productImage: [...newProductImage]
            }
        })
    }
    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        console.log(data);

        const response = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json()
        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchData()
        }
        if (responseData.error) {
            toast.error(responseData?.message)
        }
    }
    return (
        <div className=' fixed bg-slate-200 bg-opacity-50 w-full h-full top-0 left-0 bottom-0 right-0 flex justify-center items-center z-50 '>
            <div className='bg-white p-4 rounded max-w-2xl w-full h-full max-h-[80%] overflow-hidden '>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Upload Car</h2>
                    <div className='w-fit ml-auto text-xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <MdClose />
                    </div>
                </div>
                <form action="" className='grid p-4 gap-2 overflow-y-scroll h-full pb-5 scrollbar-hide' onSubmit={handleSubmitProduct}>
                    <label htmlFor="brandName" className='mt-3'>Brand Name : </label>
                    <input type="text"
                        name="brandName"
                        id="brandName"
                        placeholder='Enter Brand name'
                        value={data.brandName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />
                    <label htmlFor="modelName">Model Name : </label>
                    <input type="text"
                        name="modelName"
                        id="modelName"
                        placeholder='Enter Model name'
                        value={data.modelName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />
                    <div className='flex gap-3 '>
                        <div className='flex flex-col gap-2 max-w-[50%] w-full'>
                            <label htmlFor="transmission" className='mt-3'>Transmission : </label>
                            <select name="transmission" id="transmission" value={data?.transmission} onChange={handleOnChange} required className='p-2 bg-slate-100 border rounded' >
                                <option value="" >Select Category</option>
                                {
                                    productCategory.map((el, index) => {
                                        return (
                                            <option value={el.value} key={el.value + index}>{el.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='flex flex-col gap-2 max-w-[50%] w-full'>
                            <label htmlFor="engineType" className='mt-3'>EngineType : </label>
                            <input type="text"
                                name="engineType"
                                id="engineType"
                                placeholder='Enter Engine Type'
                                value={data?.engineType}
                                onChange={handleOnChange}
                                className='p-2 bg-slate-100 border rounded'
                                required
                            />
                        </div>
                    </div>
                    <div className='flex gap-3 '>
                        <div className='flex flex-col gap-2 max-w-[50%] w-full'>
                            <label htmlFor="fuelType" className='mt-3'>Fuel Type : </label>
                            <select name="fuelType" id="fuelType" value={data.fuelType} onChange={handleOnChange} required className='p-2 bg-slate-100 border rounded' >
                                <option value="" >Select Category</option>
                                {
                                    fuelType.map((el, index) => {
                                        return (
                                            <option value={el.value} key={el.value + index}>{el.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='flex flex-col gap-2 max-w-[50%] w-full'>
                            <label htmlFor="fuelCapacity" className='mt-3 relative'>Fuel Capacity : <span className='absolute top-1 text-xs text-red-600'>*In Liter</span></label>
                            <input type="number"
                                name="fuelCapacity"
                                id="fuelCapacity"
                                placeholder='Enter Fuel Capacity'
                                value={data.fuelCapacity}
                                onChange={handleOnChange}
                                className='p-2 remove-arrow bg-slate-100 border rounded'
                                required
                            />
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-2 max-w-[50%] w-full'>
                            <label htmlFor="startPrice" className='mt-3'>Starting Price : </label>
                            <input type="number"
                                name="startPrice"
                                id="startPrice"
                                placeholder='Enter Start Price'
                                value={data.startPrice}
                                onChange={handleOnChange}
                                className='p-2 remove-arrow bg-slate-100 border rounded'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2 max-w-[50%] w-full'>
                            <label htmlFor="endPrice" className='mt-3'>Ending Price : </label>
                            <input type="number"
                                name="endPrice"
                                id="endPrice"
                                placeholder='Enter End Price'
                                value={data.endPrice}
                                onChange={handleOnChange}
                                className='p-2 remove-arrow bg-slate-100 border rounded'
                                required
                            />
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-2 max-w-[50%] w-full'>
                            <label htmlFor="modelYear" className='mt-3'>Model Year : </label>
                            <input type="text"
                                name="modelYear"
                                id="modelYear"
                                placeholder='Enter Model Year'
                                value={data.modelYear}
                                onChange={handleOnChange}
                                className='p-2 bg-slate-100 border rounded'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2 max-w-[50%] w-full'>
                            <label htmlFor="country" className='mt-3'>Country :</label>
                            <input type="text"
                                name="country"
                                id="country"
                                placeholder='Enter country'
                                value={data.country}
                                onChange={handleOnChange}
                                className='p-2 bg-slate-100 border rounded'
                                required
                            />
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-2 max-w-[50%] w-full'>
                            <label htmlFor="height" className='mt-3'>Height : </label>
                            <input type="number"
                                name="height"
                                id="height"
                                placeholder='Enter Height'
                                value={data.height}
                                onChange={handleOnChange}
                                className='p-2 remove-arrow bg-slate-100 border rounded'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2 max-w-[50%] w-full'>
                            <label htmlFor="width" className='mt-3'>Width : </label>
                            <input type="number"
                                name="width"
                                id="width"
                                placeholder='Enter Width'
                                value={data.width}
                                onChange={handleOnChange}
                                className='p-2 remove-arrow bg-slate-100 border rounded'
                                required
                            />
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-2 max-w-[50%] w-full'>
                            <label htmlFor="length" className='mt-3'>Length : </label>
                            <input type="number"
                                name="length"
                                id="length"
                                placeholder='Enter Length'
                                value={data.length}
                                onChange={handleOnChange}
                                className='p-2 remove-arrow bg-slate-100 border rounded'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2 max-w-[50%] w-full'>
                            <label htmlFor="engineCc" className='mt-3'>Engine CC : </label>
                            <input type="number"
                                name="engineCc"
                                id="engineCc"
                                placeholder='Enter Engine cc'
                                value={data.engineCc}
                                onChange={handleOnChange}
                                className='p-2 remove-arrow bg-slate-100 border rounded'
                                required
                            />
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-2 max-w-[50%] w-full'>
                            <label htmlFor="noOfDoors" className='mt-3'>Noof Door : </label>
                            <select name="noOfDoors" id="noOfDoors" value={data.noOfDoors} onChange={handleOnChange} required className='p-2 bg-slate-100 border rounded' >
                                <option value="" >Select Noof Door</option>
                                {
                                    seatingCapacity.map((el, index) => {
                                        return (
                                            <option value={el.value} key={el.value + index}>{el.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='flex flex-col gap-2 max-w-[50%] w-full'>
                            <label htmlFor="seatingCapacity" className='mt-3'>Seating Capacity : </label>
                            <select name="seatingCapacity" id="seatingCapacity" value={data.seatingCapacity} onChange={handleOnChange} required className='p-2 bg-slate-100 border rounded' >
                                <option value="" >Select Seating Capacity</option>
                                {
                                    seatingCapacity.map((el, index) => {
                                        return (
                                            <option value={el.value} key={el.value + index}>{el.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <label htmlFor="productImage" className='mt-3'>Product Image : </label>
                    <label htmlFor="uploadImageInput" className=' cursor-pointer'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'>
                                    <FaCloudUploadAlt />
                                </span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type="file" name="" id="uploadImageInput" accept="image/*" className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>
                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex gap-2 items-center'>
                                    {
                                        data?.productImage.map((el, index) => {
                                            return (
                                                <div className='relative group' key={index}>
                                                    <img src={el}
                                                        alt={el}
                                                        width={80}
                                                        height={80}
                                                        className='bg-slate-100 border cursor-pointer '
                                                        onClick={() => {
                                                            setOpenFullScreenImage(true)
                                                            setFullScreenImage(el)
                                                        }}
                                                    />
                                                    <div className=' deleteImage absolute  text-2xl rounded cursor-pointer hidden group-hover:block' onClick={() => handleProductImageDelete(index)}>
                                                        <TiDelete />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>*Please Upload Product Image</p>
                            )
                        }
                    </div>
                    <label htmlFor="description" className='mt-3'>Description : </label>
                    <textarea name="description" value={data.description} onChange={handleOnChange} required className='h-28 bg-slate-100 rounded border resize-none p-1 mb-4' placeholder='Enter Product Description' />
                    <button className='px-3 py-2 bg-red text-white mb-10 '>Update Car</button>
                </form>
            </div >
            {/* display image */}
            {
                openFullScreenImage && (
                    <DisplayImage imgUrl={fullScreenImage} onClose={() => setOpenFullScreenImage(false)} />
                )
            }
        </div >
    )
}

export default AdminEditProduct