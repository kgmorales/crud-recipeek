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
    <div className={styles.container}>
      <div
        className={`${styles.card} hover-up hover-neon wow animate__ animate__fadeInUp animated`}
        style={{
          backgroundImage: `url(${cardInfo.image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={styles.content}>
          <h2 className={styles.title}>{cardInfo.name}</h2>
          <p className={styles.notes}>{cardInfo.description}</p>

          <ul className={styles.meta}>
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
