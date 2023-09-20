import Link from 'next/link';
import React from 'react';
import { HeroVm } from './constants/Hero';
import Image from 'next/image';

const iconPATH = '/assets/icons';

console.log(HeroVm);
const Hero: React.FC<HeroVm> = () => {
  return (
    <>
      <div className="banner banner-home2">
        <div className="text-center">
          <h1 className="color-white">
            <span className="color-linear">laMora</span>
          </h1>
          <h6 className="color-gray-600">Morales Family Recipes</h6>
        </div>
        <div className="text-center mt-50">
          <ul className="list-tags-col-5 mb-50 text-center">
            {HeroVm.categories.map((category) => (
              <li key={category.key}>
                <div
                  className="card-style-2 hover-up hover-neon wow animate__animated animate__fadeInUp"
                  data-wow-delay={`${category.key / 10}s`}
                >
                  <div className="card-image">
                    <Link href="/blog-archive" >
                      <Image
                        src={`${iconPATH}/${category.icon}`}
                        alt="icon"
                        width={200}
                        height={200}
                      />
                    </Link>
                  </div>
                  <div className="card-info">
                    <Link className="color-gray-500" href="/blog-archive">
                      {category.title}
                    </Link>
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
