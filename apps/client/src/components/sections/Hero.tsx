import Link from 'next/link';
import React from 'react';
import { Home } from '../../types/home.types';

interface HeroProps {
  categoryNames?: Home['categoryNames'];
}

const Hero: React.FC<HeroProps> = ({ categoryNames }) => {
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
            {categoryNames?.slice(0, 10).map((category: string, i: number) => (
              <li key={i}>
                <div
                  className="card-style-2 hover-up hover-neon wow animate__animated animate__fadeInUp"
                  data-wow-delay={`${i / 10}s`}
                >
                  {/* <div className="card-image">
                    <Link href="/blog-archive">
                      <img
                        src={`assets/imgs/page/homepage1/${item.img}`}
                        alt="Genz"
                      />
                    </Link>
                  </div> */}
                  <div className="card-info">
                    <Link className="color-gray-500" href="/blog-archive">
                      {category}
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
