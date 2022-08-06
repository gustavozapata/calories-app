import axios from "axios";
import React, { createContext, useReducer } from "react";
import { url } from "../services";
import { User } from "../@types/user";
import { Food } from "../@types/food";
import { apiGetFoods } from "../services/food";
// import axiosProtect from "../services";

const user: User = {
  _id: "",
  name: "",
  email: "",
  role: "user",
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
      const { _id, name, email, role } = action.payload.user;
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
      };
    case "setFoodEntries":
      return {
        ...state,
        foodEntries: action.payload,
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

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleLogin,
        handleSignup,
        handleLogout,
        loadInitialData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
