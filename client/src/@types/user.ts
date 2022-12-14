export type User = {
  _id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  calorieLimit: number;
};
