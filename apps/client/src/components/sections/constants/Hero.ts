enum CategoryIcon {
  Breakfast = 'pan-frying',
  CrockPot = 'cauldron',
  Dinner = 'plate-utensils',
  Dessert = 'cupcake',
  Family = 'house-solid',
  FreezerMeals = 'refrigerator',
  InstantPot = 'wand-magic-sparkles',
  Lunch = 'clock-twelve',
  TraderJoes = 'store-solid',
}

export interface CategoryVm {
  icon: string;
  title: string;
  key: number;
}

export interface HeroVm {
  categories: CategoryVm[];
}

export interface CategoryName {
  name: string;
  key: number;
}

const addSpacesToString = (str: string): string =>
  str.replace(/([a-z])([A-Z])/g, '$1 $2');

export const categoryNames: CategoryName[] = Object.keys(CategoryIcon).map(
  (key, index) => ({
    name: key,
    key: index,
  }),
);

export const categoryVm: CategoryVm[] = categoryNames.map((categoryName) => ({
  icon: CategoryIcon[categoryName.name as keyof typeof CategoryIcon],
  title: addSpacesToString(categoryName.name),
  key: categoryName.key,
}));

export const heroVm: HeroVm = {
  categories: categoryVm,
};
