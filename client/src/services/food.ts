import axiosProtect, { url } from ".";

export const apiGetFoods = async (id: string) => {
  try {
    const foods = await axiosProtect.get(`${url}/food/${id}`);
    return foods.data.data;
  } catch (e) {
    throw e;
  }
};
