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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  let cart_ids = [];
  cart.map((item) => {
    cart_ids.push(item.id);
  });

  const showaddtocartSuccessMessage = () => {
    toast.success("item added to cart", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  function addtocart(item) {
    setcart([...cart, item]);
    showaddtocartSuccessMessage();
  }

  return (
    <>
      <Container maxW={"7xl"} mt={8} mb={8}>
        <SimpleGrid columns={[1, null, 3]} spacing="40px">
          {mydata.slice(0, 8).map((item, key) => {
            const { name, images, price, description, categories, slug, id } =
              item;
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

                      {!cart_ids.includes(id) ? (
                        <div>
                          {price ? (
                            <Button
                              style={{ width: "100%" }}
                              colorScheme="orange"
                              onClick={() => addtocart(item)}
                            >
                              add to cart
                            </Button>
                          ) : (
                            <Button
                              style={{ width: "100%" }}
                              colorScheme="orange"
                            >
                              add to cart
                            </Button>
                          )}
                        </div>
                      ) : (
                        <Link to="/cart/productcartdet">
                          <Button
                            style={{ width: "100%" }}
                            colorScheme="orange"
                          >
                            go to cart
                          </Button>
                        </Link>
                      )}
                    </Stack>
                  </Box>
                </Center>
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
      <ToastContainer />
    </>
  );
}

export default Shopcomp;
