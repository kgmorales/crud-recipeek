import { RecipeFunctionArgsMap } from '../../../types/recipe.types';

export async function fetchRecipes(
  functionName: keyof RecipeFunctionArgsMap,
  args: RecipeFunctionArgsMap[keyof RecipeFunctionArgsMap] = [],
): Promise<any> {
  try {
    const response = await fetch('http://localhost:3000/api/recipes/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ functionName, args }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  } catch (error: any) {
    throw new Error('Fetch error: ' + error.message);
  }
}
