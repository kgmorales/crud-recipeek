import Link from 'next/link';

import FeaturedCard from '@components/elements/featured-card/FeaturedCard';
import styles from './FeaturedRecipes.module.scss';
import { processRecipeForCard } from '../utils/Home.utils';
import { RecipeCard, Home } from '@types';

interface FeaturedRecipesProps {
  featured?: Home['favorites'];
}

const FeaturedRecipes: React.FC<FeaturedRecipesProps> = ({ featured }) => {
  const cardInfo = processRecipeForCard(featured);

  return (
    <>
      <div className="row mt-30">
        <div className={styles.cardContainer}>
          {cardInfo?.map((recipe: RecipeCard) => (
            <div key={recipe.uid}>
              <FeaturedCard cardInfo={recipe} />
            </div>
          ))}
        </div>

        <div className={styles.buttonContainer}>
          <Link
            className="btn btn-linear btn-load-more wow animate__animated animate__zoomIn"
            href="#"
          >
            Show More Posts
            <i className="fi-rr-arrow-small-right" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default FeaturedRecipes;
