import React from "react";
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
import { graphql, useStaticQuery } from "gatsby";

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

const data1 = {
  jacket: [
    {
      label: "Front_Waist_Height",
      Front_Waist_Height_data: [
        { val1: 10 },
        { val2: 20 },
        { val3: 30 },
        { val4: 40 },
      ],
    },
    {
      label: "Back_length",
      Back_length: { val1: 10, val2: 20, val3: 30, val4: 40 },
    },
    {
      label: "Stomach",
      Stomachdata: { val1: 10, val2: 20, val3: 30, val4: 40 },
    },
    { label: "Neck", Neckdata: { val1: 10, val2: 20, val3: 30, val4: 40 } },
    {
      label: "Back_waist_height",
      Back_waist_height: { val1: 10, val2: 20, val3: 30, val4: 40 },
    },
    { label: "Waist", Waist: { val1: 10, val2: 20, val3: 30, val4: 40 } },
    {
      label: "Front_Shoulder",
      Front_Shoulder: { val1: 10, val2: 20, val3: 30, val4: 40 },
    },
    { label: "Bicep", Bicep: { val1: 10, val2: 20, val3: 30, val4: 40 } },
    {
      label: "Nape_to_waist",
      Nape_to_waist: { val1: 10, val2: 20, val3: 30, val4: 40 },
    },
    { label: "SleaveL", SleaveL: { val1: 10, val2: 20, val3: 30, val4: 40 } },
    { label: "SleeveR", SleeveR: { val1: 10, val2: 20, val3: 30, val4: 40 } },
    { label: "Seat", Seat: { val1: 10, val2: 20, val3: 30, val4: 40 } },
    { label: "Shoulder", Shoulder: { val1: 10, val2: 20, val3: 30, val4: 40 } },
    { label: "Chest", Chest: { val1: 10, val2: 20, val3: 30, val4: 40 } },
  ],
};
const datajacket = data1.jacket;

function Shop({ data }) {
  //console.log(data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  //const mydata = useStaticQuery(query);
  //console.log(mydata.wcProducts);
  //console.log(data.wcProducts);
  const myproductdet = data.wcProducts;
  // console.log(myproductdet);
  return (
    <>
      {/*header component*/}
      <Header />
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
            <Text>{myproductdet.description.replace(/(<([^>]+)>)/gi, "")}</Text>
            <Stack spacing={6} direction={"row"}>
              <Button
                px={6}
                colorScheme={"orange"}
                bg={"blue.400"}
                _hover={{ bg: "orange.500" }}
              >
                Add To Cart
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
                  {datajacket.map((item, key) => {
                    return (
                      <RadioGroup>
                        <Text fontSize="1xl">{item.label}</Text>
                        <Stack direction="row" mt={1}></Stack>
                      </RadioGroup>
                    );
                  })}
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack>
                  <RadioGroup>
                    <Text fontSize="1xl">U-rise</Text>
                    <Stack direction="row" mt={1}>
                      <Radio value="1">12</Radio>
                      <Radio value="2">13</Radio>
                      <Radio value="3">14</Radio>
                      <Radio value="4">15</Radio>
                    </Stack>
                  </RadioGroup>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Shop;
