import Link from 'next/link';
import gallery from '../../../utils/instagramData';
import styles from './Sidebar.module.scss';
import Image from 'next/image';

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
            <span className="text-sm-bold color-gray-300">Hello Everyone!</span>
            <h6 className="color-gray-300 pt-3 text-center d-flex justify-content-center align-items-center">
              I&apos;m a culinary enthusiast and proud mom who crafts flavorful
              recipes for my kids, inviting them to explore the world of cooking
              with me.
            </h6>
            <div className={`${styles.boxSocials}`}>
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
            </div>
          </div>
        </div>
        <div
          className={`${styles.box_sidebar} card-style-2 d-flex flex-column border-gray-800`}
        >
          <div className="head-sidebar">
            <div className="header-logo">
              <Link
                className="d-flex justify-center align-items-center"
                href="/"
              >
                <Image
                  className="logo-night"
                  alt="lamora logo"
                  src="/assets/imgs/lamora-logo-night.svg"
                  width={50}
                  height={50}
                />
                <Image
                  className="d-none logo-day"
                  alt="lamora logo"
                  src="/assets/imgs/lamora-logo.svg"
                  width={50}
                  height={50}
                />
                <h6 className="header-logo-text color-gray-300">laMora</h6>
              </Link>
            </div>
          </div>
          <div className="content-sidebar">
            <div className="row mt-30 mb-10">
              {gallery.slice(0, 9).map((item, i) => (
                <div
                  className="col-sm-4 col-4 mb-20 wow animate__animated animate__fadeIn"
                  data-wow-delay={`${i / 10}s`}
                  key={i}
                >
                  <Link href={`${item.link}`}>
                    <img
                      className="bdrd-8"
                      src={`/assets/imgs/page/homepage1/${item.img}`}
                      alt="Genz"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarBlog;
