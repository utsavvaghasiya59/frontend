import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-gray-50 p-6 md:p-12 lg:p-16">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About Us</h1>

                <p className="text-gray-600 mb-10 max-w-3xl ">
                    Auto Junction is your trusted partner in finding the perfect car that fits your lifestyle and needs.
                    Our platform offers a wide variety of cars, from the latest models to certified pre-owned vehicles,
                    ensuring that you get the best value for your money.
                </p>

                <section className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                    <p className="text-gray-600">
                        At Auto Junction, our mission is to make car buying simple, transparent, and hassle-free. We are committed
                        to providing you with the highest level of service, with a focus on convenience, customer satisfaction,
                        and competitive pricing.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Our Vision</h2>
                    <p className="text-gray-600">
                        To become the leading online car marketplace, connecting buyers with sellers through a seamless,
                        user-friendly platform that delivers exceptional service and a wide range of vehicle options.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Years of experience in the automotive industry.</li>
                        <li>Extensive inventory of new, used, and certified pre-owned vehicles.</li>
                        <li>Dedicated customer support team.</li>
                        <li>Complete transparency with pricing and vehicle history.</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 ">
                        Our Values
                    </h2>
                    <div className="flex flex-wrap gap-6">
                        {['Integrity', 'Customer-centricity', 'Innovation', 'Quality', 'Transparency'].map((value) => (
                            <span
                                key={value}
                                className="group relative bg-red text-white px-6 py-3 rounded-lg text-sm font-medium shadow-lg transition transform hover:scale-105 focus:ring-2 focus:ring-red cursor-pointer"
                                tabIndex={0} // for keyboard accessibility
                            >
                                {value}

                                {/* Tooltip */}
                                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded-lg px-2 py-1 shadow-lg transform -translate-x-1/2 left-1/2 whitespace-nowrap">
                                    Click to learn more about {value}
                                </div>
                            </span>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
