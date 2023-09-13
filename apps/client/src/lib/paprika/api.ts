// import { buildAuthConfig } from './auth';
import {
  Bookmark,
  Category,
  GroceryItem,
  Meal,
  Menu,
  MenuItem,
  PantryItem,
  Recipe,
  RecipeItem,
} from '@prisma/client';

const PAPRIKA_V1_BASEURL = 'https://www.paprikaapp.com/api/v1';
const creds = { user: 'nadams165@gmail.com', pass: 'gUn-FEiwF2HsF-wi' };

async function resource(
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  body?: any,
): Promise<any> {
  const url = `${PAPRIKA_V1_BASEURL}/${endpoint}`;
  const headers = {
    'User-Agent': 'PaprikaApi NodeJS library',
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa(`${creds.user}:${creds.pass}`),
  };

  const response = await fetch(url, {
    method,
    headers,
    body: method === 'POST' ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  const data: any = await response.json();
  return data.result;
}

// const resource = async (endpoint: string, method = 'GET', body?: Body) => {
//   const options: OptionsWithUrl = {
//     auth: {
//       user: 'nadams165@gmail.com',
//       pass: 'gUn-FEiwF2HsF-wi',
//     },
//     method,
//     baseUrl: `${PAPRIKA_V1_BASEURL}/sync/`,
//     url: endpoint,
//     json: true,
//     // Use the 'result' property of the response
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     transform(body: any) {
//       return body.result;
//     },
//   };

//   console.log(options.auth);

//   if (body) {
//     options.body = body;
//   }

//   return request(options);
// };

export const bookmarks = (): Promise<Bookmark[]> => resource('bookmarks');

export const categories = (): Promise<Category[]> => resource('categories');

export const groceries = (): Promise<GroceryItem[]> => resource('groceries');

export const meals = (): Promise<Meal[]> => resource('meals');

export const menus = (): Promise<Menu[]> => resource('menus');

export const menuItems = (): Promise<MenuItem[]> => resource('menuitems');

export const pantry = (): Promise<PantryItem[]> => resource('pantry');

export const recipes = (): Promise<RecipeItem[]> => resource('recipes');

export const recipe = (recipeUid: string): Promise<Recipe> =>
  resource('recipe/' + recipeUid);

export const getRecipe = (recipeUid: string): Promise<Recipe> =>
  resource('recipe/' + recipeUid);

//! THIS IS FOR PAPRIKA VERSION 2, WHICH IS WRITE AND TOKEN PERMISSIONS WITH IMAGE STUFF.
//! FOR NOW, WE ARE ONLY READ PERMISSION FROM PAPRIKA

// const resource = async (
//   endpoint: string,
//   method = 'GET',
//   body?: any,
// ): Promise<any> => {
//   const config = await buildAuthConfig();
//   const options = {
//     method,
//     headers: {
//       Authorization: `Bearer ${config.bearerToken}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   };

//   const response = await fetch(
//     `${PAPRIKA_V1_BASEURL}/sync/${endpoint}`,
//     options,
//   );
//   const data: any = await response.json();
//   return data.result;
// };

// const gZip = async (jsonString: string): Promise<Buffer> => {
//   return new Promise<Buffer>((resolve, reject) => {
//     zlib.gzip(jsonString, (err, buffer) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(buffer);
//       }
//     });
//   });
// };

// const getPhotoData = async (photoUrl: string): Promise<Buffer> => {
//   const response = await fetch(photoUrl);
//   return await response.buffer();
// };

// export const create = async (recipeData: any): Promise<void> => {
//   const validatedRecipe = RecipeSchema.parse(recipeData);

//   if (!validatedRecipe) {
//     throw new Error('Recipe DTO is null or undefined');
//   }

//   const gzippedJson = await gZip(JSON.stringify(validatedRecipe));
//   const formData = new FormData();

//   if (recipeData.image_url) {
//     const photoData = await getPhotoData(validatedRecipe.image_url);

//     formData.append('photo', photoData, {
//       filename: `recipe.jpg`,
//     });

//     formData.append('data', gzippedJson, {
//       filename: 'recipe.json.gz',
//       contentType: 'application/gzip',
//     });
//   }

//   const config = await buildAuthConfig();

//   await fetch(`${config.baseURL}/sync/recipe/${recipeData.uid}`, {
//     method: 'POST',
//     headers: {
//       ...formData.getHeaders(),
//       Authorization: `Bearer ${config.bearerToken}`,
//     },
//     body: formData,
//   });
// };
