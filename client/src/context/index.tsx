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
import { addHours } from "../utils";

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
  filteredEntries: Array<Food>;
  filterApplied: boolean;
  serverMessage: string;
  fromDate: string;
  toDate: string;
  setFromDate: (date: string) => void;
  setToDate: (date: string) => void;
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
  handleClearFilter: () => void;
  filterEntriesByDate: (fromDate: string, toDate: string) => void;
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
  filteredEntries: [],
  filterApplied: false,
  serverMessage: "",
  fromDate: "",
  toDate: "",
  setFromDate: () => {},
  setToDate: () => {},
  handleLogin: () => {},
  handleSignup: () => {},
  handleLogout: () => {},
  handleAddFood: () => {},
  handleEditFood: () => {},
  handleDeleteFood: () => {},
  handleClearFilter: () => {},
  filterEntriesByDate: () => {},
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
        filteredEntries: [],
        filterApplied: false,
        fromDate: "",
        toDate: "",
      };
    case "setFoodEntries":
      action.payload = action.payload.map((entry: Food) => {
        entry.date = addHours(new Date(entry.date), 1).toISOString();
        return entry;
      });
      return {
        ...state,
        foodEntries: action.payload,
      };
    case "setFilteredEntries":
      return {
        ...state,
        filteredEntries: action.payload,
        filterApplied: true,
      };
    case "clearFilteredEntries":
      return {
        ...state,
        filteredEntries: action.payload,
        filterApplied: false,
        fromDate: "",
        toDate: "",
      };
    case "addFoodEntry":
      action.payload.date = addHours(action.payload.date, 1).toISOString();
      return {
        ...state,
        foodEntries: [...state.foodEntries, action.payload].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
      };
    case "editFoodEntry":
      const index = state.foodEntries.findIndex(
        (entry) => entry._id === action.payload._id
      );
      state.foodEntries[index] = action.payload;
      action.payload.date = addHours(action.payload.date, 1).toISOString();
      return {
        ...state,
        foodEntries: [...state.foodEntries].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
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
    case "setFromDate":
      return {
        ...state,
        fromDate: action.payload,
      };
    case "setToDate":
      return {
        ...state,
        toDate: action.payload,
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

  const filterEntriesByDate = (fromDate: string, toDate: string) => {
    const filteredEntries = state.foodEntries.filter((entry: Food) => {
      let date = new Date(entry.date).toISOString().split("T")[0];
      if (
        new Date(date) >= new Date(fromDate) &&
        new Date(date) <= new Date(toDate)
      ) {
        return entry;
      }
      return null;
    });
    dispatch({
      type: "setFilteredEntries",
      payload: filteredEntries,
    });
  };

  const handleClearFilter = () => {
    dispatch({
      type: "clearFilteredEntries",
      payload: [],
    });
  };
  const setFromDate = (value: string) => {
    dispatch({
      type: "setFromDate",
      payload: value,
    });
  };
  const setToDate = (value: string) => {
    dispatch({
      type: "setToDate",
      payload: value,
    });
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
        setFromDate,
        setToDate,
        updateCalorieLimit,
        filterEntriesByDate,
        handleClearFilter,
        loadInitialData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
