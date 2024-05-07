import ThemeSwitch from '@components/elements/ThemeSwitchButton';
import Link from 'next/link';
import { useState } from 'react';

const MobileMenu = ({ openClass }) => {
  // State to track the active status and key
  const [isActive, setIsActive] = useState({
    status: false,
    key: '',
  });

  // Function to handle toggling the active status based on the given key
  const handleToggle = (key) => {
    // Check if the current key matches the active key in the state
    if (isActive.key === key) {
      // If the current key matches, set the active status to false
      setIsActive({
        status: false,
      });
    } else {
      // If the current key does not match, set the active status to true and update the key
      setIsActive({
        status: true,
        key,
      });
    }
  };

  return (
    <>
      <div
        className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar ${openClass}`}
      >
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-content-area">
            <div className="mobile-logo">
              <Link className="d-flex" href="/">
                <ThemeSwitch />
              </Link>
            </div>
            <div className="perfect-scroll">
              <div className="mobile-menu-wrap mobile-header-border">
                <nav className="mt-15">
                  <ul className="mobile-menu font-heading">
                    <li
                      className={
                        isActive.key == 1
                          ? 'has-children active'
                          : 'has-children'
                      }
                      onClick={() => handleToggle(1)}
                    >
                      <Link href="/">Home</Link>
                    </li>
                    <li
                      className={
                        isActive.key == 2
                          ? 'has-children active'
                          : 'has-children'
                      }
                      onClick={() => handleToggle(2)}
                    >
                      <Link href="/about">About</Link>
                    </li>
                    <li
                      className={
                        isActive.key == 3
                          ? 'has-children active'
                          : 'has-children'
                      }
                      onClick={() => handleToggle(3)}
                    >
                      <Link className="color-gray-500" href="/blog">
                        Blog
                      </Link>
                    </li>
                    <li
                      className={
                        isActive.key == 4
                          ? 'has-children active'
                          : 'has-children'
                      }
                      onClick={() => handleToggle(4)}
                    >
                      <Link href="/recipes">Recipes</Link>
                    </li>
                    <li
                      className={
                        isActive.key == 5
                          ? 'has-children active'
                          : 'has-children'
                      }
                      onClick={() => handleToggle(5)}
                    >
                      <Link href="admin/page-contact">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="mobile-account border-gray-800">
                {/* <div className="mobile-header-top bg-gray-900">
                  <div className="user-account">
                    <Link href="/page-login">
                      <img src="/assets/imgs/template/ava.jpg" alt="GenZ" />
                    </Link>
                    <div className="content">
                      <h6 className="user-name color-white">
                        Hello<span className="color-white"> Steven !</span>
                      </h6>
                      <p className="font-xs text-muted">
                        You have 3 new messages
                      </p>
                    </div>
                  </div>
                </div> */}
                {/* <ul className="mobile-menu">
                  <li>
                    <Link href="/page-login">Profile</Link>
                  </li>
                  <li>
                    <Link href="/page-login">Articles Saved</Link>
                  </li>
                  <li>
                    <Link href="/page-login">Add new post</Link>
                  </li>
                  <li>
                    <Link href="/page-login">My Likes</Link>
                  </li>
                  <li>
                    <Link href="/page-login">Account Setting</Link>
                  </li>
                  <li>
                    <Link href="/page-login">Sign out</Link>
                  </li>
                </ul> */}
              </div>
              {/* <div className="site-copyright color-gray-400 mt-30">
                Copyright 2023 © Genz - Personal Blog Template.
                <br />
                Designed by
                <Link href="http://alithemes.com" target="_blank">
                  &nbsp; AliThemes
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
