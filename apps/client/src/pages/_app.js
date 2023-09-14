import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/scss/style.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ThemeProvider } from '../utils/themeContext';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  // useEffect to initialize the WOW.js library when the component mounts
  useEffect(() => {
    // Import the WOW.js library
    const WOW = require('wowjs');

    // Create an instance of the WOW.js library with live set to false
    // The live option determines whether elements are updated on resize or scroll events
    const wowInstance = new WOW.WOW({
      live: false,
    });

    // Initialize the WOW.js library to animate elements
    wowInstance.init();

    // Cleanup function to remove any event listeners or timers when the component unmounts
    return () => {
      // Typically, the WOW.js library doesn't require cleanup, but it's good practice to clean up after yourself
      // In this case, there are no event listeners or timers to clean up, so it's empty.
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
