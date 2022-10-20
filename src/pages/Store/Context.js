import React, { createContext, useState } from "react";

export const MyCart = createContext();

function CartContext({ children }) {
  const [cart, setcart] = useState([]);
  //console.log(cart);
  return (
    <>
      <MyCart.Provider value={{ cart, setcart }}>{children}</MyCart.Provider>
    </>
  );
}

export default CartContext;
