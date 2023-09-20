enum Icon {
  Breakfast = 'pan-frying.svg',
  CrockPot = 'cauldron.svg',
  Dinner = 'plate-utensils.svg',
  Dessert = 'cupcake.svg',
  Family = 'house-solid.svg',
  FreezerMeals = 'refrigerator.svg',
  InstantPot = 'wand-magic-sparkles.svg',
  Lunch = 'clock-twelve.svg',
  TraderJoes = 'store-solid.svg',
  Seafood = 'fish.svg',
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
