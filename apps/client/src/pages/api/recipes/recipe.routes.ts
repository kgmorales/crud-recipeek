import { Recipe } from '@prisma/client';

export async function fetchRecipe(uid: Recipe['uid']): Promise<Recipe> {
  try {
    const response = await fetch(
      `http://192.168.172.156:8080/api/recipes/recipe/${uid}`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const recipe: Recipe = await response.json();

    return recipe;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching all recipes:', error);
    throw new Error('Error fetching all recipes: ' + error.message);
  }
}

export default fetchRecipe;
