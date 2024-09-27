import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowBack, IoIosSearch } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../../common';

const SearchDropdown = ({ isSearchOpen, setIsSearchOpen }) => {
    const [allProducts, setAllProducts] = useState([]); // Store all fetched products
    const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered products based on search query
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false); // New state to manage dropdown visibility
    const searchInputRef = useRef(null);
    const navigate = useNavigate();

    const fetchAllProducts = async () => {
        setLoading(true);
        try {
            const url = `${SummaryApi.allProduct.url}`;
            const response = await fetch(url);
            const dataResponse = await response.json();
            const fetchedProducts = dataResponse.data || [];
            setAllProducts(fetchedProducts);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch all products once when the component is mounted
        fetchAllProducts();
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setFilteredProducts([]);
            setSearchQuery('');
            setDropdownVisible(false); // Close dropdown after submit
        }
    };

    const handleSearch = (inputValue) => {
        setSearchQuery(inputValue);

        if (inputValue) {
            const normalizedInput = inputValue.trim().toLowerCase();

            const filtered = allProducts.filter(product => {
                const brand = product.brandName.toLowerCase();
                const model = product.modelName.toLowerCase();

                const isBrandMatch = brand.includes(normalizedInput);
                const isModelMatch = model.includes(normalizedInput);
                const combinedMatch = (brand + model).includes(normalizedInput);

                const searchTerms = normalizedInput.split(/\s+/);
                const brandAndModelMatch = searchTerms.length > 1
                    ? brand.includes(searchTerms[0]) && model.includes(searchTerms.slice(1).join(' '))
                    : false;

                return isBrandMatch || isModelMatch || combinedMatch || brandAndModelMatch;
            });

            setFilteredProducts(filtered);
            setNoResults(filtered.length === 0);
        } else {
            setFilteredProducts([]);
            setNoResults(false);
        }
    };

    const handleFocus = () => {
        setDropdownVisible(true);
    };

    const handleBlur = () => {
        // Add a slight delay to allow click events to complete (e.g., clicking a product link)
        setTimeout(() => {
            setDropdownVisible(false);
        }, 150);
    };

    useEffect(() => {
        if (isSearchOpen) {
            document.body.style.overflow = 'hidden';
            searchInputRef.current?.focus();
        } else {
            document.body.style.overflow = 'auto';
            setFilteredProducts([]);
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isSearchOpen]);

    return (
        <>
            {/* Mobile version */}
            <div
                className={`fixed inset-0 bg-white z-50 flex flex-col text-black transition-transform duration-300 ${isSearchOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}
            >
                <div className="flex items-center w-full p-4 bg-slate-50">
                    <button
                        className="mr-2 text-gray-800 cursor-pointer"
                        onClick={() => setIsSearchOpen(false)}
                    >
                        <IoIosArrowBack size={26} />
                    </button>
                    <div className="relative flex-1">
                        <form className="flex items-center border-2 w-full" onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                ref={searchInputRef}
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                onFocus={handleFocus} // Open dropdown on focus
                                onBlur={handleBlur}   // Close dropdown on blur
                                placeholder="Try Searching for"
                                className="w-full p-2 outline-none"
                            />
                            <IoIosSearch className="absolute right-4 text-gray-400" size={24} />
                        </form>
                        {loading && dropdownVisible ? (
                            <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10 p-4 text-center">
                                Loading...
                            </div>
                        ) : noResults && searchQuery !== '' && dropdownVisible ? (
                            <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10 p-4 text-center">
                                No results found.
                            </div>
                        ) : filteredProducts.length > 0 && dropdownVisible && (
                            <ul className="absolute top-full left-0 w-full bg-white shadow-lg z-10 max-h-64 overflow-y-auto">
                                {filteredProducts.map(product => (
                                    <li
                                        key={product._id}
                                        className="p-2 cursor-pointer hover:bg-gray-200"
                                    >
                                        <Link
                                            to={`/product/${product._id}`}
                                            onClick={() => {
                                                setIsSearchOpen(false);
                                                setFilteredProducts([]);
                                                setSearchQuery('');
                                                setDropdownVisible(false); // Close dropdown after selecting a product
                                            }}
                                        >
                                            {product.brandName} {product.modelName}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/* Desktop version */}
            <div className={`relative w-64 bg-white text-black rounded-lg shadow-lg z-40 hidden lg:block`}>
                <form className="flex items-center" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        ref={searchInputRef}
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        onFocus={handleFocus} // Open dropdown on focus
                        onBlur={handleBlur}   // Close dropdown on blur
                        placeholder="Search..."
                        className="w-full p-2 outline-none"
                    />
                    <IoIosSearch className="ml-2 lg:ml-0 lg:absolute lg:right-3 lg:top-1/2 lg:transform lg:-translate-y-1/2 text-gray-500" />
                </form>
                {loading && dropdownVisible ? (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10 p-4 text-center">
                        Loading...
                    </div>
                ) : noResults && searchQuery !== '' && dropdownVisible ? (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10 p-4 text-center">
                        No results found.
                    </div>
                ) : filteredProducts.length > 0 && dropdownVisible && (
                    <ul className="absolute top-full left-0 w-full bg-white shadow-lg z-10 max-h-64 overflow-y-auto">
                        {filteredProducts.map(product => (
                            <li
                                key={product._id}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                            >
                                <Link
                                    to={`/product/${product._id}`}
                                    onClick={() => {
                                        setIsSearchOpen(false);
                                        setFilteredProducts([]);
                                        setSearchQuery('');
                                        setDropdownVisible(false); // Close dropdown after selecting a product
                                    }}
                                >
                                    {product.brandName} {product.modelName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default SearchDropdown;
