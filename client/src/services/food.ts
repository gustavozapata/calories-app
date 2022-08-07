import axiosProtect, { url } from ".";
import { Food } from "../@types/food";

export const apiGetFoods = async (id: string) => {
  try {
    const foods = await axiosProtect.get(`${url}/food/${id}`);
    return foods.data.data;
  } catch (e) {
    throw e;
  }
};

export const apiAddFood = async (body: Food) => {
  try {
    const food = await axiosProtect.post(`${url}/food/${body.user}`, {
      ...body,
    });
    return food.data.data;
  } catch (e) {
    throw e;
  }
};
