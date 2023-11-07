// SearchResults.tsx
import React from 'react';
import { useSearchContext } from '@contexts/Search.context'; // Adjust the import path as necessary
import styles from './SearchResults.module.scss'; // Adjust the import path as necessary
import { processRecipeForCard } from '../utils/Home.utils';
import FeaturedCard from '@components/elements/featured-card/FeaturedCard';
import { FeaturedCardData } from '@types';

const SearchResults: React.FC = () => {
  const { results, searchTerm } = useSearchContext();
  const cardInfo = processRecipeForCard(results);

  // Check if the results array has data in it
  if (results && results.length > 0) {
    // If there are results, render the SearchResults component
    return (
      <div className="container">
        <div className="row mt-30">
          <h2 className="text-center color-gray-300 wow animate__animated animate__fadeInUp">
            {searchTerm}
          </h2>
          <div className={styles.cardContainer}>
            {/* Map over the results and render them */}
            {cardInfo?.map((recipe: FeaturedCardData) => (
              <div key={recipe.id}>
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
