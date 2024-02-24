import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInstagram } from '@hooks';

//TODO: WHY DOES THIS SHIFT UP AND DOWN ON THEME SWITCH? CSS? BORDER COLOR TRANSITION?

const InstaFeed: React.FC = () => {
  const { instafeed } = useInstagram();
  console.log({ instafeed });

  return (
    <>
      <div className="head-sidebar">
        <div className="header-logo">
          <Link
            className="d-flex justify-content-center align-items-center text-center"
            href="/"
          >
            <Image
              className="logo-night"
              alt="lamora logo"
              src="/assets/imgs/lamora-logo-night.svg"
              width={50}
              height={50}
            />
            <Image
              className="d-none logo-day"
              alt="lamora logo"
              src="/assets/imgs/lamora-logo.svg"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <Link href="https://www.instagram.com/lamora_recipes">
          <h6 className="header-logo-text color-gray-300">@laMora_recipes</h6>
        </Link>
      </div>
      <div className="content-sidebar">
        <div className="row mt-30 mb-10">
          {instafeed?.data?.slice(0, 9).map((post: any, i: number) => (
            <div
              className="col-sm-4 col-4 mb-20 wow animate__animated animate__fadeIn"
              data-wow-delay={`${i / 10}s`}
              key={post.id}
            >
              <Link href={`${post.permalink}`}>
                <img className="bdrd-8" src={post.media_url} alt="Genz" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InstaFeed;
