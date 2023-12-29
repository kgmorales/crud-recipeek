import { RecipeCard } from "@types";

export async function fetchPaginatedRecipes(page: number, limit: number): Promise<RecipeCard[]> {
  try {
    const response = await fetch(`http://localhost:8080/api/recipes/paginatedRecipes?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}
