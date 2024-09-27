import React from 'react'
import CategoryList from '../../componant/CategoryList'
import BannerProduct from '../../componant/BannerProduct'
import HorizontalCardProduct from '../../componant/HorizontalCardProduct'

import VerticalCardProduct from '../../componant/VerticalCardProduct';

function Home() {

    return (
        <div>
            {/* <CategoryList /> */}

            <BannerProduct />
            <VerticalCardProduct brandName={"Mahindra"} heading={"Mahindra"} />
            <VerticalCardProduct brandName={"Toyota"} heading={"Toyota"} />
            <VerticalCardProduct brandName={"Kia"} heading={"Kia"} />
            <VerticalCardProduct brandName={"BMW"} heading={"BMW"} />
            <VerticalCardProduct brandName={"Rolls Royce"} heading={"Rolls Royal"} />
            <VerticalCardProduct brandName={"Jeep"} heading={"Jeep"} />
            <VerticalCardProduct brandName={"MG"} heading={"MG"} />
            <VerticalCardProduct brandName={"Audi"} heading={"Audi"} />
            <VerticalCardProduct brandName={"Maruti"} heading={"Maruti"} />
            <VerticalCardProduct brandName={"Hyundai"} heading={"Hyundai"} />
            <VerticalCardProduct brandName={"Skoda"} heading={"Skoda"} />
            <VerticalCardProduct brandName={"Ferrari"} heading={"Ferrari"} />
            <VerticalCardProduct brandName={"Honda"} heading={"Honda"} />

            {/* <HorizontalCardProduct category={"airpodes"} heading={"Top-Airpods"} />
            <HorizontalCardProduct category={"camera"} heading={"Popular Camera's"} /> */}
            {/* <VerticalCardProduct category={"airpodes"} heading={"Top-Airpods"} />
            <VerticalCardProduct category={"camera"} heading={"Popular Camera's"} />
            <VerticalCardProduct category={"printers"} heading={"Top-Printer"} />
            <VerticalCardProduct category={"earphone"} heading={"Popular Earphone's"} />
            <VerticalCardProduct category={"airpodes"} heading={"Popular arpodes's"} />
            <VerticalCardProduct category={"airpodes"} heading={"Top-Airpods"} />
            <VerticalCardProduct category={"camera"} heading={"Popular Camera's"} />
            <VerticalCardProduct category={"airpodes"} heading={"Top-Airpods"} />
            <VerticalCardProduct category={"camera"} heading={"Popular Camera's"} /> */}
        </div>
    )
}

export default Home