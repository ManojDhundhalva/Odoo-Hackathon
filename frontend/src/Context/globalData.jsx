import React, { createContext, useContext } from "react";

const globalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const users = [
    { username: "user1", type: "type1" },
    { username: "user2", type: "type2" },
    { username: "user3", type: "type3" },
    { username: "user4", type: "type4" },
    { username: "user5", type: "type5" },
    { username: "user6", type: "type6" },
    { username: "user7", type: "type7" },
    { username: "user8", type: "type8" },
    { username: "user9", type: "type9" },
    { username: "user10", type: "type10" },
  ];

  return (
    <globalContext.Provider value={{ users }}>
      {children}
    </globalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(globalContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
