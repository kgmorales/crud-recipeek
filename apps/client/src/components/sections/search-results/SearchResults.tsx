// SearchResults.tsx
import React from 'react';
import { useSearchContext } from '@contexts';
import { processRecipeForCard } from '../utils/Home.utils';
import FeaturedCard from '@components/elements/featured-card/FeaturedCard';
import { FeaturedCardData } from '@types';
import styles from './SearchResults.module.scss';

const SearchResults: React.FC = () => {
  const { results } = useSearchContext();
  const cardInfo = processRecipeForCard(results);

  // Check if the results array has searched recipes in it
  if (cardInfo?.length) {
    // If there are results, render the SearchResults component
    return (
      <div className="container wow animate__animated animate__fadeIn">
        <div className="row mt-30">
          <h2 className="text-center color-gray-300 wow animate__animated animate__fadeIn">
            {/* {searchTerm} */}
            test
          </h2>
          <div className={styles.cardContainer}>
            {/* Map over the results and render them */}
            {cardInfo?.map((recipe: FeaturedCardData, i) => (
              <div key={recipe.uid}>
                <FeaturedCard cardInfo={recipe} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    // If there are no results, render nothing or a placeholder
    return null; // or <div className={styles.noResults}>No results found</div>
  }
};

export default SearchResults;
