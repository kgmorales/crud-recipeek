import { Recipe } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface RecentCardBigProps {
  recipe: Recipe;
}

const RecentCardBig: React.FC<RecentCardBigProps> = ({ recipe }) => {
  return (
    <div
      className="card-blog-1 card-blog-2 hover-up wow animate__animated animate__fadeIn"
      data-wow-delay={0}
      key={recipe.id}
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
          <h4 className="mt-30 color-gray-300">{recipe.name}</h4>
        </Link>
        <p className="mt-25 text-lg">{recipe.description}</p>
        <div className="row align-items-center mt-45">
          <div className="col-7">
            <div className="box-author">
              <div className="author-info">
                <h6>Joseph</h6>
                <span className="text-sm">{recipe.created}</span>
              </div>
            </div>
          </div>
          <div className="col-5 text-end">
            <Link className="readmore text-sm" href={`/recipes/${recipe.id}`}>
              <span>Read more</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentCardBig;
