from recipe_scrapers import scrape_me
import scrape_schema_recipe
from recipe_scrapers._utils import get_minutes
from recipe_scrapers import scrape_html
import json
import requests
import sys

def parse_recipe(recipe_url):
    try:
        recipe = scrape_schema_recipe.scrape_url(recipe_url)
        return recipe.to_json()
    except Exception as e:
        pass

    try:
        scraper = scrape_me(recipe_url, wild_mode=True)

        return scraper.to_json()
    except Exception as e:
        pass

    try:
        html = requests.get(recipe_url).content

        scraper = scrape_html(html=html, org_url=recipe_url)

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
        print("test-4")
        print("Unable to parse recipe from provided URL.")
