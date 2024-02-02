import Link from 'next/link';
import styles from './Sidebar.module.scss';
import Image from 'next/image';
import InstaFeed from './components/InstaFeed';
import SpotifyNowPlaying from '../spotify/SpotifyNowPlaying';

const SidebarBlog = () => {
  return (
    <>
      <div className={`${styles.sidebar}`}>
        <div
          className={`${styles.box_sidebar} card-style-2 d-flex flex-column border-gray-800`}
        >
          <div className="container d-flex justify-content-center pb-3">
            <Image
              src="/assets/imgs/nicole_avatar.png"
              alt="nicole avatar"
              width={250}
              height={250}
            />
          </div>
          <div className="d-flex justify-content-center flex-column align-items-center pt-5">
            <h5 className="color-gray-300">Nicole Morales</h5>
            <h6 className="color-gray-300 pt-3 text-center d-flex justify-content-center align-items-center">
              Hello Everyone! I&apos;m a culinary enthusiast and proud mom who
              crafts flavorful recipes for my kids, inviting them to explore the
              world of cooking with me.
            </h6>
            <div className={`${styles.boxSocials}`}>
              <SpotifyNowPlaying />
            </div>
          </div>
        </div>
        <div
          className={`${styles.box_sidebar} card-style-2 d-flex flex-column border-gray-800`}
        >
          <InstaFeed />
        </div>
      </div>
    </>
  );
};

export default SidebarBlog;
