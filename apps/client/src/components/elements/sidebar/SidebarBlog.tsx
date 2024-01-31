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
          <div className="container d-flex justify-content-center">
            <Image
              src="/assets/imgs/nicole_avatar.png"
              alt="nicole avatar"
              width={250}
              height={250}
            />
          </div>
          <div className="d-flex justify-content-center flex-column align-items-center pt-5">
            <span className="text-sm-bold color-gray-300">Nicole Morales</span>
            <h6 className="color-gray-300 pt-3 text-center d-flex justify-content-center align-items-center">
              Hello Everyone! I&apos;m a culinary enthusiast and proud mom who
              crafts flavorful recipes for my kids, inviting them to explore the
              world of cooking with me.
            </h6>
            {/* <div className={`${styles.boxSocials}`}>
              <Link
                className="icon-socials icon-twitter"
                href="https://twitter.com"
              >
                <Image
                  className="logo-night"
                  alt="lamora logo"
                  src="/assets/icons/tw.svg"
                  width={40}
                  height={40}
                />
                <Image
                  className="d-none logo-day"
                  alt="lamora logo"
                  src="/assets/icons/tw-day.svg"
                  width={40}
                  height={40}
                />
              </Link>
              <Link
                className="icon-socials icon-twitter"
                href="https://instagram.com"
              >
                <Image
                  className="logo-night"
                  alt="lamora logo"
                  src="/assets/icons/insta.svg"
                  width={40}
                  height={40}
                />
                <Image
                  className="d-none logo-day"
                  alt="lamora logo"
                  src="/assets/icons/insta-day.svg"
                  width={40}
                  height={40}
                />
              </Link>
            </div> */}
            <SpotifyNowPlaying />
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
