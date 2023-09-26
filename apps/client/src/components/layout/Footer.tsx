import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { categoryNames } from '@components/sections/constants/Hero';

const length = Math.ceil(categoryNames.length / 2);
const firstHalf = categoryNames.slice(0, length);
const secondHalf = categoryNames.slice(length);

const Footer: React.FC = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-1">
            <div className="row">
              <div className="col-lg-8 mb-30">
                <Link
                  className="wow animate__animated animate__fadeInUp"
                  href="/"
                >
                  <Image
                    alt="lamora logo"
                    className="logo-night"
                    src="/assets/imgs/lamora-logo-night.svg"
                    width={100}
                    height={100}
                  />
                  <Image
                    className="d-none logo-day"
                    alt="lamora logo"
                    src="/assets/imgs/lamora-logo.svg"
                    width={100}
                    height={100}
                  />
                </Link>
                <p className="mb-20 mt-20 text-sm wow animate__animated animate__fadeInUp">
                  Join the Morales Family&apos;s culinary journey, where family
                  recipes are not just preserved but cherished. laMora Recipes
                  are intended to be shared to foster bonds that are as
                  comforting and warm as the dishes themselves.
                </p>
                <h6 className="color-white mb-5 wow animate__animated animate__fadeInUp">
                  Address
                </h6>
                <p className="text-sm wow animate__animated animate__fadeInUp">
                  Chicago, IL
                </p>
              </div>
              <div className="col-lg-4 mb-30">
                <h6 className="text-lg mb-30 color-white wow animate__animated animate__fadeInUp">
                  Categories
                </h6>
                <div className="row">
                  <div className="col-6">
                    <ul className="menu-footer">
                      {firstHalf?.map((category) => (
                        <li
                          key={category.key}
                          className="wow animate__animated animate__fadeInUp"
                        >
                          <Link href="/blog-archive">{category.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-6">
                    <ul className="menu-footer">
                      {secondHalf?.map((category) => (
                        <li
                          key={category.key}
                          className="wow animate__animated animate__fadeInUp"
                        >
                          <Link href="/blog-archive">{category.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-4 mb-30">
                <h4 className="text-lg mb-30 color-white wow animate__animated animate__fadeInUp">
                  Newsletter
                </h4>
                <p className="text-base color-gray-500 wow animate__animated animate__fadeInUp">
                  Sign up to be first to receive the latest stories inspiring
                  us, case studies, and industry news.
                </p>
                <div className="form-newsletters mt-15 wow animate__animated animate__fadeInUp">
                  <form action="#">
                    <div className="form-group">
                      <input
                        className="input-name border-gray-500"
                        type="text"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="input-email border-gray-500"
                        type="email"
                        placeholder="Emaill address"
                      />
                    </div>
                    <div className="form-group mt-20">
                      <button className="btn btn-linear hover-up">
                        Subscribe
                        <i className="fi-rr-arrow-small-right" />
                      </button>
                    </div>
                  </form>
                </div>
              </div> */}
            </div>
            <div className="footer-bottom border-gray-800">
              <div className="row">
                <div className="col-lg-5 text-center text-lg-start">
                  <p className="text-base color-white wow animate__animated animate__fadeIn">
                    © 2023 Created by
                    <Link
                      className="copyright"
                      href="https://kevinmoral.es"
                      target="_blank"
                    >
                      {' '}
                      kevinmoral.es
                    </Link>
                  </p>
                </div>
                <div className="col-lg-7 text-center text-lg-end">
                  <div className="box-socials">
                    <div
                      className="d-inline-block mr-30 wow animate__animated animate__fadeIn"
                      data-wow-delay=".0s"
                    >
                      <Link
                        className="icon-socials icon-twitter color-gray-500"
                        href="https://twitter.com"
                      >
                        Twitter
                      </Link>
                    </div>
                    <div
                      className="d-inline-block mr-30 wow animate__animated animate__fadeIn"
                      data-wow-delay=".2s"
                    >
                      <Link
                        className="icon-socials icon-linked color-gray-500"
                        href="https://www.linkedin.com"
                      >
                        LinkedIn
                      </Link>
                    </div>
                    <div
                      className="d-inline-block wow animate__animated animate__fadeIn"
                      data-wow-delay=".4s"
                    >
                      <Link
                        className="icon-socials icon-insta color-gray-500"
                        href="https://www.instagram.com"
                      >
                        Instagram
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
