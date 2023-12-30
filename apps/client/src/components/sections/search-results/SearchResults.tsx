// SearchResults.tsx
import React from 'react';
import { useSearchContext } from '@contexts';
import FeaturedCard from '@components/elements/featured-card/FeaturedCard';
import { RecipeCard } from '@types';
import styles from './SearchResults.module.scss';

const SearchResults: React.FC = () => {
  const { results } = useSearchContext();

  // Check if the results array has searched recipes in it
  if (results?.length) {
    // If there are results, render the SearchResults component
    return (
      <div className="container wow animate__animated animate__fadeIn">
        <div className="row mt-30">
          <h2 className="text-center color-gray-300 wow animate__animated animate__fadeIn">
            Search Recipes
          </h2>
          <div className={styles.cardContainer}>
            {/* Map over the results and render them */}
            {results?.map((recipe: RecipeCard, i) => (
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
