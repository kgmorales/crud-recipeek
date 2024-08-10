import ThemeSwitch from '@components/elements/ThemeSwitchButton';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import styles from './MobileMenu.module.scss';

interface MobileMenuProps {
  openClass?: string;
}

interface ActiveState {
  key: string | number;
}

const menuItems = [
  { id: 1, label: 'Home', href: '/' },
  { id: 2, label: 'About', href: '/about' },
  { id: 3, label: 'Blog', href: '/blog', className: 'color-gray-500' },
  { id: 4, label: 'Recipes', href: '/recipes' },
];

const MobileMenu: FC<MobileMenuProps> = ({ openClass = '' }) => {
  const [activeKey, setActiveKey] = useState<string | number>('');

  const handleToggle = (key: string | number) => {
    setActiveKey((prevKey) => (prevKey === key ? '' : key));
  };

  const copyrightYear = new Date().getFullYear();

  return (
    <div
      className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar ${openClass}`}
    >
      <div className="mobile-header-content-area">
        <div className="mobile-logo">
          <Link href="/">
            <ThemeSwitch />
          </Link>
        </div>

        <div className="mobile-menu-wrap mobile-header-border">
          <nav className="mt-15">
            <ul className="mobile-menu">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={activeKey === item.id ? 'active' : ''}
                  onClick={() => handleToggle(item.id)}
                >
                  <Link href={item.href} className={item.className || ''}>
                    <h2 className=" color-gray-300">{item.label}</h2>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mobile-account border-gray-800">
          <div className="mobile-header-top">
            <div className="user-account">
              <Link href="/page-login">
                <Image
                  src="/assets/imgs/nicole_avatar.png"
                  alt="nicole avatar"
                  width={100}
                  height={100}
                />
              </Link>
              <div className="content">
                <h1 className="user-name color-gray-300">Nicole Morales</h1>
              </div>
            </div>
            <p className="font-xs color-gray-300">
              Hello Everyone! I&apos;m a culinary enthusiast and proud mom who
              crafts flavorful recipes for my kids, inviting them to explore the
              world of cooking with me.
            </p>
          </div>
        </div>
        <div className="site-copyrite">
          <small className="text-small color-gray-300 wow animate__animated animate__fadeIn">
            © {copyrightYear} created by
            <Link
              className="copyright"
              href="https://kevinmoral.es"
              target="_blank"
            >
              {' '}
              kevinmoral.es
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
