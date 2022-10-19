import React, { useContext } from "react";
import {
  Box,
  Center,
  Text,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import Header from "../Templates/header";
import slugify from "slugify";
import { graphql, Link, useStaticQuery } from "gatsby";
import { MyCart } from "./Store/Context";
import { Button } from "bootstrap";

const query = graphql`
  {
    allWcProducts {
      nodes {
        description
        id
        images {
          src
        }
        name
        price
        slug
      }
    }
  }
`;

function Shop() {
  const data = useStaticQuery(query);
  //console.log(data.allWcProducts.nodes);
  const mydata = data.allWcProducts.nodes;

  const { cart, setcart } = useContext(MyCart);
  //console.log(cart);

  return (
    <>
      <Header />
      <Container maxW={"7xl"} mt={8} mb={8}>
        <SimpleGrid columns={[1, null, 3]} spacing="40px">
          {mydata.slice(0, 8).map((item, key) => {
            const { name, images, price, description, slug } = item;
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
                      <Text color={"gray.500"}>{}</Text>
                      <Text color={"gray.500"}>
                        {description.replace(/(<([^>]+)>)/gi, "")}
                      </Text>
                      <Text color={"gray.500"}>${price}</Text>
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
    </>
  );
}

export default Shop;
