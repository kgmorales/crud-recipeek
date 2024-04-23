import React, { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@clientUtils/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from '../contexts/Theme';
import { SearchProvider } from '../contexts/Search';
import { RecipeProvider } from '../contexts/Recipe';
import { BlogPostProvider } from '../contexts/Post';

import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/scss/style.scss';

function MyApp({ Component, pageProps }) {
  // useEffect to initialize the WOW.js library when the component mounts
  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== 'undefined') {
      // Dynamically import the WOW.js library
      import('wowjs').then((WOW) => {
        // Create an instance of the WOW.js library with live set to false
        const wowInstance = new WOW.WOW({
          live: false,
        });

        // Initialize the WOW.js library to animate elements
        wowInstance.init();
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Hydrate the query client with the initial state */}
      {/* <HydrationBoundary state={pageProps.dehydratedState}> */}
      <ThemeProvider>
        <SearchProvider>
          <RecipeProvider>
            <BlogPostProvider>
              {/* Render the rest of the app component tree */}
              <Component {...pageProps} />
            </BlogPostProvider>
          </RecipeProvider>
        </SearchProvider>
      </ThemeProvider>
      {/* </HydrationBoundary> */}
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}

export default MyApp;
