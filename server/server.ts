import express from 'express';
import cors from 'cors';

import recipeRouter from './app/routes/recipe.routes';
import compression from 'compression';

import mongoose from 'mongoose';
require('express-async-errors');

import config from './app/config/config';
import logger from './app/utils/logger';

//#region //? wifi display
// import http from 'http';
// const hostname = '192.168.1.20';
// const port = 8080;

// const server = http.createServer((req, res) => {
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'text/plain');
// });
//#endregion

const app = express();
app.use(cors());
app.use(compression());
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose
	.connect(config.MONGODB_URL as string, config.mongooseOptions)
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message);
	});

app.use('/', recipeRouter);

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}.`));

//#region //? wifi display
// app.listen(port, hostname, () => {
// 	console.log(`Server running at http://${hostname}:${port}`);
// });
//#endregion
