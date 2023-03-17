import express from 'express';
import cors from 'cors';

import recipeRouter from './app/routes/recipe.routes';
import compression from 'compression';

import mongoose from 'mongoose';
require('express-async-errors');

// import { Options, PythonShell } from 'python-shell';

// import { spawn } from 'child_process';




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
// app.use(express.static('build'));
// let options: Options = {
// 	mode: 'binary',
// 	// pythonOptions: ['-u'], // get print results in real-time

// 	// scriptPath: 'app/utils/scraper/',
// 	args: ['https://www.allrecipes.com/recipe/15644/colcannon/'],
// };

// PythonShell.run('./app/utils/scraper/scrape.py', options).then((messages) => {
// 	// results is an array consisting of messages collected during execution
// 	console.log(messages);
// });

// const python = spawn('python', ['./app/utils/scraper/scrape.py'], 'FLASK_APP=scrape.py flask run');
// let pyshell = new PythonShell('scrape.py', options);
// pyshell.send({ command: 'parse_recipe', args: ['https://www.foodnetwork.com/recipes/food-network-kitchen/full-irish-breakfast-9843783'] });
// PythonShell.run('scrape.py', options).then((messages) => console.log('results: %j', messages));
mongoose.set('strictQuery', false);
mongoose
	.connect(config.MONGODB_URL as string, config.mongooseOptions)
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message);
	});

// PythonShell.runString('FLASK_APP=scrape.py').then((messages) => {
// 	console.log('finished');
// });

// pyshell.send('hello');

// pyshell.on('message', (message) => console.log({ message }));

// pyshell.send('FLASK_APP=scrape.py flask run');

// pyshell.end(function (err, code, signal) {
// 	if (err) throw err;
// 	console.log('The exit code was: ' + code);
// 	console.log('The exit signal was: ' + signal);
// 	console.log('finished');
// });

app.use('/', recipeRouter);

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}.`));

//#region //? wifi display
// app.listen(port, hostname, () => {
// 	console.log(`Server running at http://${hostname}:${port}`);
// });
//#endregion

// let pyshell = new PythonShell('app/utils/scraper/scrape.py');

// pyshell.send('https://www.foodnetwork.com/recipes/food-network-kitchen/full-irish-breakfast-9843783');

// pyshell.on('message', (message) => console.log({ message }));
// const shell = new PythonShell('app/utils/scraper/scrape.py');

// pyshell.end(function (err, code, signal) {
// 	if (err) throw err;
// 	console.log('The exit code was: ' + code);
// 	console.log('The exit signal was: ' + signal);
// 	console.log('finished');
// });
