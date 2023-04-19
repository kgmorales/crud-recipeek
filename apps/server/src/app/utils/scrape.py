from recipe_scrapers import scrape_me
import scrape_schema_recipe
from recipe_scrapers._utils import get_minutes
from recipe_scrapers import scrape_html
import json
import requests
import sys

def parse_recipe(recipe_url):
    try:
        recipes = scrape_schema_recipe.scrape_url(recipe_url)
        # if len(recipes) == 1 and recipes[0] is not None:
        #     recipe = recipes[0]
        #     if 'keywords' in recipe:
        #         recipe['keywords'] = [html.escape(
        #             i.strip()) for i in recipe['keywords'].split(',')]
        #     if 'image' in recipe:
        #         if type(recipe['image']) == dict:
        #             if 'url' in recipe['image']:
        #                 recipe['image'] = recipe['image']['url']
        #     if 'image' in recipe:
        #         if type(recipe['image']) == list:
        #             recipe['image'] = recipe['image'][-1]
        #     if 'author' in recipe:
        #         if type(recipe['author']) == dict and 'name' in recipe['author']:
        #             recipe['author'] = html.escape(recipe['author']['name'])
        #     if 'recipeYield' in recipe:
        #         rYield = recipe['recipeYield']
        #         if type(rYield) == str:
        #             recipe['recipeYield'] = [i.strip()
        #                                      for i in rYield.split(',')][0]
        #         if type(rYield) == list and len(rYield) > 0:
        #             recipe['recipeYield'] = rYield[0]
        #     if 'cookTime' in recipe:
        #         recipe['cookTime'] = get_minutes(recipe['cookTime'])
        #     if 'prepTime' in recipe:
        #         recipe['prepTime'] = get_minutes(recipe['prepTime'])
        #     if 'totalTime' in recipe:
        #         recipe['totalTime'] = get_minutes(recipe['totalTime'])
        return recipe.to_json()
    except Exception as e:
        pass

    try:
        scraper = scrape_me(recipe_url, wild_mode=True)
        # to_return = {
        #     # "cook_time": scraper.cook_time(),
        #     "directions": scraper.instructions(),
        #     "ingredients": '\n'.join(scraper.ingredients()),
        #     "image_url": scraper.image(),
        #     "name": scraper.title(),
        #     "nutritional_info": scraper.nutrients(),
        #     # "prep_time": scraper.prep_time(),
        #     "rating": scraper.ratings(),
        #     "servings": scraper.yields(),
        #     "source_url": scraper.canonical_url(),
        #     "totalTime": scraper.total_time(),
        # }
        # return to_return
        
        return scraper.to_json()
    except Exception as e:
        pass

    try:
        html = requests.get(recipe_url).content

        scraper = scrape_html(html=html, org_url=recipe_url)

        # to_return = {
        #     # "cook_time": scraper.cook_time(),
        #     "directions": scraper.instructions(),
        #     "ingredients": scraper.ingredients(),
        #     "image_url": scraper.image(),
        #     "name": scraper.title(),
        #     "nutritional_info": scraper.nutrients(),
        #     # "prep_time": scraper.prep_time(),
        #     "rating": scraper.ratings(),
        #     "servings": scraper.yields(),
        #     "source_url": scraper.canonical_url(),
        #     "totalTime": scraper.total_time(),
        # }
        # print('from 3')
        return scraper.to_json()
    except Exception as e:
        pass


if __name__ == '__main__':
    recipe_url = sys.argv[1]
    recipe = parse_recipe(recipe_url)
    if recipe:
        # print(recipe)
        print(json.dumps(recipe))
    else:
        print("Unable to parse recipe from provided URL.")
