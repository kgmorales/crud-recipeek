/**
 * This constant contains the mapping of the keys from the scraped recipe to the keys in the Paprika recipe.
 * The properties are the scraped recipe properties, and the values on the right are the Paprika recipe properties.
 * Commented out is already matched.
 */
export const matchPaprikaKeys: Record<string, string> = {
  // author: 'author',
  canonical_url: 'source_url',
  // category: 'categories',
  // cook_time: 'cook'
  // description?: string,
  // host?: string;
  image: 'image_url',
  // ingredients: string[];
  instructions: 'directions',
  // instructions_list: string[];
  // language: string;
  nutrients: 'nutritional_info',
  // prep_time?: number;
  ratings: 'rating',
  site_name: 'source',
  title: 'name',
  // total_time?: number;
  yields: 'servings',
};
