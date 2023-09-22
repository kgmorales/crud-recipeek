enum Icon {
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

export const HeroVm: HeroVm = {
  categories: [
    ...Object.entries(Icon).map(([key, value], i) => ({
      icon: value,
      title: key.replace(/([a-z])([A-Z])/g, '$1 $2'),
      key: i,
    })),
  ],
};
