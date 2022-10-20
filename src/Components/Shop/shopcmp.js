import React, { useContext } from "react";
import {
  Box,
  Center,
  Text,
  Container,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import slugify from "slugify";
import { graphql, Link, useStaticQuery } from "gatsby";
import { cartContext } from "../Store/GlobalContextProvider";
const query = graphql`
  {
    allWcProducts {
      nodes {
        description
        id
        images {
          src
        }
        categories {
          name
        }
        name
        price
        slug
      }
    }
  }
`;
function Shopcomp() {
  const data = useStaticQuery(query);
  const mydata = data.allWcProducts.nodes;
  const { cart, setcart } = useContext(cartContext);
  return (
    <>
      <Container maxW={"7xl"} mt={8} mb={8}>
        <SimpleGrid columns={[1, null, 3]} spacing="40px">
          {mydata.slice(0, 8).map((item, key) => {
            const { name, images, price, description, categories, slug } = item;
            const slugTitle = slugify(slug, { lower: true });
            return (
              <Box>
                <Center py={6}>
                  <Box
                    maxW={"445px"}
                    w={"full"}
                    boxShadow={"2xl"}
                    rounded={"md"}
                    p={6}
                    overflow={"hidden"}
                  >
                    <Link to={`/product/${slugTitle}`}>
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
                      {price ? (
                        <Button
                          colorScheme="orange"
                          onClick={() => setcart([...cart, item])}
                        >
                          add to cart
                        </Button>
                      ) : (
                        <Button colorScheme="orange">add to cart</Button>
                      )}
                    </Stack>
                  </Box>
                </Center>
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
    </>
  );
}

export default Shopcomp;
