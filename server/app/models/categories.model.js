import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const categorySchema = new Schema({
	name: String,
	uid: String,
	parent_uid: String,
	order_flag: Number,
});

const Category = model('category', categorySchema);

export default Category;
