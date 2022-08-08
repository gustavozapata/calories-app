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

export const apiAddFood = async (body: Food, id: string) => {
  delete body._id;
  try {
    const food = await axiosProtect.post(`${url}/food/${id}`, {
      ...body,
    });
    return food.data.data;
  } catch (e) {
    throw e;
  }
};

export const apiEditFood = async (body: Food, id: string) => {
  try {
    const food = await axiosProtect.patch(`${url}/food/${id}`, {
      ...body,
    });
    return food.data.data;
  } catch (e) {
    throw e;
  }
};

export const apiDeleteFood = async (id: string) => {
  try {
    await axiosProtect.delete(`${url}/food/${id}`);
    return id;
  } catch (e) {
    throw e;
  }
};

export const apiUpdateCalorieLimit = async (
  user: string,
  calorieLimit: string
) => {
  try {
    const food = await axiosProtect.patch(`${url}/users/${user}/calorieLimit`, {
      calorieLimit: parseFloat(calorieLimit),
    });
    return food.data.data;
  } catch (e) {
    throw e;
  }
};
