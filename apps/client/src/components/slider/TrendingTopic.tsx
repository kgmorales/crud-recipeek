import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const iconPATH = '/assets/imgs/page/homepage1/';

const TrendingTopic: React.FC = () => {
  const data = [
    {
      title: 'Sport',
      article: 38,
      img: 'sport.png',
    },
    {
      title: 'Travel',
      article: 63,
      img: 'travel.png',
    },
    {
      title: 'Design',
      article: 78,
      img: 'design.png',
    },
    {
      title: 'Movie',
      article: 125,
      img: 'movie.png',
    },
    {
      title: 'Lifestyle',
      article: 45,
      img: 'lifestyle.png',
    },
    {
      title: 'Lifestyle',
      article: 45,
      img: 'lifestyle.png',
    },
    {
      title: 'Lifestyle',
      article: 45,
      img: 'lifestyle.png',
    },
    {
      title: 'Lifestyle',
      article: 45,
      img: 'lifestyle.png',
    },
    {
      title: 'Lifestyle',
      article: 45,
      img: 'lifestyle.png',
    },
    {
      title: 'Lifestyle',
      article: 45,
      img: 'lifestyle.png',
    },
  ];

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
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
        {data.map((item, i) => (
          <SwiperSlide className="swiper-slide" key={i}>
            <div className="card-style-1">
              <div className="card-image">
                <Image
                  src={`${iconPATH}${item.img}`}
                  width={200}
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

export default TrendingTopic;
