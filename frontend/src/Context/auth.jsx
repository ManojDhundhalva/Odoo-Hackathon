import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    setIsLoggedIn(window.localStorage.getItem("token") !== null);
  }, []);

  const LogOut = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    if (
      !(
        window.localStorage.getItem("token") !== null
      )
    ) {
      window.localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/");
    }
  }, []);

  return (
    <authContext.Provider
      value={{
        theme,
        toggleTheme,
        isLoggedIn,
        setIsLoggedIn,
        LogOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
