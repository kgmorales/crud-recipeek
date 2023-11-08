import React, { useState, FC } from 'react';
import Footer from '../layout/Footer';
import Header from './Header';
import MobileMenu from './MobileMenu';
// import SearchResults from '@components/sections/search-results/SearchResults'; // Adjust the import path as necessary
// import { useSearchContext } from '@contexts'; // Adjust the import path as necessary

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [openClass, setOpenClass] = useState<string>('');
  // const { results } = useSearchContext(); // Use the search context to get the results

  // Function to handle opening the mobile menu
  const handleOpen = () => {
    document.body.classList.add('mobile-menu-active');
    setOpenClass('sidebar-visible');
  };

  // Function to handle removing the mobile menu
  const handleRemove = () => {
    if (openClass === 'sidebar-visible') {
      document.body.classList.remove('mobile-menu-active');
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

      <main className="main">
        {/* Conditional rendering based on search results */}
        {/* {results && results.length > 0 ? <SearchResults /> : children} */}
        {children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
