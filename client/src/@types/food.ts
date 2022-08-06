export type Food = {
  _id: string;
  name: string;
  calories: number;
  date: string;
};

export type NutritionixFood = {
  food_name: string;
  nf_calories: number;
  photo: {
    thumb: string;
  };
};
