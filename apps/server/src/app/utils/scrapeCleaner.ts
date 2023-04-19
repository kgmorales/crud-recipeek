/**
 * @param {{ [key: string]: string }} cleanKeys - assigned cleaned properties of data object.
 * @param {any} rawData - raw data object from api.
 */
export const cleanScrapedRecipe = (cleanKeys: { [key: string]: string }, rawData: any) =>
	Object.assign(
		{},
		...Object.keys(rawData).map((key) => {
			const newKey = cleanKeys[key] || key;
			return { [newKey]: rawData[key] };
		})
	);

