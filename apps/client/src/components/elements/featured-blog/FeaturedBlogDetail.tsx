import FeaturedRecipes from '@components/sections/featured-recipes/FeaturedRecipes';
import { useBlogPostContext } from '@contexts';
import { useRecipeCards } from '@hooks';
import { usePost } from 'apps/client/src/hooks/usePost.hook';
import Link from 'next/link';
import React from 'react';

const FeaturedBlogDetail: React.FC = () => {
  const { currentPost } = useBlogPostContext();
  const { recipes } = useRecipeCards();

  const post = usePost(currentPost?.id as string);

  const filterPostRecipes = () => {
    // Ensure recipes are defined
    if (!recipes) return [];

    // Use an empty array as a fallback if post?.recipeUIDs is undefined
    const recipeUIDs = post?.recipeUIDs || [];

    // Filter recipes to include those where their uid is defined and matches any uid in the recipeUIDs array
    return recipes.filter(
      (recipe) => recipe.uid && recipeUIDs.includes(recipe.uid),
    );
  };

  const postRecipes = filterPostRecipes();

  console.log({ currentPost });
  console.log({ recipes });
  console.log(postRecipes);

  return (
    <>
      <div className="mt-20 mb-20">
        <img className="img-bdrd-16" src={post?.img} alt="Genz" />
      </div>
      <div className="content-detail border-gray-800">
        {post?.contentSections?.map((section, i) => (
          <div key={i}>
            <h3 className="color-gray-300 mb-30 mt-30">{section.heading}</h3>
            <p className="text-xl color-gray-300">{section.content}</p>
          </div>
        ))}
        <div className="container">
          <FeaturedRecipes featured={postRecipes} />
        </div>
      </div>
    </>
  );
};

export default FeaturedBlogDetail;
