import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PaprikaApi } from 'paprika-api';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config({ path: '.env' });

const paprika = new PaprikaApi(process.env.PAPRIKA_USER, process.env.PAPRIKA_PASS);

const getAllRecipes = async () => {
	const getRecipe = (uid) => paprika.recipe(uid).catch((err) => console.error(err));
	const recipeItems = await paprika.recipes();
	console.log(recipeItems);
	const allRecipes = await Promise.all(recipeItems.map(async (item) => await getRecipe(item.uid)));
	console.log(allRecipes);
	return allRecipes;
};

app.get('/getRecipes', async (req, res) => res.send({ recipes: await getAllRecipes() }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
