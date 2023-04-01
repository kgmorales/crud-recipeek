export type Nutrients = { string: string };

export interface ScrapedRecipe {
	author?: string;
	canonical_url: string;
  category: string;
  cook_time?: number;
  description?: string;
	host?: string;
  image?: string;
  ingredients: string[];
	instructions: string;
	instructions_list: string[];
	language: string;
  nutrients?: Nutrients;
  prep_time?: number;
  ratings?: number;
	site_name: string;
	title: string;
	total_time?: number;
	yields?: string;
}
