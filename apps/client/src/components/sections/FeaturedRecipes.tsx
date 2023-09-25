import Link from 'next/link';

import Image from 'next/image';
import { Recipe } from '@prisma/client';

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
        <div className="row mt-70">
          {featured?.map((recipe: Recipe) => (
            <div className="col-lg-4" key={recipe.id}>
              <div
                className="card-style-1 hover-up mb-30 wow animate__animated animate__fadeIn"
                data-wow-delay=".0s"
              >
                <div className="card-image">
                  <Link className="link-post" href="/single-sidebar">
                    {recipe.image_url ? (
                      <Image
                        src={recipe.image_url}
                        unoptimized
                        alt="recipe"
                        width={300}
                        height={300}
                        blurDataURL="Shimmer"
                      />
                    ) : (
                      ''
                    )}
                    <div className="card-info">
                      <div className="info-bottom mb-15">
                        <h4 className="mb-15">{recipe.name}</h4>
                        <div className="box-author">
                          {/* <img
                            src="assets/imgs/page/homepage3/author.jpg"
                            alt="Genz"
                          /> */}
                          <div className="author-info">
                            <h6 className="mr-15">
                              {recipe.cook_time}
                            </h6>
                            <span className="text-sm">
                              {recipe.created}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
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
