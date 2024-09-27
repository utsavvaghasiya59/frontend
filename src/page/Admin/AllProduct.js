import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import UploadProduct from '../../componant/UploadProduct';
import SummaryApi from '../../common';
import AdminProductCard from '../../componant/AdminProductCard';
import ClipLoader from 'react-spinners/ClipLoader'; // Import the ClipLoader

const AllProduct = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false);
    const [allProduct, setAllProduct] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [brandOptions, setBrandOptions] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [loading, setLoading] = useState(false); // State for loading

    // Fetch all products and set brand options
    const fetchAllProduct = async () => {
        setLoading(true); // Start loading
        try {
            const response = await fetch(SummaryApi.allProduct.url, {
                method: "get",
                credentials: "include"
            });
            const dataResponse = await response.json();
            const products = dataResponse?.data || [];
            setAllProduct(products);
            setFilteredProducts(products);

            // Extract and set brand options
            const brands = [...new Set(products.map(product => product.brandName))];
            setBrandOptions(brands.map(brand => ({ value: brand, label: brand })));
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        fetchAllProduct();
    }, []);

    useEffect(() => {
        if (selectedBrand) {
            // Filter products by selected brand
            setFilteredProducts(allProduct.filter(product => product.brandName === selectedBrand));
        } else {
            // Show all products if no brand is selected
            setFilteredProducts(allProduct);
        }
    }, [selectedBrand, allProduct]);

    const handleBrandChange = selectedOption => {
        setSelectedBrand(selectedOption ? selectedOption.value : '');
    };

    // Custom styles for react-select
    const customStyles = {
        menu: (provided) => ({
            ...provided,
            maxHeight: '300px', // Adjust height as needed
            overflowY: 'auto',
        }),
        menuList: (provided) => ({
            ...provided,
            padding: 0,
        }),
        option: (provided) => ({
            ...provided,
            padding: 10,
        }),
    };

    return (
        <div className='flex flex-col h-full'>
            <div className='bg-white py-2 px-4 flex justify-between items-center shadow-md'>
                <h2 className='font-bold text-lg'>All Cars</h2>
                <div className='flex items-center gap-4'>
                    <div className='w-64'>
                        <Select
                            value={brandOptions.find(option => option.value === selectedBrand)}
                            onChange={handleBrandChange}
                            options={brandOptions}
                            placeholder='Select Brand'
                            classNamePrefix='custom-select'
                            styles={customStyles}
                            isClearable
                        />
                    </div>
                    <button
                        className='border-2 py-1 px-3 rounded-full border-red-600 text-red-600 transition-all hover:bg-red-600 hover:text-red hover:border-red'
                        onClick={() => setOpenUploadProduct(true)}
                    >
                        Upload Cars
                    </button>
                </div>
            </div>

            <div className='flex flex-wrap gap-4 p-2 overflow-y-auto' style={{ maxHeight: 'calc(100vh - 120px)' }}>
                {loading ? (
                    <div className='flex justify-center items-center w-full h-full'>
                        <ClipLoader
                            color="#3498db"
                            loading={loading}
                            size={50} // Adjust size as needed
                        />
                    </div>
                ) : (
                    filteredProducts.map((product, index) => (
                        <AdminProductCard data={product} key={index} fetchData={fetchAllProduct} />
                    ))
                )}
            </div>

            {openUploadProduct && (
                <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
            )}
        </div>
    );
};

export default AllProduct;
