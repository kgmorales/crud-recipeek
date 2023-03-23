import { spawn } from 'child_process';

export async function scrapeRecipe(recipeUrl: string) {
	return new Promise((resolve, reject) => {
		const python = spawn('python3', ['app/utils/scrape.py', recipeUrl]);
		python.stdout.on('data', (data) => {
			const result = data.toString();
			console.log(result);
		});

		python.stderr.on('data', (data) => {
			console.error(`stderr: ${data}`);
		});

		python.on('close', (code) => {
			console.log(`child process exited with code ${code}`);
		});
	});
	// const process = spawn('python3', ['app/utils/scrape.py', recipeUrl]);
	// let recipe = '';

	// process.stdout.on('data', (_data) => {
	// 	try {
	// 		const data = _data.toString();
	// 		recipe += data;
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// });
	// process.stdout.on('exit', function (_) {
	// 	console.log('EXIT:', recipe);
	// });
	// // process.stdout.on('end', () => console.log('END:', recipe));
	// process.on('error', (error: Error) => console.error(error));
	// process.stdin.end();

	// console.log(recipe);

	// return recipe;
}
