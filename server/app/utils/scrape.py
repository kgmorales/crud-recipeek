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
        if len(recipes) == 1 and recipes[0] is not None:
            recipe = recipes[0]
            if 'recipeInstructions' in recipe:
                ins = recipe['recipeInstructions']
                if type(ins) == str:
                    recipe['recipeInstructions'] = [html.escape(ins)]
                elif type(ins) == list and len(ins) > 0:
                    if type(ins[0]) == dict:
                        recipe['recipeInstructions'] = []
                        for item in ins:
                            for k, v in item.items():
                                if k == 'text':
                                    recipe['recipeInstructions'].append(
                                        html.escape(v))
                    else:
                        recipe['recipeInstructions'] = [html.escape(
                            i) for i in recipe['recipeInstructions']]
            if 'keywords' in recipe:
                recipe['keywords'] = [html.escape(
                    i.strip()) for i in recipe['keywords'].split(',')]
            if 'image' in recipe:
                if type(recipe['image']) == dict:
                    if 'url' in recipe['image']:
                        recipe['image'] = recipe['image']['url']
            if 'image' in recipe:
                if type(recipe['image']) == list:
                    recipe['image'] = recipe['image'][-1]
            if 'author' in recipe:
                if type(recipe['author']) == dict and 'name' in recipe['author']:
                    recipe['author'] = html.escape(recipe['author']['name'])
            if 'recipeYield' in recipe:
                rYield = recipe['recipeYield']
                if type(rYield) == str:
                    recipe['recipeYield'] = [i.strip()
                                             for i in rYield.split(',')][0]
                if type(rYield) == list and len(rYield) > 0:
                    recipe['recipeYield'] = rYield[0]
            if 'cookTime' in recipe:
                recipe['cookTime'] = get_minutes(recipe['cookTime'])
            if 'prepTime' in recipe:
                recipe['prepTime'] = get_minutes(recipe['prepTime'])
            if 'totalTime' in recipe:
                recipe['totalTime'] = get_minutes(recipe['totalTime'])
            return recipe
    except Exception as e:
        print(e.args)
        pass

    try:
        scraper = scrape_me(recipe_url, wild_mode=True)
        to_return = {
            "@type": "noSchema",
            "name": scraper.title(),
            "url": scraper.canonical_url(),
            "recipeIngredients": scraper.ingredients(),
            "recipeInstructions": [i for i in scraper.instructions().split('\n') if i != ""],
            "aggregateRating": scraper.ratings(),
            "totalTime": scraper.total_time(),
            "recipeYield": scraper.yields(),
            "image": scraper.image(),
            "category": scraper.category()
        }
        return to_return
    except Exception as e:
        print(f'Error processing request. That domain might not be in the list.')

    try:
        html = requests.get(recipe_url).content

        scraper = scrape_html(html=html, org_url=recipe_url)
        print('html fired')
        to_return = {
            "@type": "noSchema",
            "name": scraper.title(),
            "url": scraper.canonical_url(),
            "recipeIngredients": scraper.ingredients(),
            "recipeInstructions": [i for i in scraper.instructions().split('\n') if i != ""],
            "aggregateRating": scraper.ratings(),
            "totalTime": scraper.total_time(),
            "recipeYield": scraper.yields(),
            "image": scraper.image(),
            "category": scraper.category()
        }
        return to_return
    except Exception as e:
        print(f'Error processing request. That domain might not be in the list.')


if __name__ == '__main__':
    recipe_url = sys.argv[1]
    recipe = parse_recipe(recipe_url)
    if recipe:
        print(json.dumps(recipe))
    else:
        print("Unable to parse recipe from provided URL.")
