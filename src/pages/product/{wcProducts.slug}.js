import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Header from "../../Templates/header";
import { graphql, Link, useStaticQuery } from "gatsby";
import slugify from "slugify";

export const query = graphql`
  query ($slug: String) {
    wcProducts(slug: { eq: $slug }) {
      slug
      price
      name
      id
      categories {
        name
        slug
        description
      }
      description
      featured
      images {
        name
        src
        alt
      }
    }
  }
`;

function Shop({ data }) {
  //console.log(data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  //const mydata = useStaticQuery(query);
  //console.log(mydata.wcProducts);
  //console.log(data.wcProducts);
  const myproductdet = data.wcProducts;
  //console.log(myproductdet);
  const slugTitle = slugify(myproductdet.slug, { lower: true });
  const [cart, setcart] = useState([]);

  function submitjacketsize(e) {
    //alert(e.target.name);
  }

  let mytrouserdata = [];
  function handltrouser(e) {
    //alert(e.target.value);
    //alert(e.target.name);
    mytrouserdata[e.target.name] = e.target.value;
    //console.log(mytrouserdata);
  }

  let myjacketdata = [];
  function handljacket(e) {
    //alert(e.target.value);
    //alert(e.target.name);
    myjacketdata[e.target.name] = e.target.value;
    //console.log(myjacketdata);
  }

  function handletrouserdata(e) {
    console.log("myjacketdata", myjacketdata, "mytrouserdata", myjacketdata);
  }

  return (
    <>
      {/*header component*/}
      <Header cart={cart} />
      {/*product det component*/}
      <Container maxW={"5xl"} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"blue.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("blue.50", "blue.900")}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              Grey Classic
            </Text>
            <Text>Price : ${myproductdet.price}</Text>
            <Text>{myproductdet.name}</Text>
            <Stack spacing={6} direction={"row"}>
              <Button
                px={6}
                colorScheme={"orange"}
                bg={"blue.400"}
                _hover={{ bg: "orange.500" }}
                onClick={() => setcart([...cart, myproductdet])}
              >
                Add To Cart
              </Button>
              <Button
                colorScheme={"orange"}
                bg={"blue.400"}
                _hover={{ bg: "orange.500" }}
                px={6}
              >
                <Link to={`/productbyslug/${slugTitle}`}>Buy Now</Link>
              </Button>

              <Button
                colorScheme={"orange"}
                bg={"blue.400"}
                _hover={{ bg: "orange.500" }}
                px={6}
                onClick={onOpen}
              >
                Select Size
              </Button>
            </Stack>
            <Stack>
              <Text>SKU : BLUEWYRSS21001-1-2-1-1</Text>
              <Text>
                Categories :{" "}
                {myproductdet &&
                  myproductdet.categories &&
                  myproductdet.categories[0] &&
                  myproductdet.categories[0].name}
              </Text>
            </Stack>
            <Stack>
              <Heading fontSize={"2xl"} mt={5}>
                Description
              </Heading>
              <Text>
                {myproductdet.description.replace(/(<([^>]+)>)/gi, "")}
              </Text>
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={
                myproductdet.images &&
                myproductdet.images[0] &&
                myproductdet.images[0].src
              }
              objectFit={"cover"}
            />
          </Flex>
        </SimpleGrid>
      </Container>
      {/*my model component*/}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Your Size</ModalHeader>
          <ModalCloseButton />
          <hr />
          <Tabs p={3}>
            <TabList>
              <Tab>Jacket</Tab>
              <Tab>Trowser</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack>
                  <RadioGroup>
                    <Text fontSize="1xl">Front Waist Height</Text>
                    <Stack direction="row" mt={1}>
                      <Radio
                        value="12"
                        name="front_weist_height"
                        onChange={handljacket}
                      >
                        12
                      </Radio>
                      <Radio
                        value="13"
                        name="frontweistheight"
                        onChange={handljacket}
                      >
                        13
                      </Radio>
                      <Radio
                        value="14"
                        name="frontweistheight"
                        onChange={handljacket}
                      >
                        14
                      </Radio>
                      <Radio
                        value="15"
                        name="frontweistheight"
                        onChange={handljacket}
                      >
                        15
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <RadioGroup>
                    <Text fontSize="1xl">Back length </Text>
                    <Stack direction="row" mt={1}>
                      <Radio
                        value="12"
                        name="back_length"
                        onChange={handljacket}
                      >
                        12
                      </Radio>
                      <Radio
                        value="13"
                        name="back_length"
                        onChange={handljacket}
                      >
                        13
                      </Radio>
                      <Radio
                        value="14"
                        name="back_length"
                        onChange={handljacket}
                      >
                        14
                      </Radio>
                      <Radio
                        value="15"
                        name="back_length"
                        onChange={handljacket}
                      >
                        15
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <RadioGroup>
                    <Text fontSize="1xl">Stomach </Text>
                    <Stack direction="row" mt={1}>
                      <Radio value="12" name="stomach " onChange={handljacket}>
                        12
                      </Radio>
                      <Radio value="13" name="stomach" onChange={handljacket}>
                        13
                      </Radio>
                      <Radio value="14" name="stomach" onChange={handljacket}>
                        14
                      </Radio>
                      <Radio value="15" name="stomach" onChange={handljacket}>
                        15
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Stack>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={submitjacketsize}>
                    Submit Jacket Size
                  </Button>
                </ModalFooter>
              </TabPanel>
              <TabPanel>
                <Stack>
                  <RadioGroup>
                    <Text fontSize="1xl">U-rise</Text>
                    <Stack direction="row" mt={1}>
                      <Radio value="12" onChange={handltrouser} name="urise">
                        12
                      </Radio>
                      <Radio value="13" onChange={handltrouser} name="urise">
                        13
                      </Radio>
                      <Radio value="14" onChange={handltrouser} name="urise">
                        14
                      </Radio>
                      <Radio value="15" onChange={handltrouser} name="urise">
                        15
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <RadioGroup>
                    <Text fontSize="1xl">Calf girth</Text>
                    <Stack direction="row" mt={1}>
                      <Radio
                        value="12"
                        onChange={handltrouser}
                        name="calf_girth"
                      >
                        12
                      </Radio>
                      <Radio
                        value="13"
                        onChange={handltrouser}
                        name="calf_girth"
                      >
                        13
                      </Radio>
                      <Radio
                        value="14"
                        onChange={handltrouser}
                        name="calf_girth"
                      >
                        14
                      </Radio>
                      <Radio
                        value="15"
                        onChange={handltrouser}
                        name="calf_girth"
                      >
                        15
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <RadioGroup>
                    <Text fontSize="1xl">Front Waist Length</Text>
                    <Stack direction="row" mt={1}>
                      <Radio
                        value="12"
                        onChange={handltrouser}
                        name="front_waist_length"
                      >
                        12
                      </Radio>
                      <Radio
                        value="13"
                        onChange={handltrouser}
                        name="front_waist_length"
                      >
                        13
                      </Radio>
                      <Radio
                        value="14"
                        onChange={handltrouser}
                        name="front_waist_length"
                      >
                        14
                      </Radio>
                      <Radio
                        value="15"
                        onChange={handltrouser}
                        name="front_waist_length"
                      >
                        15
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={handletrouserdata}
                    >
                      Submit Trouser Size
                    </Button>
                  </ModalFooter>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Shop;
