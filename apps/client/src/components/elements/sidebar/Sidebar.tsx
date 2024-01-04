import React from 'react';
import Link from 'next/link';
import { Recipe } from '@prisma/client';
import styles from './Sidebar.module.scss';

const iconPATH = '/assets/icons';

interface SidebarProps {
  recipe: Recipe | undefined;
}

const Sidebar: React.FC<SidebarProps> = ({ recipe }) => {
  return (
    <div className={`${styles.sidebar}`}>
      <div className={`${styles.box_sidebar} hover-neon-2`}>
        <div
          className={`${styles.head_sidebar} wow animate__animated animate__fadeIn`}
        >
          <h4
            className={`${styles.line_bottom} color-gray-200 d-flex align-items-center`}
          >
            Recipe Details
          </h4>
        </div>
        <div className={`${styles.content_sidebar}`}>
          <div className={`${styles.list_comments}`}>
            <div
              className={`${styles.item_comment} wow animate__animated animate__fadeIn`}
            >
              <h6 className="color-gray-300 mb-10 text-uppercase">Category</h6>
              <p className="color-gray-200">Graphic Design, Marketing Kitsz</p>
            </div>
            <div
              className={`${styles.item_comment} wow animate__animated animate__fadeIn`}
            >
              <h6 className="color-gray-200 mb-10 text-uppercase">Client</h6>
              <p className="color-gray-200">Orion Coporation</p>
            </div>
            <div
              className={`${styles.item_comment} wow animate__animated animate__fadeIn`}
            >
              <h6 className="color-gray-200 mb-10 text-uppercase">
                Project date
              </h6>
              <p className="color-gray-200">{recipe?.cook_time}</p>
            </div>
            <div
              className={`${styles.item_comment} wow animate__animated animate__fadeIn`}
            >
              <div className="d-inline-block pt-10 wow animate__animated animate__fadeIn">
                <div className="d-flex align-item-center">
                  <h6 className="d-inline-block color-gray-500 mr-10">Share</h6>
                  <Link className="icon-media icon-fb" href="#" />
                  <Link className="icon-media icon-tw" href="#" />
                  <Link className="icon-media icon-printest" href="#" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
