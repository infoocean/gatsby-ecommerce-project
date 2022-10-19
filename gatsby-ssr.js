import React from "react";

const MyCart = require("./src/pages/Store/Context");

// Wraps every page in a component
const wrapPageElement = ({ element }) => {
  return <MyCart>{element}</MyCart>;
};

export default wrapPageElement;
