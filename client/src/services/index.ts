import axios from "axios";

const local_url = "http://localhost:4000/api/v1";
export const nutritionix_url = "https://trackapi.nutritionix.com/v2";

export const url =
  process.env.NODE_ENV === "development" ? local_url : local_url;
console.log(process.env.NODE_ENV);

const axiosProtect = axios.create({
  baseURL: url,
});

axiosProtect.interceptors.request.use((config: any) => {
  let token = localStorage.getItem("token");
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

export const axiosNutritionix = axios.create({
  baseURL: nutritionix_url,
});

axiosNutritionix.interceptors.request.use((config: any) => {
  config.headers["x-app-id"] = process.env.REACT_APP_NUTRITIONIX_APP_ID;
  config.headers["x-app-key"] = process.env.REACT_APP_NUTRITIONIX_API_KEY;
  return config;
});

export default axiosProtect;
