import { RecipeCard } from '@types';

export async function fetchAllRecipeCards(): Promise<RecipeCard[]> {
  try {
    const response = await fetch(
      'http://192.168.172.156:8080/api/recipes/allRecipeCards',
    );
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data: RecipeCard[] = await response.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching all recipes:', error);
    throw new Error('Error fetching all recipes: ' + error.message);
  }
}

export default fetchAllRecipeCards;
