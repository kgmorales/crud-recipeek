import React from 'react';
import styles from './FeaturedCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { FeaturedCardData } from '@types';

const iconPATH = '/assets/icons';

interface FeaturedCardProps {
  cardInfo: FeaturedCardData;
}

const CardComponent: React.FC<FeaturedCardProps> = ({ cardInfo }) => {
  return (
    <div className={`${styles.container}`}>
      <div
        className={`${styles.card} hover-up hover-neon wow animate__ animate__fadeIn animated`}
        style={{
          backgroundImage: `url(${cardInfo.image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className={`${styles.content} bg-gray-900 hover-up hover-neon wow animate__ animate__fadeInUp animated`}
        >
          <h2 className={`${styles.title} color-gray-100 hover-neon`}>
            {cardInfo.name}
          </h2>
          <p className={`${styles.notes} color-gray-300`}>
            {cardInfo.description}
          </p>

          <ul className={`${styles.meta} color-gray-300`}>
            <li>
              <Image
                className="d-none logo-day"
                src={`${iconPATH}/stopwatch-day.svg`}
                alt="icon"
                width={25}
                height={25}
              />
              <Image
                className="logo-night"
                src={`${iconPATH}/stopwatch.svg`}
                alt="icon"
                width={25}
                height={25}
              />
              <div className={styles.numberContainer}>{cardInfo.prep_time}</div>
            </li>
            <li>
              <Image
                className="d-none logo-day"
                src={`${iconPATH}/list-check-day.svg`}
                alt="icon"
                width={25}
                height={25}
              />
              <Image
                className="logo-night"
                src={`${iconPATH}/list-check.svg`}
                alt="icon"
                width={25}
                height={25}
              />
              <div className={styles.numberContainer}>
                {cardInfo.ingredientsCount} ingredients
              </div>
            </li>
          </ul>
          <Link
            className="btn btn-linear btn-load-more wow animate__animated animate__zoomIn"
            href="{cardInfo.recipeLink}"
          >
            Full Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
