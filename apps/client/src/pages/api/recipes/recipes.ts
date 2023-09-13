// pages/api/paprika/allRecipes.js
import { recipeUtils, FunctionArgsMap } from '../../../lib/recipes/utils';
import { NextApiRequest, NextApiResponse } from 'next';

type RecipeUtils = {
  [K in keyof FunctionArgsMap]: (...args: FunctionArgsMap[K]) => Promise<any>;
};

function callRecipeUtilsMethod<K extends keyof RecipeUtils>(
  method: K,
  args: FunctionArgsMap[K],
): Promise<any> {
  return recipeUtils[method](...args);
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const reqBody = req.body;
  const functionName = reqBody.functionName as keyof FunctionArgsMap;
  const args = reqBody.args as FunctionArgsMap[typeof functionName];

  if (!recipeUtils[functionName]) {
    res.status(400).json({ error: `Function not found: ${functionName}` });
    return;
  }

  const result = await callRecipeUtilsMethod(functionName, args);
  if (result instanceof Error) {
    res.status(500).json({
      error: `Failed to execute function: ${functionName}, Error: ${result.message}`,
    });
    return;
  }

  res.status(200).json(result);
}
