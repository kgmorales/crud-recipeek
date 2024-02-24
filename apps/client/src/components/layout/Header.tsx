import Link from 'next/link';
import { useState, useEffect } from 'react';
import SwitchButton from '@components/elements/ThemeSwitchButton';
import Image from 'next/image';
import Search from '@components/elements/search/Search';
import { useRouter } from 'next/router';

interface HeaderProps {
  handleOpen: () => void;
  handleRemove: () => void;
  openClass: boolean;
}

interface Link {
  href: string;
  label: string;
  className: string;
  key: number;
}

const navLinks: Link[] = [
  { href: '/', label: 'Home', className: 'active', key: 1 },
  { href: '/about', label: 'About', className: 'color-gray-300', key: 2 },
  { href: '/blog', label: 'Blog', className: 'color-gray-300', key: 3 },
  { href: '/recipes', label: 'Recipes', className: 'color-gray-300', key: 4 },
];

const Header: React.FC<HeaderProps> = ({
  handleOpen,
  handleRemove,
  openClass,
}) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

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
    <div className="container">
      <header
        className={
          isScrolled
            ? 'header sticky-bar bg-gray-900 stick'
            : 'header sticky-bar bg-gray-900'
        }
      >
        <div className="main-header container">
          <div className="header-logo">
            <Link className="d-flex justify-center align-items-center" href="/">
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
          <div className="header-nav">
            <nav className="nav-main-menu d-none d-lg-block">
              <ul className="main-menu">
                {navLinks.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className={`${
                        router.pathname === link.href ? 'active' : ''
                      } color-gray-300`}
                    >
                      <h5 className="color-gray-300">{link.label}</h5>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="header-right">
            <Search />
            <SwitchButton />
            <div className="d-flex">
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
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
