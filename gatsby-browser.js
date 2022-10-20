import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@popperjs/core/dist/umd/popper.min.js";

import Cartstore from "./src/Components/Store/GlobalContextProvider";

export const wrapRootElement = ({ element }) => {
  return <Cartstore>{element}</Cartstore>;
};
