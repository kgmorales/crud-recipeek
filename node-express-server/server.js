import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PaprikaApi } from 'paprika-api';

const app = express();
dotenv.config({ path: '.env' });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let paprika = new PaprikaApi(process.env.PAPRIKA_USER, process.env.PAPRIKA_PASS);

const getRecipeItems = () =>
	paprika
		.recipes()
		.then((recipes) => recipes)
		.catch((err) => console.error(err));

const recipeIds = await getRecipeItems().then((ids) => ids.map((ids) => ids.uid));
const getRecipe = async (uid) => await paprika.recipe(uid).then((recipe) => console.log(recipe));

const allRecipes = recipeIds.map(async (id) => await getRecipe(id));



app.post('/getRecipes', async (req, res) => res.send(allRecipes));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
