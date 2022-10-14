import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import Header from "../Templates/header";
import LandingPage from "./Homepagecomp/LandingPage";
import BestsellerProducts from "./Homepagecomp/OurBestsellerproducts";
import CartContext from "./Store/Context";

const IndexPage = () => {
  return (
    <CartContext>
      <ChakraProvider>
        {/*header part*/}
        <Header />
        {/*landing page*/}
        <LandingPage />
        {/*best seller products*/}
        <BestsellerProducts />
      </ChakraProvider>
    </CartContext>
  );
};

export default IndexPage;
export const Head = () => <title>Home Page</title>;
