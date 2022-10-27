import React from "react";
import { createContext, useState } from "react";

export const cartContext = createContext();
export const usercontext = createContext();
export const orderid = createContext();
export const receipt = createContext();

function Cartstore({ children }) {
  const [cart, setcart] = useState([]);
  const [isuser, setisuser] = useState([]);
  const [order_id, setorder_id] = useState(0);
  const [payreceipt, setpayreceipt] = useState("");
  return (
    <cartContext.Provider value={{ cart, setcart }}>
      <usercontext.Provider value={{ isuser, setisuser }}>
        <orderid.Provider value={{ order_id, setorder_id }}>
          <receipt.Provider value={{ payreceipt, setpayreceipt }}>
            {children}
          </receipt.Provider>
        </orderid.Provider>
      </usercontext.Provider>
    </cartContext.Provider>
  );
}

export default Cartstore;
