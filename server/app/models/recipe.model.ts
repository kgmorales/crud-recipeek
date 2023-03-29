import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
	categories: Array,
	cook_time: String,
	created: Date,
	description: String,
	difficulty: String,
	directions: String,
	name: String,
	on_favorites: Boolean,
	hash: String,
	image_url: String,
	ingredients: String,
	is_pinned: Boolean,
	in_trash: Boolean,
	notes: String,
	nutritional_info: String,
	on_grocery_list: Boolean,
	photo: String,
	photo_large: String,
	photo_hash: String,
	photo_url: String,
	prep_time: String,
	rating: Number,
	scale: String,
	servings: String,
	source: String,
	source_url: String,
	total_time: String,
	uid: String,
});

const Recipe = model('recipe', recipeSchema);

export default Recipe;
