-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "lamora";

-- CreateTable
CREATE TABLE "lamora"."Bookmark" (
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "order_flag" INTEGER NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "lamora"."Category" (
    "name" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "parent_uid" TEXT,
    "order_flag" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "lamora"."GroceryItem" (
    "aisle" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "order_flag" INTEGER NOT NULL,
    "recipe" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "purchased" BOOLEAN NOT NULL,
    "recipe_uid" TEXT NOT NULL,
    "ingredient" TEXT NOT NULL,

    CONSTRAINT "GroceryItem_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "lamora"."Meal" (
    "uid" TEXT NOT NULL,
    "order_flag" INTEGER NOT NULL,
    "recipe_uid" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "lamora"."Menu" (
    "notes" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order_flag" INTEGER NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "lamora"."MenuItem" (
    "name" TEXT NOT NULL,
    "recipe_uid" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "menu_uid" TEXT NOT NULL,
    "order_flag" INTEGER NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "lamora"."PantryItem" (
    "aisle" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "ingredient" TEXT NOT NULL,

    CONSTRAINT "PantryItem_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "lamora"."ScrapedRecipe" (
    "id" SERIAL NOT NULL,
    "author" TEXT,
    "canonical_url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "cook_time" INTEGER,
    "description" TEXT,
    "host" TEXT,
    "image" TEXT,
    "ingredients" TEXT[],
    "instructions" TEXT NOT NULL,
    "instructions_list" TEXT[],
    "language" TEXT NOT NULL,
    "nutrients" JSONB,
    "prep_time" INTEGER,
    "ratings" INTEGER,
    "site_name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "total_time" INTEGER,
    "yields" TEXT,

    CONSTRAINT "ScrapedRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lamora"."Recipe" (
    "categories" TEXT[],
    "cook_time" TEXT,
    "created" TEXT NOT NULL,
    "description" TEXT,
    "difficulty" TEXT,
    "directions" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "image_url" TEXT,
    "in_trash" BOOLEAN NOT NULL,
    "ingredients" TEXT NOT NULL,
    "is_pinned" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "nutritional_info" TEXT NOT NULL,
    "on_favorites" BOOLEAN NOT NULL,
    "on_grocery_list" BOOLEAN,
    "photo" TEXT,
    "photo_hash" TEXT,
    "photo_large" TEXT,
    "photo_url" TEXT,
    "prep_time" TEXT,
    "rating" INTEGER NOT NULL,
    "scale" TEXT,
    "servings" TEXT,
    "source" TEXT NOT NULL,
    "source_url" TEXT NOT NULL,
    "total_time" TEXT,
    "uid" TEXT NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lamora"."RecipeItem" (
    "hash" TEXT NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "RecipeItem_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "lamora"."Status" (
    "bookmarks" INTEGER NOT NULL,
    "categories" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groceries" INTEGER NOT NULL,
    "grocerylists" INTEGER NOT NULL,
    "groceryaisles" INTEGER NOT NULL,
    "groceryingredients" INTEGER NOT NULL,
    "meals" INTEGER NOT NULL,
    "mealtypes" INTEGER NOT NULL,
    "menus" INTEGER NOT NULL,
    "menuitems" INTEGER NOT NULL,
    "pantry" INTEGER NOT NULL,
    "pantrylocations" INTEGER NOT NULL,
    "photos" INTEGER NOT NULL,
    "recipes" INTEGER NOT NULL,
    "uid" INTEGER NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "lamora"."PaprikaToken" (
    "id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "PaprikaToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lamora"."PaprikaConfig" (
    "baseURL" TEXT NOT NULL,
    "bearerToken" TEXT,
    "id" SERIAL NOT NULL,
    "jwtSecret" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "PaprikaConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lamora"."PaprikaStatus" (
    "categories" INTEGER NOT NULL,
    "recipes" INTEGER NOT NULL,
    "photos" INTEGER NOT NULL,
    "groceries" INTEGER NOT NULL,
    "grocertlists" INTEGER NOT NULL,
    "groceryaisles" INTEGER NOT NULL,
    "groceryingredients" INTEGER NOT NULL,
    "meals" INTEGER NOT NULL,
    "mealtypes" INTEGER NOT NULL,
    "bookmarks" INTEGER NOT NULL,
    "pantry" INTEGER NOT NULL,
    "pantrylocations" INTEGER NOT NULL,
    "menus" INTEGER NOT NULL,
    "menuitems" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" INTEGER NOT NULL,

    CONSTRAINT "PaprikaStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lamora"."Blog" (
    "content" TEXT NOT NULL,
    "categoryId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recipeUID" TEXT,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lamora"."BlogCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BlogCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_uid_key" ON "lamora"."Recipe"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "PaprikaToken_token_key" ON "lamora"."PaprikaToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "lamora"."Blog"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogCategory_name_key" ON "lamora"."BlogCategory"("name");

-- AddForeignKey
ALTER TABLE "lamora"."Blog" ADD CONSTRAINT "Blog_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "lamora"."BlogCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lamora"."Blog" ADD CONSTRAINT "Blog_recipeUID_fkey" FOREIGN KEY ("recipeUID") REFERENCES "lamora"."Recipe"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
