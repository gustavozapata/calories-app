import axios from "axios";
import React, { createContext, useReducer } from "react";
import { url } from "../services";
import { User } from "../@types/user";
import { Food } from "../@types/food";
import {
  apiAddFood,
  apiDeleteFood,
  apiEditFood,
  apiGetFoods,
  apiUpdateCalorieLimit,
} from "../services/food";

const user: User = {
  _id: "",
  name: "",
  email: "",
  role: "user",
  calorieLimit: 0,
};

interface AppContextInterface {
  isLoggedIn: boolean;
  user: User;
  toke: string;
  foodEntries: Array<Food>;
  serverMessage: string;
  handleLogin: (
    email: string,
    password: string,
    callback: (l: boolean) => void
  ) => void;
  handleSignup: (body: object, callback: (l: boolean) => void) => void;
  handleLogout: () => void;
  handleAddFood: (body: Food, id: string) => void;
  handleEditFood: (body: Food, id: string) => void;
  handleDeleteFood: (id: string) => void;
  updateCalorieLimit: (
    user: string,
    calorieLimit: string,
    callback: (l: boolean) => void
  ) => void;
  loadInitialData: () => void;
}

const initialState: AppContextInterface = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn") || "false"),
  user: JSON.parse(localStorage.getItem("user") || "{}") || (user as User),
  toke: localStorage.getItem("token") || "",
  foodEntries: [],
  serverMessage: "",
  handleLogin: () => {},
  handleSignup: () => {},
  handleLogout: () => {},
  handleAddFood: () => {},
  handleEditFood: () => {},
  handleDeleteFood: () => {},
  updateCalorieLimit: () => {},
  loadInitialData: () => {},
};

const AppContext = createContext(initialState);

const appReducer = (
  state: AppContextInterface,
  action: {
    type: string;
    payload?: any;
  }
) => {
  switch (action.type) {
    case "login":
      const { _id, name, email, role, calorieLimit } = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        user: {
          _id,
          name,
          email,
          role,
          calorieLimit,
        },
      };
    case "logout":
      localStorage.setItem("user", JSON.stringify({}));
      localStorage.setItem("token", "");
      localStorage.setItem("isLoggedIn", JSON.stringify(false));
      return {
        ...state,
        isLoggedIn: false,
        token: "",
        user: user,
        foodEntries: [],
      };
    case "setFoodEntries":
      return {
        ...state,
        foodEntries: action.payload,
      };
    case "addFoodEntry":
      return {
        ...state,
        foodEntries: [...state.foodEntries, action.payload],
      };
    case "editFoodEntry":
      const index = state.foodEntries.findIndex(
        (entry) => entry._id === action.payload._id
      );
      state.foodEntries[index] = action.payload;
      return {
        ...state,
        foodEntries: [...state.foodEntries],
      };
    case "deleteFoodEntry":
      return {
        ...state,
        foodEntries: state.foodEntries.filter(
          (entry) => entry._id !== action.payload
        ),
      };
    case "updateCalorieLimit":
      const updateUser = JSON.parse(localStorage.getItem("user") || "{}");
      updateUser.calorieLimit = action.payload;
      localStorage.setItem("user", JSON.stringify(updateUser));
      return {
        ...state,
        user: {
          ...state.user,
          calorieLimit: action.payload,
        },
      };
    case "setServerMessage":
      return {
        ...state,
        serverMessage: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const handleLogin = (
    email: string,
    password: string,
    callback: (l: boolean) => void
  ) => {
    axios
      .post(`${url}/auth/login`, { email, password })
      .then((res) => {
        dispatch({ type: "login", payload: res.data.data });
        callback(true);
      })
      .catch((err) => {
        handleServerMessage(err);
        callback(false);
      });
  };

  const handleSignup = (body: object, callback: (l: boolean) => void) => {
    axios
      .post(`${url}/auth/signup`, { ...body })
      .then((res) => {
        dispatch({ type: "login", payload: res.data.data });
        callback(true);
      })
      .catch((err) => {
        handleServerMessage(err);
        callback(false);
      });
  };

  const handleLogout = () => {
    dispatch({ type: "logout" });
  };

  const handleServerMessage = (err: any) => {
    dispatch({
      type: "setServerMessage",
      payload: err.response.data.message,
    });
    setTimeout(() => {
      dispatch({
        type: "setServerMessage",
        payload: "",
      });
    }, 2500);
  };

  const loadInitialData = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const foodEntries = await apiGetFoods(currentUser._id);
      dispatch({
        type: "setFoodEntries",
        payload: foodEntries,
      });
    } catch (err: any) {
      if (err.response.status === 403) {
        handleServerMessage(err);
      }
    }
  };

  const handleAddFood = async (body: Food, id: string) => {
    try {
      const newFood = await apiAddFood(body, id);
      dispatch({
        type: "addFoodEntry",
        payload: newFood,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditFood = async (body: Food, id: string) => {
    try {
      const updatedFood = await apiEditFood(body, id);
      dispatch({
        type: "editFoodEntry",
        payload: updatedFood,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteFood = async (id: string) => {
    try {
      const deletedFoodId = await apiDeleteFood(id);
      dispatch({
        type: "deleteFoodEntry",
        payload: deletedFoodId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const updateCalorieLimit = async (
    user: string,
    calorieLimit: string,
    callback: (l: boolean) => void
  ) => {
    try {
      const updatedUser = await apiUpdateCalorieLimit(user, calorieLimit);
      dispatch({
        type: "updateCalorieLimit",
        payload: updatedUser.calorieLimit,
      });
      callback(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleLogin,
        handleSignup,
        handleLogout,
        handleAddFood,
        handleEditFood,
        handleDeleteFood,
        updateCalorieLimit,
        loadInitialData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
