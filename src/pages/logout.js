import { navigate } from "gatsby";
import React, { useContext } from "react";
import {
  cartContext,
  usercontext,
} from "../Components/Store/GlobalContextProvider";

function Logout() {
  const { isuser, setisuser } = useContext(usercontext);
  const { cart, setcart } = useContext(cartContext);
  if (isuser.username) {
    setisuser([]);
    setcart([]);
    navigate("/loginpage");
  }
  return <></>;
}

export default Logout;
