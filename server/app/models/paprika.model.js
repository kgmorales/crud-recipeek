import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
	name: String,
	rating: Number,
	photo_hash: String,
	on_favorites: Boolean,
	photo: String,
	uid: String,
	scale: String,
	ingredients: String,
	is_pinned: Boolean,
	source: String,
	total_time: String,
	hash: String,
	description: String,
	source_url: String,
	difficulty: String,
	on_grocery_list: Boolean,
	in_trash: Boolean,
	directions: String,
	categories: Array,
	photo_url: String,
	cook_time: String,
	name: String,
	created: Date,
	notes: String,
	photo_large: String,
	image_url: String,
	prep_time: String,
	servings: String,
	nutritional_info: String,
});

const Recipe = model('recipe', recipeSchema);

export default Recipe;
