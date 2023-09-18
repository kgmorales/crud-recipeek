import { Recipe } from '@prisma/client';

export async function fetchFavorites(): Promise<Recipe[]> {
  try {
    const response = await fetch(
      'http://localhost:8080/api/recipes/favorites',
    );
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data: Recipe[] = await response.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching all recipes:', error);
    throw new Error('Error fetching all recipes: ' + error.message);
  }
}

export default fetchFavorites;
