class StringFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?:
    | string
    | {
        equals?: string;
        in?: string[];
        notIn?: string[];
        lt?: string;
        lte?: string;
        gt?: string;
        gte?: string;
        contains?: string;
        startsWith?: string;
        endsWith?: string;
      };
}

class StringListFilter {
  has?: string;
  hasEvery?: string[];
  hasSome?: string[];
}

class BooleanFilter {
  equals?: boolean;
  not?: boolean | { equals?: boolean };
}

class IntFilter {
  equals?: number;
  in?: number[];
  notIn?: number[];
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?:
    | number
    | {
        equals?: number;
        in?: number[];
        notIn?: number[];
        lt?: number;
        lte?: number;
        gt?: number;
        gte?: number;
      };
}

export class RecipeFilterDto {
  categories?: StringListFilter;
  cook_time?: StringFilter | null;
  created?: StringFilter;
  description?: StringFilter | null;
  difficulty?: StringFilter | null;
  directions?: StringFilter;
  hash?: StringFilter;
  image_url?: StringFilter | null;
  in_trash?: BooleanFilter;
  ingredients?: StringFilter;
  is_pinned?: BooleanFilter;
  name?: StringFilter;
  notes?: StringFilter | null;
  nutritional_info?: StringFilter;
  on_favorites?: BooleanFilter;
  on_grocery_list?: BooleanFilter | null;
  photo?: StringFilter | null;
  photo_hash?: StringFilter | null;
  photo_large?: StringFilter | null;
  photo_url?: StringFilter | null;
  prep_time?: StringFilter | null;
  rating?: IntFilter;
  scale?: StringFilter | null;
  servings?: StringFilter | null;
  source?: StringFilter;
  source_url?: StringFilter;
  total_time?: StringFilter | null;
  uid?: StringFilter;
  take?: number;
}
