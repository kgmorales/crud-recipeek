export interface IBookmark {
  url: string;
  title: string;
  uid: string;
  order_flag: number;
}
export interface ICategory {
  name: string;
  uid: string;
  parent_uid: string;
  order_flag: number;
}
export interface IGroceryItem {
  aisle: string;
  uid: string;
  order_flag: number;
  recipe: string;
  name: string;
  purchased: boolean;
  recipe_uid: string;
  ingredient: string;
}
export interface IMeal {
  uid: string;
  order_flag: number;
  recipe_uid: string;
  date: string;
  type: number;
  name: string;
}
export interface IMenu {
  notes: string;
  uid: string;
  name: string;
  order_flag: number;
}
export interface IMenuItem {
  name: string;
  recipe_uid: string;
  uid: string;
  menu_uid: string;
  order_flag: number;
}
export interface IPantryItem {
  aisle: string;
  uid: string;
  ingredient: string;
}
export interface IRecipe {
  categories: string[];
  cook_time: string;
  created: string;
  difficulty: string;
  directions: string;
  hash: string;
  ingredients: string;
  image_url: string;
  name: string;
  notes: string;
  nutritional_info: string;
  on_favorites: boolean;
  photo: string;
  photo_url: string;
  photo_hash: string;
  prep_time: string;
  rating: number;
  scale: number;
  servings: string;
  source: string;
  source_url: string;
  uid: string;
}
export interface IRecipeItem {
  hash: string;
  uid: string;
}
export interface IStatus {
  recipes: number;
  pantry: number;
  meals: number;
  menus: number;
  groceries: number;
  bookmarks: number;
  menuitems: number;
  categories: number;
}

export interface IScrapedRecipe {
  author?: string;
  canonical_url: string;
  category: string;
  cook_time?: number;
  description?: string;
  host?: string;
  image?: string;
  ingredients: string[];
  instructions: string;
  instructions_list: string[];
  language: string;
  nutrients?: Record<string, string>;
  prep_time?: number;
  ratings?: number;
  site_name: string;
  title: string;
  total_time?: number;
  yields?: string;
}
