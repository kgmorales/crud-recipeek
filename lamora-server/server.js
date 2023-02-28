import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PaprikaApi } from 'paprika-api';
import Butter from 'buttercms';
import http from 'http';

const hostname = '192.168.1.20';
const port = 8080;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config({ path: '.env' });

// const butter = Butter(process.env.BUTTERCMS_TOKEN);

// butter.page.retrieve('*', 'simple-page').then((response) => console.log(response.data));
// butter.retrieve()
const paprika = new PaprikaApi(process.env.PAPRIKA_USER, process.env.PAPRIKA_PASS);

const getAllRecipes = async () => {
	const getRecipe = (uid) => paprika.recipe(uid).catch((err) => console.error(err));
	const recipeItems = await paprika.recipes();
	const allRecipes = await Promise.all(recipeItems.map(async (item) => await getRecipe(item.uid)));
	return allRecipes;
};Hi S

app.get('/getRecipes', async (req, res) => res.send({ allRecipes: await getAllRecipes() }));

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
// 	console.log(`Server is running on port ${PORT}.`);
// });

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}`);
});
