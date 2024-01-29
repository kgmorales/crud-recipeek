import React from 'react';
import styles from './Sidebar.module.scss';
import { RecipeCard } from '@types';

interface SidebarProps {
  recipe: RecipeCard | undefined;
}

const Sidebar: React.FC<SidebarProps> = ({ recipe }) => {
  const ingredients = recipe?.ingredients.split('\n');

  return (
    <div className={`${styles.sidebar}`}>
      <div className={`${styles.box_sidebar} hover-neon-2`}>
        <div className={`${styles.content_sidebar}`}>
          <div className={`${styles.list_comments}`}>
            <div
              className={`${styles.item_comment} wow animate__animated animate__fadeIn`}
            >
              <h6 className="color-gray-200 mb-10 text-uppercase">Time</h6>
              <p className="color-gray-200 d-inline p-3 pl-0">
                Prep: {recipe?.prepTime}
              </p>
              <p className="color-gray-200 d-inline">
                Cook Time: {recipe?.cookTime}
              </p>
            </div>
            <div
              className={`${styles.item_comment} wow animate__animated animate__fadeIn`}
            >
              <h6 className="color-gray-300 mb-10 text-uppercase">
                Categories
              </h6>
              {recipe?.categories?.map((category, i) => (
                <p className="color-gray-200 d-inline" key={i}>
                  {category}
                </p>
              ))}
              {/* <p className="color-gray-200">Graphic Design, Marketing Kitsz</p> */}
            </div>
            <div
              className={`${styles.item_comment} wow animate__animated animate__fadeIn`}
            >
              <h6 className="color-gray-200 mb-10 text-uppercase">
                Ingredients
              </h6>
              {ingredients?.map((ingredient, i) => (
                <li className="color-gray-200" key={i}>
                  {ingredient}
                </li>
              ))}
            </div>
            <div
              className={`${styles.item_comment} wow animate__animated animate__fadeIn`}
            >
              {/* <div className="d-inline-block pt-10 wow animate__animated animate__fadeIn">
                <div className="d-flex align-item-center">
                  <h6 className="d-inline-block color-gray-500 mr-10">Share</h6>
                  <Link className="icon-media icon-fb" href="#" />
                  <Link className="icon-media icon-tw" href="#" />
                  <Link className="icon-media icon-printest" href="#" />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
