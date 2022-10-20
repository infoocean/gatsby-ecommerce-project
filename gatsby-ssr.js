import React from "react";

import Cartstore from "./src/Components/Store/GlobalContextProvider";

export const wrapRootElement = ({ element }) => {
  return <Cartstore>{element}</Cartstore>;
};
