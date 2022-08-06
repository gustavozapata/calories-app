import axios from "axios";

const local_url = "http://localhost:4000/api/v1";
export const nutritionix_url =
  "https://trackapi.nutritionix.com/v2/search/instant";

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

export default axiosProtect;
