import React from 'react';
import { useMediaQuery } from 'react-responsive';

const ContactInfo = ({ handleLoginSignup }) => {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });

    return (
        <div className="flex flex-row items-center justify-center w-full px-5">
            <div className="flex flex-row items-center justify-between w-full max-w-[1140px] gap-5 flex-wrap">
                {/* Logo */}
                <img
                    className="w-[153px] object-cover max-h-[43px]"
                    loading="lazy"
                    alt="Company Logo"
                    src="/image/logo-1@2x.png"
                />
                {/* Contact Information */}
                <div className="flex flex-col items-start max-w-full">
                    <div className="flex flex-row items-end gap-[25px] flex-wrap">
                        {/* Support Info */}
                        <div className="flex flex-row items-start gap-3 min-w-[283px] max-w-full flex-wrap">
                            <div className="flex flex-row items-center gap-[7px]">
                                <img
                                    className="h-10 w-10"
                                    loading="lazy"
                                    alt="Support Icon"
                                    src="/image/group-700.svg"
                                />
                                <div className="flex flex-col items-start gap-1">
                                    <span className="font-bold">For Support Mail us :</span>
                                    <a href="mailto:info@example.com" className="text-dimgray-200">
                                        info@example.com
                                    </a>
                                </div>
                            </div>
                            {/* Helpline Info */}
                            {isDesktopOrLaptop && (
                                <div className="flex flex-row items-center gap-[7px] min-w-[147px]">
                                    <img
                                        className="h-10 w-10"
                                        alt="Helpline Icon"
                                        src="/image/group-700-1.svg"
                                    />
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="font-bold">Service Helpline Call Us:</span>
                                        <span className="text-dimgray-200">+61-1234-5678-9</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Login/Signup Button */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
