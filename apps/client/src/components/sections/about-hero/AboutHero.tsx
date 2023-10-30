import Image from 'next/image';
import styles from './AboutHero.module.scss';
import portraitImage from '@public/assets/imgs/page/about/us.jpg';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={portraitImage}
        alt="portrait of Kevin Morales"
        width={800}
        height={400}
      />
      <div className={`${styles.textContainer} color-gray-900-day`}>
        <h1 className={styles.heading}>Morales Family</h1>
        <p>
          Welcome to our family recipe book. As a working mom with two eager
          toddler sous-chefs by my side, our kitchen is always buzzing with
          creativity, disaster, and laughter. Our style consists of meals that
          consider busy schedules, toddler health, and flavor.
        </p>
        <p>
          This blog is our love letter to them, a collection of recipes,
          stories, and memories. It&apos;s our hope that as they grow,
          they&apos;ll come here to revisit old favorites, discover new ones,
          and keep the tradition of cooking alive. Each dish is a chapter in our
          family&apos;s story, and we&apos;re thrilled to share it with you.
        </p>
        <div className="box-socials mt-3">
          <div
            className=" wow animate__animated animate__fadeIn"
            data-wow-delay=".0s"
          >
            <Link
              className="icon-socials icon-twitter"
              href="https://twitter.com"
            >
              <Image
                alt="twitter"
                src="/assets/imgs/template/icons/tw.svg"
                width={30}
                height={30}
              />
            </Link>
          </div>
          <div
            className=" wow animate__animated animate__fadeIn"
            data-wow-delay=".4s"
          >
            <Link
              className="icon-socials icon-twitter"
              href="https://instagram.com"
            >
              <Image
                alt="twitter"
                src="/assets/imgs/template/icons/insta.svg"
                width={30}
                height={30}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
