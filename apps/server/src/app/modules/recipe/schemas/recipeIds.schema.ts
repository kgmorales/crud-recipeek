import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const recipeIdsSchema = new Schema({
  uid: String,
  hash: String,
});

const RecipeIds = model('recipe_ids', recipeIdsSchema);

export default RecipeIds;
