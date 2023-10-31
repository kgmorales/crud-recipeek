import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

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
  SwiperCore.use([Autoplay]);
  return (
    <Swiper
      spaceBetween={30}
      modules={[Autoplay]}
      centeredSlides={true}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
      <SwiperSlide>Slide 6</SwiperSlide>
      <SwiperSlide>Slide 7</SwiperSlide>
      <SwiperSlide>Slide 8</SwiperSlide>
      <SwiperSlide>Slide 9</SwiperSlide>
    </Swiper>
  );
};

export default TrendingTopic;
