import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import SearchProductCard from '../componant/SearchProductCard';

const SearchProduct = () => {
    const [products, setProducts] = useState([]);
    const query = useLocation()

    const fetchProduct = async () => {
        const response = await fetch(SummaryApi.searchProduct.url + query.search);
        const dataResponse = await response.json();
        console.log("data-response", dataResponse);

        setProducts(dataResponse.data);
    };

    useEffect(() => {
        fetchProduct();
    }, [query]);

    return (
        <div className="container max-w-full h-auto p-2 flex flex-col gap-4 bg-white rounded-xl overflow-hidden md:max-w-4xl">
            <h1 className='text-3xl font-semibold'>
                {products.length > 0 ? `All ${products[0].brandName} Models` : 'No Products Available'}
            </h1>
            {products.length > 0 ? (
                <ul className='flex flex-col gap-3'>
                    {products.map(product => (
                        <li key={product._id}>
                            <SearchProductCard product={product} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products found</p>
            )}
        </div>
    );
};

export default SearchProduct;
