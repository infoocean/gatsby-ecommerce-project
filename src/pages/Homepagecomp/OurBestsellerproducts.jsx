import React from "react";
import {
  Box,
  Center,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import { graphql, Link, useStaticQuery } from "gatsby";

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
      }
    }
  }
`;

function BestsellerProducts() {
  const data = useStaticQuery(query);
  //console.log(data.allWcProducts.nodes);
  const mydata = data.allWcProducts.nodes;
  return (
    <>
      <Box>
        <Container maxW={"7xl"} py={5} as={Stack} >
          <Stack spacing={0} align={"center"}>
            <Heading>Our Best Seller Suit & Trousers</Heading>
            <Text>We have been working with clients around the world</Text>
          </Stack>
          <SimpleGrid columns={[1, null, 3]} spacing="40px">
            {mydata.slice(0, 8).map((item, key) => {
              const { name, images, price, description, id } = item;
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
                      <Link to={`/product/productdet/${id}`}>
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
                        <Text color={"gray.500"}>Blue Checked</Text>
                        <Text color={"gray.500"}>{}</Text>
                        <Text color={"gray.500"}>
                          {description.replace(/(<([^>]+)>)/gi, "")}
                        </Text>
                        <Text color={"gray.500"}>${price}</Text>
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

export default BestsellerProducts;
