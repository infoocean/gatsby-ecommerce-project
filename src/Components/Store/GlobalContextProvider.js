import React from "react";
import { createContext, useState } from "react";

export const cartContext = createContext();

function Cartstore({ children }) {
  const [cart, setcart] = useState([]);
  return (
    <cartContext.Provider value={{ cart, setcart }}>
      {children}
    </cartContext.Provider>
  );
}

export default Cartstore;
