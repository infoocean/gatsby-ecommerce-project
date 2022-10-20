import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@popperjs/core/dist/umd/popper.min.js";

const CartContext = require("./src/pages/Store/Context");

const wrapPageElement = ({ element }) => {
  return <CartContext>{element}</CartContext>;
};

export default wrapPageElement;
