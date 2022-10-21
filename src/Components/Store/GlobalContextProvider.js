import React from "react";
import { createContext, useState } from "react";

export const cartContext = createContext();
export const usercontext = createContext();

function Cartstore({ children }) {
  const [cart, setcart] = useState([]);
  const [isuser, setisuser] = useState([]);
  return (
    <cartContext.Provider value={{ cart, setcart }}>
      <usercontext.Provider value={{ isuser, setisuser }}>
        {children}
      </usercontext.Provider>
    </cartContext.Provider>
  );
}

export default Cartstore;
