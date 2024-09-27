import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import bannerImageList from '../helpers/bannerImageList';

const BannerProduct = () => {
    return (
        <div className='relative w-full h-60 md:h-[85vh] overflow-hidden'>
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                className='absolute top-0 left-0 w-full h-full'
            >
                {bannerImageList.map((imageUrl, index) => (
                    <SwiperSlide key={index} className='relative w-full h-full'>
                        <img
                            src={imageUrl}
                            alt={`banner-${index}`}
                            className='w-full h-full object-cover'
                            style={{ objectFit: 'cover' }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BannerProduct;
