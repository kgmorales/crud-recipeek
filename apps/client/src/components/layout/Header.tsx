import Link from 'next/link';
import { useState, useEffect } from 'react';
import SwitchButton from '../elements/SwitchButton';
import Image from 'next/image';

interface HeaderProps {
  handleOpen: () => void;
  handleRemove: () => void;
  openClass: boolean;
}

interface Tag {
  href: string;
  label: string;
  key: number;
}

interface Link {
  href: string;
  label: string;
  className: string;
  key: number;
}

const tags: Tag[] = [
  { href: '#', label: 'Travel', key: 1 },
  { href: '#', label: 'Tech', key: 2 },
  { href: '#', label: 'Movie', key: 3 },
  { href: '#', label: 'Lifestyle', key: 4 },
  { href: '#', label: 'Sport', key: 5 },
];

const navLinks: Link[] = [
  { href: '/', label: 'Home', className: 'active', key: 1 },
  { href: '/about', label: 'About', className: 'color-gray-300', key: 2 },
  { href: '/blog', label: 'Blog', className: 'color-gray-300', key: 3 },
  { href: '/recipes', label: 'Recipes', className: 'color-gray-300', key: 4 },
  { href: '/contact', label: 'Contact', className: 'color-gray-300', key: 5 },
];

const Header: React.FC<HeaderProps> = ({
  handleOpen,
  handleRemove,
  openClass,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToggled, setToggled] = useState(false);

  // Function to toggle the value of 'isToggled'
  const toggleTrueFalse = () => setToggled(!isToggled);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={
          isScrolled
            ? 'header sticky-bar bg-gray-900 stick'
            : 'header sticky-bar bg-gray-900'
        }
      >
        <div className="container">
          <div className="main-header">
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
                <h6 className="color-gray-100 d-flex justify-center align-items-bottom">
                  laMora
                </h6>
              </Link>
            </div>
            <div className="header-nav">
              <nav className="nav-main-menu d-none d-xl-block">
                <ul className="main-menu">
                  {navLinks.map((link) => (
                    <li key={link.key}>
                      <Link href={link.href} className={link.className}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div
                className={`burger-icon burger-icon-white ${
                  openClass ? 'burger-close' : ''
                }`}
                onClick={() => {
                  handleOpen();
                  handleRemove();
                }}
              >
                <span className="burger-icon-top" />
                <span className="burger-icon-mid" />
                <span className="burger-icon-bottom" />
              </div>
            </div>
            <div className="header-right text-end">
              <Link
                className="btn btn-search pr-4"
                href="#"
                onClick={toggleTrueFalse}
              />
              <SwitchButton />
              <div
                className={
                  isToggled
                    ? 'form-search p-20 d-block'
                    : ' form-search p-20 d-none'
                }
              >
                <form action="#">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search"
                  />
                  <input className="btn-search-2" />
                </form>
                <div className="popular-keywords text-start mt-20">
                  <p className="mb-10 color-white">Popular tags:</p>
                  {tags.map((tag) => (
                    <Link
                      key={tag.key}
                      href={tag.href}
                      className="color-gray-300 mr-10 font-xs"
                    >
                      #{tag.label},
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                className="btn btn-linear d-none d-sm-inline-block hover-up hover-shadow"
                href="/page-login"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
