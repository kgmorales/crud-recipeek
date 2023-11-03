// search.routes.ts
import { Recipe } from '@prisma/client';

export async function fetchSearchResults(
  searchTerm: string,
  excludeUids: string[],
): Promise<Recipe[]> {
  const queryParams = new URLSearchParams({
    query: searchTerm,
    exclude: excludeUids.join(','),
  }).toString();

  const response = await fetch(
    `http://localhost:8080/search/recipes?${queryParams}`,
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
