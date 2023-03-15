export interface Bookmark {
	url: string;
	title: string;
	uid: string;
	order_flag: number;
}
export interface Category {
	name: string;
	uid: string;
	parent_uid: string;
	order_flag: number;
}
export interface GroceryItem {
	aisle: string;
	uid: string;
	order_flag: number;
	recipe: string;
	name: string;
	purchased: boolean;
	recipe_uid: string;
	ingredient: string;
}
export interface Meal {
	uid: string;
	order_flag: number;
	recipe_uid: string;
	date: string;
	type: number;
	name: string;
}
export interface Menu {
	notes: string;
	uid: string;
	name: string;
	order_flag: number;
}
export interface MenuItem {
	name: string;
	recipe_uid: string;
	uid: string;
	menu_uid: string;
	order_flag: number;
}
export interface PantryItem {
	aisle: string;
	uid: string;
	ingredient: string;
}
export interface Recipe {
	rating: number;
	photo_hash: string;
	on_favorites: boolean;
	photo: string;
	uid: string;
	scale: number;
	ingredients: string;
	source: string;
	hash: string;
	source_url: string;
	difficulty: string;
	categories: string[];
	photo_url: string;
	cook_time: string;
	name: string;
	created: string;
	notes: string;
	image_url: string;
	prep_time: string;
	servings: string;
	nutritional_info: string;
}
export interface RecipeItem {
	hash: string;
	uid: string;
}
export interface Status {
	recipes: number;
	pantry: number;
	meals: number;
	menus: number;
	groceries: number;
	bookmarks: number;
	menuitems: number;
	categories: number;
}
