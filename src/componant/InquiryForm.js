import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import SummaryApi from '../common';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const InquiryForm = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        firstName: location.state?.data?.name || user?.name || '',
        lastName: '',
        email: location.state?.data?.email || user?.email || '',
        mobile: '',
        city: '',
        state: '',
        brand: location.state?.data?.brandName || '',
        model: location.state?.data?.modelName || '',
        description: '',
        terms: false,
    });

    const [errors, setErrors] = useState({});
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [brandModelMap, setBrandModelMap] = useState({});
    const [selectedState, setSelectedState] = useState('');
    const [selectedBrand, setSelectedBrand] = useState(formData.brand);

    useEffect(() => {
        const checkUser = async () => {
            if (!user) {
                setIsLoading(true);
                navigate('/');
            } else {
                setIsLoading(false);
            }
        };
        checkUser();
    }, [user, navigate]);

    const fetchAllBrandAndModel = async () => {
        try {
            const response = await fetch(SummaryApi.getBrandModel.url, {
                method: SummaryApi.getBrandModel.method,
                credentials: "include",
            });
            const data = await response.json();
            const brandModelData = data.data;

            const fetchedBrands = brandModelData.map(item => item.brandName);
            setBrands(fetchedBrands);

            const brandModelMapping = {};
            brandModelData.forEach(item => {
                brandModelMapping[item.brandName] = item.modelName || [];
            });
            setBrandModelMap(brandModelMapping);
        } catch (error) {
            console.error("Error fetching brands and models:", error);
        }
    };

    useEffect(() => {
        if (!isLoading) {
            fetchAllBrandAndModel();
        }
    }, [isLoading]);

    const validate = (name, value) => {
        switch (name) {
            case 'firstName':
                return value.length < 2 ? 'First name must be at least 2 characters' : '';
            case 'lastName':
                return value.length < 2 ? 'Last name must be at least 2 characters' : '';
            case 'email':
                if (!value) return 'Email is required';
                return /\S+@\S+\.\S+/.test(value) ? '' : 'Email is invalid';
            case 'mobile':
                if (!value) return 'Mobile number is required';
                return /^\d{10}$/.test(value) ? '' : 'Mobile number must be 10 digits';
            case 'city':
                return value ? '' : 'City must be selected';
            case 'state':
                return value ? '' : 'State must be selected';
            case 'brand':
                return value ? '' : 'Brand must be selected';
            case 'model':
                return value ? '' : 'Model must be selected';
            case 'terms':
                return value ? '' : 'You must accept the terms and conditions';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });

        if (type !== 'checkbox') {
            const errorMessage = validate(name, type === 'checkbox' ? checked : value);
            setErrors({ ...errors, [name]: errorMessage });
        }
    };

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await fetch(SummaryApi.getState.url);
                const data = await response.json();
                if (data.success) {
                    const fetchedStates = data.data.map(state => ({
                        _id: state._id,
                        name: state.name,
                    }));
                    console.log(fetchedStates);

                    setStates(fetchedStates);
                }
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        };
        if (!isLoading) fetchStates();
    }, [isLoading]);

    useEffect(() => {
        const fetchCities = async () => {
            if (!selectedState) return;
            try {
                const response = await fetch(SummaryApi.getCityByState.url, {
                    method: SummaryApi.getCityByState.method, // e.g., 'POST'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ state_name: selectedState }), // Send the state name in the request body
                });
                console.log(response);
                const data = await response.json();
                if (data.success) {
                    console.log("success");

                    const fetchedCities = data.data.map(city => ({
                        _id: city._id,
                        name: city.name,
                        state_name: city.state_name
                    }));
                    console.log(fetchedCities);
                    setCities(fetchedCities);
                }
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };
        if (!isLoading) fetchCities();
    }, [selectedState, isLoading]);


    useEffect(() => {
        if (formData.brand) {
            const selectedBrandModels = brandModelMap[formData.brand] || [];
            setModels(selectedBrandModels);

            if (!selectedBrandModels.includes(formData.model) && selectedBrandModels.length > 0) {
                setFormData(prev => ({
                    ...prev,
                    model: selectedBrandModels[0]
                }));
            }
        } else {
            setModels([]);
            setFormData(prev => ({
                ...prev,
                model: ''
            }));
        }
    }, [formData.brand, brandModelMap]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {
            firstName: validate('firstName', formData.firstName),
            lastName: validate('lastName', formData.lastName),
            email: validate('email', formData.email),
            mobile: validate('mobile', formData.mobile),
            city: validate('city', formData.city),
            state: validate('state', formData.state),
            brand: validate('brand', formData.brand),
            model: validate('model', formData.model),
            terms: validate('terms', formData.terms),
        };

        setErrors(validationErrors);

        if (Object.values(validationErrors).every((msg) => msg === '')) {
            try {
                const response = await fetch(SummaryApi.sendInquiry.url, {
                    method: SummaryApi.sendInquiry.method,
                    credentials: 'include',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })
                const responseData = await response.json()
                if (responseData.success) {
                    toast.success(responseData?.message)
                }
                if (responseData.error) {
                    toast.error(responseData?.message)
                }
            } catch (error) {
                console.log(error);
            }

            console.log(formData);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                mobile: '',
                city: '',
                state: '',
                brand: '',
                model: '',
                description: '',
                terms: false,
            });
        }
    };

    // Show a loading message or spinner while loading

    // Effect to update email if user email changes
    useEffect(() => {
        if (user?.email && !formData.email) {
            setFormData(prev => ({ ...prev, email: user.email }));
        }
    }, [user]);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="container max-w-[1200px] mx-auto w-full flex items-center justify-center py-8">
            <div className="p-6 w-full mx-auto">
                <h2 className="text-3xl font-bold text-gray-800">Enquire Now</h2>
                <p className="mb-4 text-gray-600">
                    Please fill out the form below to inquire about our services. We will get back to you shortly!
                </p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Name, Mobile, Email Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`border p-3 rounded-md w-full ${errors.firstName ? 'border-red focus:outline-red' : 'border-gray-300'}`}
                                placeholder="Enter your first name"
                            />
                            {errors.firstName && <p className="text-red text-sm mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`border p-3 rounded-md w-full ${errors.lastName ? 'border-red focus:outline-red' : 'border-gray-300'}`}
                                placeholder="Enter your last name"
                            />
                            {errors.lastName && <p className="text-red text-sm mt-1">{errors.lastName}</p>}
                        </div>
                    </div>

                    {/* Mobile and Email Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="mobile">Mobile</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className={`border p-3 rounded-md w-full ${errors.mobile ? 'border-red focus:outline-red' : 'border-gray-300'}`}
                                placeholder="Enter your mobile number"
                            />
                            {errors.mobile && <p className="text-red text-sm mt-1">{errors.mobile}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={location.state?.data?.email && user.email ? true : false}
                                className={`border p-3 rounded-md w-full ${errors.email ? 'border-red focus:outline-red' : 'border-gray-300'}`}
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red text-sm mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    {/* State and City Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Dropdown
                                label="State"
                                name="state"
                                options={states.map(state => state.name)}
                                value={formData.state}
                                onChange={(value) => {
                                    setFormData({ ...formData, state: value });
                                    setSelectedState(value);
                                    setErrors({ ...errors, state: validate('state', value) });
                                }}
                                error={errors.state}
                            />
                            {errors.state && <p className="text-red text-sm mt-1">{errors.state}</p>}
                        </div>
                        <div>
                            <Dropdown
                                label="City"
                                name="city"
                                options={cities.map(city => city.name)}
                                value={formData.city}
                                onChange={(value) => {
                                    setFormData({ ...formData, city: value });
                                    setErrors({ ...errors, city: validate('city', value) });
                                }}
                                error={errors.city}
                            />
                            {errors.city && <p className="text-red text-sm mt-1">{errors.city}</p>}
                        </div>
                    </div>

                    {/* Brand and Model Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Dropdown
                                label="Brand"
                                name="brand"
                                options={brands}
                                value={formData.brand}
                                onChange={(value) => {
                                    setFormData({ ...formData, brand: value });
                                    setSelectedBrand(value);
                                    setModels(brandModelMap[value] || []);
                                    setErrors({ ...errors, brand: validate('brand', value) });
                                }}
                                error={errors.brand}
                            />
                            {errors.brand && <p className="text-red text-sm mt-1">{errors.brand}</p>}
                        </div>
                        <div>
                            <Dropdown
                                label="Model"
                                name="model"
                                options={models}
                                value={formData.model}
                                onChange={(value) => {
                                    setFormData({ ...formData, model: value });
                                    setErrors({ ...errors, model: validate('model', value) });
                                }}
                                error={errors.model}
                            />
                            {errors.model && <p className="text-red text-sm mt-1">{errors.model}</p>}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border border-gray-300 p-3 rounded-md w-full"
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleChange}
                            className="mr-2"
                            id='terms'
                        />
                        <label htmlFor="terms" className="text-gray-600">
                            I agree to the <span className="text-blue-500 underline">terms and conditions</span>
                        </label>
                    </div>
                    {errors.terms && <p className="text-red text-sm mt-1">{errors.terms}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-red text-white p-2 rounded-md hover:bg-red-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InquiryForm;
