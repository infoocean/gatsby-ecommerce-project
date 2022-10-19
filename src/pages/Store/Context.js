import React, { createContext, useState } from "react";

export const MyCart = createContext();

function MyCartContextprovider({ children }) {
  const [cart, setcart] = useState([]);

  return (
    <>
      <MyCartContextprovider.Provider value={{ cart, setcart }}>
        {children}
      </MyCartContextprovider.Provider>
    </>
  );
}

export default MyCartContextprovider;
