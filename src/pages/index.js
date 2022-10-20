import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import LandingPage from "../Components/Homepagecomp/LandingPage";
import BestsellerProducts from "../Components/Homepagecomp/OurBestsellerproducts";
import Layout from "../Components/Layout";

const IndexPage = () => {
  return (
    <ChakraProvider>
      <Layout>
        <LandingPage />
        <BestsellerProducts />
      </Layout>
    </ChakraProvider>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
