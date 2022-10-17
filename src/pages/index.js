import { ChakraProvider } from "@chakra-ui/react";
import React, { useContext } from "react";
import Header from "../Templates/header";
import LandingPage from "./Homepagecomp/LandingPage";
import BestsellerProducts from "./Homepagecomp/OurBestsellerproducts";
import CartContext from "./Store/Context";

const IndexPage = () => {
  return (
    <ChakraProvider>
      <CartContext>
        {/*header part*/}
        <Header />
        {/*landing page*/}
        <LandingPage />
        {/*best seller products*/}
        <BestsellerProducts />
      </CartContext>
    </ChakraProvider>
  );
};

export default IndexPage;
export const Head = () => <title>Home Page</title>;
