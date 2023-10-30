import Image from 'next/image';
import styles from './AboutHero.module.scss';
import portraitImage from '@public/assets/imgs/page/homepage3/banner-1.jpg';

export default function Hero() {
  return (
    <>
      <div className={styles.container}>
        <Image src={portraitImage} alt="portrait of Kevin Morales" />
        <div className={styles.words}>
          <h1 className="">Kevin Morales</h1>
          <p className="">
            As a Full Stack Engineer with a foundation in Design and User
            Experience, I specialize in refining and optimizing code for
            maintainability, scalability, and reusability. My attention for
            detail and pattern recognition enhances the efficiency of the
            solutions I design and develop. I&apos;ve taken projects from
            conception to deployment to maintenance, collaborating with teams of
            varying sizes. Ensuring the requirements of all Users and
            stakeholders are addressed.
          </p>
        </div>
      </div>
    </>
  );
}
