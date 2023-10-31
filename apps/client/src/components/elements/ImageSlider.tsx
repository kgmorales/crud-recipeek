import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const iconPATH = '/assets/imgs/family/';

const ImageSlider: React.FC = () => {
  const imgs = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg',
    '9.jpg',
  ];
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Autoplay]}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          575: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          767: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          991: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1350: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="swiper-wrapper"
      >
        {imgs.map((item, i) => (
          <SwiperSlide className="swiper-slide" key={i}>
            <div className="card-style-1">
              <div className="card-image">
                <Image
                  src={`${iconPATH}${item}`}
                  width={250}
                  height={350}
                  alt="kids"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSlider;
