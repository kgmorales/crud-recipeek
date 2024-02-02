import Link from 'next/link';
import React from 'react';
import { categoryVm } from './constants/Hero';
import Image from 'next/image';

const iconPATH = '/assets/icons';

const Hero: React.FC = () => {
  return (
    <>
      <div className="banner banner-home2">
        <div className="color-gray-900-day text-center d-flex flex-column align-items-center">
          <Image
            className="logo-night"
            alt="lamora logo"
            src="/assets/imgs/lamora-logo-night.svg"
            width={250}
            height={250}
          />
          <Image
            className="d-none logo-day"
            alt="lamora logo"
            src="/assets/imgs/lamora-logo.svg"
            width={250}
            height={250}
          />
          <h1 className="color-gray-300 d-flex align-items-center">laMora</h1>
          <h6 className="color-gray-300 d-flex align-items-center">
            Morales Family Recipes
          </h6>
        </div>
        <div className="align-center mt-50">
          <ul className="list-tags-col-5 mb-50 text-center">
            {categoryVm.map((category) => (
              <li key={category.key}>
                <div className="card-style-2 hover-up hover-neon wow animate__animated animate__fadeIn">
                  <div className="card-image">
                    <Link href="/blog-archive">
                      <Image
                        className="d-none logo-day"
                        src={`${iconPATH}/${category.icon}-day.svg`}
                        alt="icon"
                        width={200}
                        height={200}
                      />
                      <Image
                        className="logo-night"
                        src={`${iconPATH}/${category.icon}.svg`}
                        alt="icon"
                        width={200}
                        height={200}
                      />
                    </Link>
                  </div>
                  <div className="card-info">
                    <Link href="/blog-archive">{category.title}</Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Hero;
