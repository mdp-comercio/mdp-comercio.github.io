import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";

// Context that provides login functionalities
export const LoginContext = createContext(null);

const LoginProvider = (props) => {
  const navigate = useNavigate();

  const TOKEN_KEY = "mdb-token";
  const NAME_KEY = "mdb-username";

  const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
  const getToken = () => localStorage.getItem(TOKEN_KEY);
  const getName = () => localStorage.getItem(NAME_KEY);
  const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    navigate("/effecti");
  };
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate("/login");
  };

  return (
    <LoginContext.Provider
      value={{
        isAuthenticated,
        getToken,
        login,
        logout,
        getName,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
export default LoginProvider;