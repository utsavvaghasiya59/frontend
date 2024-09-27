import React, { useState } from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import imageToBase64 from '../../helpers/imageToBase64';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        city: '',
        feedback: '',
        file: null,
        agree: false,
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        mobile: '',
    });

    const [loading, setLoading] = useState(false);

    const validate = (name, value) => {
        switch (name) {
            case 'name':
                return /^[a-zA-Z ]{2,30}$/.test(value)
                    ? ''
                    : 'Name should be 2-30 characters and only contain letters and spaces';
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? ''
                    : 'Enter a valid email address';
            case 'mobile':
                return /^[0-9]{10}$/.test(value)
                    ? ''
                    : 'Enter a valid 10-digit mobile number';
            default:
                return '';
        }
    };

    const handleChange = async (e) => {
        const { name, value, type, checked, files } = e.target;
        let errorMessage = '';

        if (type !== 'checkbox' && type !== 'file') {
            errorMessage = validate(name, value);
            setErrors({ ...errors, [name]: errorMessage });
        }

        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else if (type === 'file') {
            const file = files[0];
            if (file) {
                try {
                    const base64String = await imageToBase64(file);
                    setFormData({ ...formData, [name]: base64String });
                } catch (error) {
                    console.error("Error converting image:", error);
                }
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = Object.values(errors).every((err) => err === '');

        if (isValid) {
            setLoading(true);
            try {
                const response = await fetch(SummaryApi.sendContactDetails.url, {
                    method: SummaryApi.sendContactDetails.method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();
                setLoading(false);

                if (result.success) {
                    toast.success(result.message);
                    setFormData({
                        name: '',
                        email: '',
                        mobile: '',
                        city: '',
                        feedback: '',
                        file: null, // Reset file
                        agree: false,
                    });
                    setErrors({ name: '', email: '', mobile: '' }); // Clear errors
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                setLoading(false);
                console.error('Error submitting form:', error);
                toast.error('An error occurred while submitting the form. Please try again later.');
            }
        } else {
            toast.error('Please correct the errors in the form.');
        }
    };

    return (
        <div className="container max-w-6xl mx-auto flex flex-col items-center min-h-screen p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 w-full text-start">Contact Us</h1>

            <div className="w-full max-w-6xl bg-white p-8 shadow-md rounded-lg">
                <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-6 lg:space-y-0">
                    {/* Left Side: Contact Details */}
                    <div className="flex-1">
                        <div className="flex gap-2 items-center text-xl font-semibold text-gray-800 mb-4">
                            <MdOutlineEmail />
                            <h1>E-mail</h1>
                        </div>
                        <div className="text-lg text-gray-600 mb-6">
                            <Link
                                to="mailto:mern.carforyou@gmail.com"
                                className="text-sm text-gray-600 hover:text-orange-600"
                            >
                                mern.carforyou@gmail.com
                            </Link>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Let Us Contact You</h2>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`border p-2 rounded-lg focus:outline-none ${errors.name ? 'border-red' : 'border-gray-300'}`}
                                        required
                                    />
                                    {errors.name && <p className="text-sm text-red mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`border p-2 rounded-lg focus:outline-none ${errors.email ? 'border-red' : 'border-gray-300'}`}
                                        required
                                    />
                                    {errors.email && <p className="text-sm text-red mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        placeholder="Enter Mobile Number"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className={`border p-2 rounded-lg focus:outline-none ${errors.mobile ? 'border-red' : 'border-gray-300'}`}
                                        required
                                    />
                                    {errors.mobile && <p className="text-sm text-red mt-1">{errors.mobile}</p>}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="border border-gray-300 p-2 rounded-lg focus:outline-none"
                                    />
                                </div>
                            </div>

                            <textarea
                                name="feedback"
                                placeholder="Please share your feedback, what can we improve?"
                                value={formData.feedback}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none mb-4"
                                rows="4"
                            />

                            <div className="mb-4">
                                <input
                                    type="file"
                                    name="file"
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded-lg focus:outline-none w-full"
                                />
                                <p className="text-sm text-gray-500 mt-2">Upload .jpg, .png files only.</p>
                            </div>

                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    name="agree"
                                    checked={formData.agree}
                                    onChange={handleChange}
                                    className="mr-2"
                                    id="agree"
                                    required
                                />
                                <label className="text-gray-600 text-sm" htmlFor="agree">
                                    I agree to{' '}
                                    <Link className="text-blue-500 underline">Terms & Conditions</Link>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-red text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition duration-300"
                            >
                                {loading ? (
                                    <ClipLoader color="#ffffff" size={20} />
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
