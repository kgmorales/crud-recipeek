// search.routes.ts
import { RecipeCard } from '@types';

export async function fetchSearchResults(
  searchTerm: string,
  excludeUids: string[],
): Promise<RecipeCard[]> {
  const queryParams = new URLSearchParams({
    query: searchTerm,
    exclude: excludeUids.join(','),
  }).toString();

  try {
    const response = await fetch(
      `localhost:8080/api/search/recipes?${queryParams}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError("Oops, we haven't got JSON!");
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
