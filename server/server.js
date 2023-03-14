import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import recipeRouter from './app/routes/recipe.routes.js';
import compression from 'compression';
import mongoose from 'mongoose';
import { url } from './app/config/db.config.js';

//#region //? wifi display
// import http from 'http';
// const hostname = '192.168.1.20';
// const port = 8080;

// const server = http.createServer((req, res) => {
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'text/plain');
// });
//#endregion

// import Butter from 'buttercms';

const app = express();
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.set('strictQuery', false);

mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((e) => console.log('MongoDB ready'))
	.catch(console.error);

app.use('/', recipeRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

//#region //? wifi display
// app.listen(port, hostname, () => {
// 	console.log(`Server running at http://${hostname}:${port}`);
// });
//#endregion
