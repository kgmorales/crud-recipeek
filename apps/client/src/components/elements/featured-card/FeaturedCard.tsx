import React from 'react';
import styles from './FeaturedCard.module.scss'; // Assuming you're using CSS modules and the styles are in card.module.scss
import Image from 'next/image';
import Link from 'next/link';

const iconPATH = '/assets/icons';

const CardComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.content}>
          <h2 className={styles.title}>Lemon Rice Soup</h2>
          <ul className={styles.meta}>
            <li>
              <Image
                className="d-none logo-day"
                src={`${iconPATH}/stopwatch-day.svg`}
                alt="icon"
                width={30}
                height={30}
              />
              <Image
                className="logo-night"
                src={`${iconPATH}/stopwatch.svg`}
                alt="icon"
                width={30}
                height={30}
              />
              <div className={styles.numberContainer}>
                60
                <span>mins</span>
              </div>
            </li>
            <li>
              <Image
                className="d-none logo-day"
                src={`${iconPATH}/list-check-day.svg`}
                alt="icon"
                width={30}
                height={30}
              />
              <Image
                className="logo-night"
                src={`${iconPATH}/list-check.svg`}
                alt="icon"
                width={30}
                height={30}
              />
              <div className={styles.numberContainer}>
                7<span>ingredients</span>
              </div>
            </li>
          </ul>
          <div className="text-center mt-30">
            <Link
              className="btn btn-linear btn-load-more wow animate__animated animate__zoomIn"
              href="#"
            >
              Show Full Recipe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
