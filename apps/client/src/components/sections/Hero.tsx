import React from 'react';
import { categoryVm } from './constants/Hero';
import Image from 'next/image';
import { useRouter } from 'next/router';

const iconPATH = '/assets/icons';

const Hero: React.FC = () => {
  const router = useRouter();

  const handleCategoryClick = (categoryTitle: string) => {
    router.push(`/recipes?category=${categoryTitle}`);
  };

  return (
    <>
      <div className="banner d-flex flex-column align-items-center">
        <div className=" logo-container color-gray-900-day text-center d-flex flex-column align-items-center">
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
        </div>
        <Image
          className="logo-night"
          alt="lamora word"
          src="/assets/imgs/lamora-word-night.svg"
          width={400}
          height={150}
        />
        <Image
          className="d-none logo-day"
          alt="lamora word"
          src="/assets/imgs/lamora-word.svg"
          width={400}
          height={150}
        />
        <h6 className="color-gray-400">Morales Family Recipes</h6>

        <div className="align-center mt-50">
          <ul className="list-tags-col-5 mb-50 text-center">
            {categoryVm.map((category) => (
              <li
                key={category.key}
                onClick={() => handleCategoryClick(category.title)}
                role="button"
              >
                <div className="card-style-2 hover-up hover-neon wow animate__animated animate__fadeIn pointer">
                  <div className="card-image">
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
                  </div>
                  <div className="card-info">
                    <p className="color-gray-300-only">{category.title}</p>
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
