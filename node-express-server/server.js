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

const getRecipes = paprika
	.recipes()
	.then((recipes) => recipes)
	.then((recipes) => console.log(recipes))
	.catch((err) => console.error(err));

const getRecipe = paprika.recipes().then((recipes) => {
	paprika.recipe(recipes[0].uid).then((recipe) => {
		console.log(recipe);
	});
});

app.post('/getRecipes', async (req, res) => res.send(await getRecipes()));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

// '06E4036A-C81F-4CC6-B1B7-F39AD9ACF816';
