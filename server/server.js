import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import paprikaRouter from './app/routes/paprika.routes.js';
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

app.use('/', paprikaRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

//*? To Show on wifi
// app.listen(port, hostname, () => {
// 	console.log(`Server running at http://${hostname}:${port}`);
// });
