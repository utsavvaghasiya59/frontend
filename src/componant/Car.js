import React from 'react'
import { FaRoad } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
const Car = () => {
    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <div class="relative">
                <img class="w-full" src="https://via.placeholder.com/400x200" alt="Car Image" />
                <div class=" absolute bottom-0 h-8 w-full bg-gray-500 text-white flex justify-between items-center p-4">
                    <div class="flex items-center text-xs">
                        <span class="text-white font-bold mr-2 flex items-center gap-2"><FaRoad />20,000 km</span>
                        <span class="text-white font-bold ml-2 flex items-center gap-2"><FaCalendarAlt />2022 Model</span>
                    </div>
                    <div class="text-white font-bold text-xs flex items-center gap-2"><FaLocationDot />Colorado, USA</div>
                </div>
            </div>
            <div class="px-6 py-4">
                <div className='flex justify-between'>
                    <div class="font-bold text-xl mb-2">BMW 535i</div>
                    <div class="text-xl font-bold text-gray-800">$20,000</div>
                </div>
                <p class="text-gray-700 text-base mb-4">
                    Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.
                </p>
            </div>
        </div>
    )
}

export default Car