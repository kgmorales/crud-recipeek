import FeaturedCard from '@components/elements/featured-card/FeaturedCard';
import styles from './FeaturedRecipes.module.scss';
import { Home } from '@types';

interface FeaturedRecipesProps {
  featured?: Home['favorites'];
}

const FeaturedRecipes: React.FC<FeaturedRecipesProps> = ({ featured }) => {
  return (
    <>
      <div className="row mt-30">
        <div className={`${styles.cardContainer}`}>
          {featured?.map((recipe) => (
            <div key={recipe.uid}>
              <FeaturedCard cardInfo={recipe} />
            </div>
          ))}
        </div>

        {/* <div className={styles.buttonContainer}>
          <Link
            className="btn btn-linear btn-load-more wow animate__animated animate__zoomIn"
            href="#"
          >
            Show More Posts
            <i className="fi-rr-arrow-small-right" />
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default FeaturedRecipes;
