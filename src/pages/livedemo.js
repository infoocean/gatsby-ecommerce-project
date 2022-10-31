import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import { useContext } from "react";
import Layout from "../Components/Layout";
import { cartContext } from "../Components/Store/GlobalContextProvider";

const query = graphql`
  {
    allWcProducts {
      totalCount
      nodes {
        id
        images {
          alt
          name
          src
        }
        name
        price
        regular_price
        sale_price
        slug
        categories {
          name
        }
        description
      }
    }
  }
`;

function Livedemo() {
  const data = useStaticQuery(query);
  const mydata = data.allWcProducts.nodes;
  const { cart, setcart } = useContext(cartContext);
  return (
    <>
      <Layout />
      <Box>
        <Container maxW={"7xl"} py={5} as={Stack}>
          <Stack spacing={0} align={"center"}>
            <Heading>Our Best Seller Suit & Trousers</Heading>
            <Text>We have been working with clients around the world</Text>
          </Stack>
          <SimpleGrid columns={[1, null, 3]} spacing="40px">
            {mydata.slice(0, 8).map((item, key) => {
              const { name, images, price, description, slug, categories, id } =
                item;
              return (
                <Box>
                  <Center py={2}>
                    <Box
                      maxW={"445px"}
                      w={"full"}
                      boxShadow={"2xl"}
                      rounded={"md"}
                      p={4}
                      overflow={"hidden"}
                    >
                      <Link to={`/product/${slug}`}>
                        <Box h={"210px"} bg={"gray.100"}>
                          <Image
                            style={{ width: "100%", height: "100%" }}
                            src={images && images[0] && images[0].src}
                            layout={"fill"}
                          />
                        </Box>
                      </Link>
                      <Stack mt={5}>
                        <Heading fontSize={"2xl"} fontFamily={"body"} mt={1}>
                          {name}
                        </Heading>
                        {description ? (
                          <Text color={"gray.500"}>
                            {description.replace(/(<([^>]+)>)/gi, "")}
                          </Text>
                        ) : (
                          ""
                        )}
                        {categories ? (
                          <Text color={"gray.500"}>
                            Categories:{" "}
                            {categories && categories[0] && categories[0].name}
                          </Text>
                        ) : (
                          ""
                        )}

                        {price ? (
                          <Text color={"gray.500"}>Price: ${price}</Text>
                        ) : (
                          ""
                        )}
                        <Button
                          colorScheme="orange"
                          onClick={() => setcart([...cart, item])}
                        >
                          add to cart
                        </Button>
                      </Stack>
                    </Box>
                  </Center>
                </Box>
              );
            })}
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}

export default Livedemo;
