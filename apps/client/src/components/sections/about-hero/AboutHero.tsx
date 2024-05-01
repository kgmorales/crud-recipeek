import Image from 'next/image';
import styles from './AboutHero.module.scss';
import portraitImage from '@public/assets/imgs/page/about/us.jpg';
import Link from 'next/link';
import SpotifyNowPlaying from '@components/elements/spotify/SpotifyNowPlaying';

export default function Hero() {
  return (
    <>
      <div
        className={`${styles.container} wow animate__animated animate__fadeIn`}
      >
        <div className={`${styles.imageContainer}`}>
          <Image
            className={styles.image}
            src={portraitImage}
            alt="portrait of Kevin Morales"
            width={800}
            height={400}
          />
          <div className={`${styles.textContainer}`}>
            <h3 className={`${styles.heading} color-gray-300`}>
              The Morales Family
            </h3>
            <p className="color-gray-300">
              Welcome to our family recipe collection. As a working mom with two
              eager toddler sous-chefs by my side, our kitchen is always buzzing
              with creativity, disaster, and laughter. Our style consists of
              meals that consider busy schedules, toddler health, and flavor.
            </p>
            <p className="color-gray-300">
              This blog is our love letter to them, a collection of recipes,
              stories, and memories. It&apos;s our hope that as they grow,
              they&apos;ll come here to revisit old favorites, discover new
              ones, and keep the tradition of cooking alive. Each dish is a
              chapter in our family&apos;s story, and we&apos;re thrilled to
              share it with you.
            </p>
            <div className={`${styles.boxSocials}`}>
              <Link
                className="icon-socials icon-twitter"
                href="https://www.instagram.com/lamora_recipes"
              >
                <Image
                  className="logo-night"
                  alt="lamora logo"
                  src="/assets/icons/insta.svg"
                  width={50}
                  height={50}
                />
                <Image
                  className="d-none logo-day"
                  alt="lamora logo"
                  src="/assets/icons/insta-day.svg"
                  width={50}
                  height={50}
                />
              </Link>
              <SpotifyNowPlaying />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
