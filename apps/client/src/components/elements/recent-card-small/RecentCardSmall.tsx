import { Recipe } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface RecentCardSmallProps {
  recipe: Recipe;
}

const RecentCardSmall: React.FC<RecentCardSmallProps> = ({ recipe }) => {
  return (
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
          className="btn btn-tag hover-up mb-10 text-xs"
          href="/blog-archive"
        >
          {recipe.categories[0]}
        </Link>
        <Link href={`/blog/${recipe.id}`}>
          <h5 className="mb-10 color-gray-300">{recipe.name}</h5>
        </Link>
        <div className="row mt-10">
          <div className="col-12">
            <span className="calendar-icon color-gray-300 text-sm mr-20">
              {recipe.created}
            </span>
            <span className="color-gray-300 text-sm timeread">
              {recipe.created}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentCardSmall;
