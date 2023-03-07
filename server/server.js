import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import paprikaRouter from './app/routes/paprika.routes.js';
// import { PaprikaApi } from 'paprika-api';
// import Butter from 'buttercms';
// import http from 'http';

// const hostname = '192.168.1.20';
// const port = 8080;

// const server = http.createServer((req, res) => {
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'text/plain');
// });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config({ path: '.env' });

// const paprika = new PaprikaApi(process.env.PAPRIKA_USER, process.env.PAPRIKA_PASS);

// const getAllRecipes = async () => {
// 	const getRecipe = (uid) => paprikaRouter.recipe(uid).catch((err) => console.error(err));
// 	const recipeItems = await paprikaRouter.recipes();
// 	const allRecipes = await Promise.all(recipeItems.map(async (item) => await getRecipe(item.uid)));
// 	return allRecipes;
// };
app.use('/', paprikaRouter);
// app.get('/getRecipes', async (req, res) => res.send({ allRecipes: await getAllRecipes() }));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

//*? To Show on wifi
// app.listen(port, hostname, () => {
// 	console.log(`Server running at http://${hostname}:${port}`);
// });
