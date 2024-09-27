import React, { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)
    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()
    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct?.data)
    }
    useEffect(() => {
        fetchData()
    }, [])
    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }
    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-bold py-4'>{heading}</h2>
            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-hide transition-all ' ref={scrollElement}>
                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight /></button>
                {
                    loading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded shadow-md flex' key={product + index}>
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w[145px] animate-pulse'>
                                    </div>
                                    <div className='p-4 grid w-full gap-2'>
                                        <h2 className='font-semibold text-base text-ellipsis line-clamp-1 text-black md:text-lg bg-slate-200 animate-pulse rounded-full'></h2>
                                        <p className='capitalize text-slate-500 bg-slate-200 animate-pulse rounded-full'></p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 text-sm font-medium w-full bg-slate-200 animate-pulse rounded-full' ></p>
                                            <p className='text-slate-500 text-sm line-through w-full bg-slate-200 animate-pulse rounded-full'></p>
                                        </div>
                                        <button className='text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        data.map((product, index) => {
                            return (
                                <Link to={'product/' + product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded shadow-md flex' key={product + index}>
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w[145px]'>
                                        <img src={product?.productImage[0]} alt="" className='h-full object-scale-down hover:scale-125 mix-blend-multiply transition-all ' />
                                    </div>
                                    <div className='p-4 grid '>
                                        <h2 className='font-semibold text-base text-ellipsis line-clamp-1 text-black md:text-lg'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500 '>{product?.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 text-sm font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-500 text-sm line-through'>{displayINRCurrency(product?.price)}</p>
                                        </div>
                                        <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full ' onClick={(e) => addToCart(e, product?._id)}>Add To Cart</button>
                                    </div>
                                </Link>
                            )
                        })
                    )
                }

            </div>

        </div >

    )
}

export default HorizontalCardProduct