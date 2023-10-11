import Link from 'next/link';

import FeaturedCard from '@components/elements/featured-card/FeaturedCard';
import { Recipe } from '@prisma/client';
import styles from './FeaturedRecipes.module.scss';

interface FeaturedRecipesProps {
  featured?: Recipe[];
}

const FeaturedRecipes: React.FC<FeaturedRecipesProps> = ({ featured }) => {
  return (
    <>
      <div className="row mt-70">
        <h2 className="color-gray-300 d-inline-block mb-10 wow animate__animated animate__fadeInUp">
          Family Favorites
        </h2>
        <p className="text-lg color-gray-300 wow animate__animated animate__fadeInUp">
          Discover our most popular recipes.
        </p>
        <div className={styles.cardContainer}>
          {featured?.map((recipe: Recipe) => (
            <div key={recipe.id}>
              <FeaturedCard />
            </div>
          ))}
        </div>

        <div className="text-center mt-30">
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
