import { Home } from '@types';
import { addCategoryStringToRecipes } from '@utils/cleanRecipeCategories';

async function responseMiddleware(response: Response): Promise<Home> {
  const data: Home = await response.json();

  // Process the recipes
  const processedRecipes = await addCategoryStringToRecipes(
    data.recipes,
    data.categories,
  );
  data.recipes = processedRecipes;

  return data;
}

async function fetchHome(): Promise<Home> {
  try {
    const response = await fetch('http://localhost:8080/api/page/home');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data: Home = await response.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching all recipes:', error);
    throw new Error('Error fetching all recipes: ' + error.message);
  }
}

export default fetchHome;
