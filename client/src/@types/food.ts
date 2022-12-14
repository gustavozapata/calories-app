export type Food = {
  _id?: string;
  name: string;
  calories: string;
  date: string;
  user?: {
    _id?: string;
    name?: string;
  };
};

export type NutritionixFood = {
  food_name: string;
  nf_calories: number;
  photo: {
    thumb: string;
  };
};
