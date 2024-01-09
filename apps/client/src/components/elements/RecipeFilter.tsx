import React, { useState, useEffect } from 'react';
import { useRecipeCards } from '@hooks';
import { RecipeCard } from '@types';
import FeaturedRecipes from '@components/sections/featured-recipes/FeaturedRecipes';

const RecipeFilter: React.FC = () => {
  const { recipes } = useRecipeCards(); // Fetch all recipes

  const [filter, setFilter] = useState<string>('all');
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeCard[]>([]);

  useEffect(() => {
    if (recipes) {
      setFilteredRecipes(recipes);
    }
  }, [recipes]);

  useEffect(() => {
    if (!recipes) return;

    const filtered =
      filter === 'all'
        ? recipes
        : recipes.filter((recipe) => recipe.categories?.includes(filter));

    setFilteredRecipes(filtered);
  }, [filter, recipes]);

  return (
    <>
      <div className="d-flex flex-1 align-center mt-50 ">
        <ul className="list-tags-col-5 mb-50 text-center">
          {/* "All" button */}
          <li>
            <div
              className={`wow animate__animated animate__fadeIn card-style-2 btn hover-up hover-neon hover-shadow justify-content-center ${
                filter === 'all' ? 'active btn-linear d-flex' : ''
              }`}
              onClick={() => setFilter('all')}
            >
              <div className="text-center">
                <h6 className="color-gray-300">All</h6>
              </div>
            </div>
          </li>
          {/* Category buttons */}
          {/* {categories &&
            categories.map((category) => (
              <li key={category.uid}>
                <div
                  className={`wow animate__animated animate__fadeIn card-style-2 hover-neon btn hover-up hover-shadow justify-content-center ${
                    filter === category.uid ? 'active btn-linear d-flex' : ''
                  }`}
                  onClick={() => setFilter(category.uid)}
                >
                  <div className="text-center">
                    <h6 className="color-gray-300">{category.name}</h6>
                  </div>
                </div>
              </li>
            ))} */}
        </ul>
      </div>

      <div className="m-50">
        <div className="row">
          <FeaturedRecipes featured={filteredRecipes} />
        </div>
      </div>
    </>
  );
};

export default RecipeFilter;
