import { spawn } from 'child_process';

export async function scrapeRecipe(recipeUrl: string) {
	const process = spawn('python3', ['app/utils/scrape.py', recipeUrl]);
	let recipe = '';

	process.stdout.on('data', (_data) => {
		try {
			const data = _data.toString();
			recipe += data;
		} catch (error) {
			console.error(error);
		}
	});
	process.stdout.on('exit', function (_) {
		console.log('EXIT:', recipe);
	});
	process.stdout.on('end', () => console.log('END:', recipe));
	process.on('error', (error: Error) => console.error(error));
	process.stdin.end();

	console.log(recipe);

	return recipe;
}
