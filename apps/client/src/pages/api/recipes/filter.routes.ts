export async function fetchFilteredRecipes(filter: URLSearchParams) {
  const params = new URLSearchParams(filter);

  console.log('params:', params);

  try {
    const response = await fetch(
      `http://localhost:8080/api/recipes/filter?${params}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
