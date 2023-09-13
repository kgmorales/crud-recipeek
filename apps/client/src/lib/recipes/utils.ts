import { Category, PrismaClient, Recipe } from '@prisma/client';
import * as paprikaUtils from '../paprika/utils';

const prisma = new PrismaClient();

type Paginated = { page?: number | undefined; limit?: number | undefined };

export type FunctionArgsMap = {
  createRecipe: [Recipe];
  deleteAll: [];
  // findRecipeByUID: [string];
  getAllCategories: [];
  getPaginatedRecipes: [Paginated];
  getAllRecipes: [];
  refreshDB: [];
  updateRecipes: [];
};

type RecipeUtils = {
  [K in keyof FunctionArgsMap]: (...args: FunctionArgsMap[K]) => Promise<any>;
};

export const recipeUtils: RecipeUtils = {
  getAllRecipes: async (): Promise<Recipe[]> => {
    return prisma.recipe.findMany();
  },

  getAllCategories: async (): Promise<Category[]> => {
    return prisma.category.findMany();
  },

  createRecipe: async (recipe: Recipe): Promise<void> => {
    await prisma.recipe.create({ data: recipe });
  },

  deleteAll: async (): Promise<void> => {
    await prisma.recipe.deleteMany();
    await prisma.category.deleteMany();
  },

  getPaginatedRecipes: async ({ page = 1, limit = 10 }): Promise<any> => {
    limit = limit > 100 ? 100 : limit;
    const skippedItems = (page - 1) * limit;

    return prisma.recipe.findMany({
      skip: skippedItems,
      take: limit,
    });
  },

  refreshDB: async (): Promise<void> => {
    await recipeUtils['deleteAll']();

    const allRecipesData = await paprikaUtils.getAllRecipes();
    const allIDs = await paprikaUtils.getRecipeIds();
    const allCategoriesData = await paprikaUtils.getCategories();

    await prisma.recipe.createMany({ data: allRecipesData });
    await prisma.recipeItem.createMany({ data: allIDs });
    await prisma.category.createMany({ data: allCategoriesData });
  },

  updateRecipes: async (): Promise<Recipe[]> => {
    const paprikaIds = await paprikaUtils.getRecipeIds();
    const dbRecipeCount = await prisma.recipe.count();

    if (paprikaIds.length !== dbRecipeCount) {
      const dbIds = await prisma.recipeItem.findMany();
      const newRecipeIds = paprikaIds.filter(
        (paprikaId) => !dbIds.some((dbId) => paprikaId.uid === dbId.uid),
      );

      const newUIDs = newRecipeIds.map((ids) => ids.uid);
      const newRecipes = await paprikaUtils.findByUID(newUIDs.join(''));

      await prisma.recipeItem.createMany({ data: newRecipeIds });
      await prisma.recipe.createMany({ data: newRecipes });

      return newRecipes;
    }

    return [];
  },

  // findRecipeByUID: async (uid: string): Promise<Recipe> => {
  //   return prisma.recipe.findUnique({
  //     where: { uid },
  //   });
  // },
};
