import { RecipeCard } from '@types';

export async function fetchRecipes(): Promise<RecipeCard[]> {
  try {
    const response = await fetch('http://localhost:8080/api/page/allRecipes');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const recipeCards: RecipeCard[] = await response.json();

    return recipeCards;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching all recipes:', error);
    throw new Error('Error fetching all recipes: ' + error.message);
  }
}

export default fetchRecipes;
