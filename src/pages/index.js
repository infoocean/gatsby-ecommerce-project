import { ChakraProvider } from "@chakra-ui/react";
import React, { useContext } from "react";
import Header from "../Templates/header";
import LandingPage from "./Homepagecomp/LandingPage";
import BestsellerProducts from "./Homepagecomp/OurBestsellerproducts";
import { MyCart } from "./Store/Context";

const IndexPage = () => {
  // const { cart, setcart } = useContext(MyCart);
  // console.log(cart);

  return (
    <ChakraProvider>
      {/*header part*/}
      <Header />
      {/*landing page*/}
      <LandingPage />
      {/*best seller products*/}
      <BestsellerProducts />
    </ChakraProvider>
  );
};

export default IndexPage;
export const Head = () => <title>Home Page</title>;
