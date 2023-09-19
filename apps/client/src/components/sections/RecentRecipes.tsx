import Link from 'next/link';
import Image from 'next/image';
import { Home } from '@types';

interface RecentProps {
  recent?: Home['recent'];
}

const RecentRecipes: React.FC<RecentProps> = ({ recent }) => {
  return (
    <>
      <h2 className="color-linear d-inline-block mb-10 wow animate__animated animate__fadeInUp">
        Most Recent Recipes
      </h2>
      <p className="text-lg color-gray-500 wow animate__animated animate__fadeInUp">
        Our most recently added recipes
      </p>
      <div className="row mt-90 mb-50">
        <div className="col-lg-12">
          <div className="box-list-posts">
            <div className="row">
              <div className="col-lg-7">
                {recent?.slice(0, 2).map((recipe, i) => (
                  <div
                    className="card-blog-1 card-blog-2 hover-up wow animate__animated animate__fadeIn"
                    data-wow-delay={0}
                    key={i}
                  >
                    <div className="card-image mb-20">
                      <Link className="post-type" href="#" />
                      {recipe.image_url ? (
                        <Image
                          src={recipe.image_url}
                          unoptimized
                          alt="recipe"
                          width={600}
                          height={400}
                          blurDataURL="Shimmer"
                        />
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="card-info">
                      <Link href={`/blog/${recipe.id}`}>
                        <h4 className="color-white mt-30">{recipe.name}</h4>
                      </Link>
                      <p className="mt-25 text-lg color-gray-700">
                        {recipe.description}
                      </p>
                      <div className="row align-items-center mt-45">
                        <div className="col-7">
                          <div className="box-author">
                            <img
                              src="assets/imgs/page/homepage1/author.jpg"
                              alt="Genz"
                            />
                            <div className="author-info">
                              <h6 className="color-gray-700">Joseph</h6>
                              <span className="color-gray-700 text-sm">
                                {recipe.created}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-5 text-end">
                          <Link
                            className="readmore color-gray-500 text-sm"
                            href={`/recipes/${recipe.id}`}
                          >
                            <span>Read more</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-lg-5">
                <div className="row">
                  {recent?.slice(2, 9).map((recipe, i) => (
                    <div className="col-lg-12" key={i}>
                      <div
                        className="card-list-posts card-list-posts-small mb-30 wow animate__animated animate__fadeIn"
                        data-wow-delay="0.1s"
                      >
                        <div className="card-image hover-up">
                          <Link href={`/blog/${recipe.id}`}>
                            {recipe.image_url ? (
                              <Image
                                src={recipe.image_url}
                                unoptimized
                                alt="recipe"
                                width={100}
                                height={150}
                                blurDataURL="Shimmer"
                              />
                            ) : (
                              ''
                            )}
                          </Link>
                        </div>
                        <div className="card-info">
                          <Link
                            className="btn btn-tag bg-gray-800 hover-up mb-10 text-xs"
                            href="/blog-archive"
                          >
                            {recipe.categories}
                          </Link>
                          <Link href={`/blog/${recipe.id}`}>
                            <h5 className="mb-10 color-white">{recipe.name}</h5>
                          </Link>
                          <div className="row mt-10">
                            <div className="col-12">
                              <span className="calendar-icon color-gray-700 text-sm mr-20">
                                {recipe.created}
                              </span>
                              <span className="color-gray-700 text-sm timeread">
                                {recipe.created}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentRecipes;
