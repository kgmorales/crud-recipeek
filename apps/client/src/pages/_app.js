import React, { useEffect } from 'react';
import {
  // HydrationBoundary,
  // QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { queryClient } from '@clientUtils/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '../contexts/Theme';
import { SearchProvider } from '../contexts/Search';

import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/scss/style.scss';
import { RecipeProvider } from '../contexts/Recipe';

function MyApp({ Component, pageProps }) {
  // useEffect to initialize the WOW.js library when the component mounts
  useEffect(() => {
    // Import the WOW.js library
    const WOW = require('wowjs');

    // Create an instance of the WOW.js library with live set to false
    const wowInstance = new WOW.WOW({
      live: false,
    });

    // Initialize the WOW.js library to animate elements
    wowInstance.init();

    // No cleanup required here for WOW.js as mentioned
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Hydrate the query client with the initial state */}
      {/* <HydrationBoundary state={pageProps.dehydratedState}> */}
      <ThemeProvider>
        <SearchProvider>
          <RecipeProvider>
            {/* Render the rest of the app component tree */}
            <Component {...pageProps} />
          </RecipeProvider>
        </SearchProvider>
      </ThemeProvider>
      {/* </HydrationBoundary> */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
