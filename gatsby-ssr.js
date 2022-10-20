import React from "react";

const CartContext = require("./src/pages/Store/Context");

// Wraps every page in a component
const wrapPageElement = ({ element }) => {
  return <CartContext>{element}</CartContext>;
};

export default wrapPageElement;
