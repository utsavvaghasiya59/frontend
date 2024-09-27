import React from "react";

const Dropdown = ({ label, name, options, value, onChange, error }) => {
    return (
        <>
            <label className="block text-sm font-medium text-gray-700" htmlFor={label}>{label}</label>
            <select
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`border p-2 rounded-md w-full ${error ? 'border-red focus:outline-red' : 'border-gray-300'}`}
                id={label}
            >
                <option value="">Select {label}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Dropdown;
