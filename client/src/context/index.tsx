import axios from "axios";
import React, { createContext, useReducer } from "react";
import { url } from "../services";
import { User } from "../@types";
// import axiosProtect from "../services";

const user: User = {
  id: "",
  name: "",
  email: "",
  role: "user",
};

interface AppContextInterface {
  isLoggedIn: boolean;
  user: User;
  serverMessage: string;
  handleLogin: (
    email: string,
    password: string,
    callback: (l: boolean) => void
  ) => void;
  handleSignup: (body: object, callback: (l: boolean) => void) => void;
  handleLogout: () => void;
}

const initialState: AppContextInterface = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn") || "false"),
  user: JSON.parse(localStorage.getItem("user") || "{}") || (user as User),
  serverMessage: "",
  handleLogin: () => {},
  handleSignup: () => {},
  handleLogout: () => {},
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
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      return {
        ...state,
        isLoggedIn: true,
        user: {
          id: _id,
          name: name,
          email: email,
          role: role,
        },
      };
    case "logout":
      localStorage.setItem("user", JSON.stringify({}));
      localStorage.setItem("isLoggedIn", JSON.stringify(false));
      return {
        ...state,
        isLoggedIn: false,
        user: user,
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

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleLogin,
        handleSignup,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
