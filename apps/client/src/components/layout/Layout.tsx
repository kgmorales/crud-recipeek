import React, { useState, FC } from 'react';
import Footer from '../layout/Footer';
import Header from './Header';
import MobileMenu from './MobileMenu';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  // State to control the 'openClass' CSS class
  const [openClass, setOpenClass] = useState<string>('');

  // Function to handle opening the mobile menu
  const handleOpen = () => {
    // Add the "mobile-menu-active" class to the body element
    document.body.classList.add('mobile-menu-active');

    // Set the 'openClass' state to "sidebar-visible"
    setOpenClass('sidebar-visible');
  };

  // Function to handle removing the mobile menu
  const handleRemove = () => {
    // Check if the 'openClass' state is "sidebar-visible"
    if (openClass === 'sidebar-visible') {
      // Remove the "mobile-menu-active" class from the body element
      document.body.classList.remove('mobile-menu-active');

      // Reset the 'openClass' state to an empty string
      setOpenClass('');
    }
  };

  return (
    <>
      {openClass === 'sidebar-visible' && (
        <div className="body-overlay-1" onClick={handleRemove} />
      )}

      <Header
        handleOpen={handleOpen}
        handleRemove={handleRemove}
        openClass={openClass === 'sidebar-visible'}
      />

      <MobileMenu openClass={openClass} />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
