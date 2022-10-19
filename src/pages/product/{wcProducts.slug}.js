import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
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

const jacket_data = [
  {
    labelname: "Front Waist Height",
    labelinfo: {
      name: "Front_Waist_Height",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Back length",
    labelinfo: {
      name: "Back_length",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Stomach",
    labelinfo: {
      name: "Stomach",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Neck",
    labelinfo: {
      name: "Neck",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Back waist height",
    labelinfo: {
      name: "Back_waist_height",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Waist",
    labelinfo: {
      name: "Waist",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: " Front Shoulder",
    labelinfo: {
      name: "Front_Shoulder",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Bicep",
    labelinfo: {
      name: "Bicep",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Nape to waist",
    labelinfo: {
      name: "Nape_to_waist",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "SleaveL",
    labelinfo: {
      name: "SleaveL",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "SleaveR",
    labelinfo: {
      name: "SleaveR",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Seat",
    labelinfo: {
      name: "Seat",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Shoulder",
    labelinfo: {
      name: "Shoulder",
      val: [12, 13, 14, 15],
    },
  },

  {
    labelname: "Chest",
    labelinfo: {
      name: "Chest",
      val: [12, 13, 14, 15],
    },
  },
];
const trouser_data = [
  {
    labelname: "U-rise",
    labelinfo: {
      name: "U_rise",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Calf girth",
    labelinfo: {
      name: "Calf_girth",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Front Waist Length",
    labelinfo: {
      name: "Front_Waist_Length",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Wrist(R)",
    labelinfo: {
      name: "WristR",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Back waist height",
    labelinfo: {
      name: "Back_waist_eight",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Wrist(L)",
    labelinfo: {
      name: "WristL",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: " Knee(Finished)",
    labelinfo: {
      name: "KneeFinished",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Waist",
    labelinfo: {
      name: "Waist",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Vest Back Length(Finished)",
    labelinfo: {
      name: "Vest_Back_LengthFinished",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Thigh",
    labelinfo: {
      name: "Thigh",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Front Waist Height",
    labelinfo: {
      name: "Front_Waist_Height",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Outseam (L)",
    labelinfo: {
      name: "OutseamL",
      val: [12, 13, 14, 15],
    },
  },
  {
    labelname: "Pant Bottom(Finished)",
    labelinfo: {
      name: "PantBottomFinished",
      val: [12, 13, 14, 15],
    },
  },

  {
    labelname: "Outseam (R)",
    labelinfo: {
      name: "OutseamR",
      val: [12, 13, 14, 15],
    },
  },
];

//console.log(jacket_data,trouser_data);

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
  const [isOpencart, setisOpencart] = useState(false);
  //const mydata = useStaticQuery(query);
  //console.log(mydata.wcProducts);
  //console.log(data.wcProducts);
  const myproductdet = data.wcProducts;
  //console.log(myproductdet);
  const slugTitle = slugify(myproductdet.slug, { lower: true });

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
  function handlejacketdata(e) {
    console.log("myjacketdata", myjacketdata);
  }
  function handletrouserdata(e) {
    console.log("myjacketdata", myjacketdata, "mytrouserdata", myjacketdata);
  }

  function setisOpenmycart() {
    setisOpencart(true);
  }

  return (
    <>
      {/*header component*/}
      <Header />
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
                // onClick={() => setcart([...cart, myproductdet])}
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
      {/*my model select size component*/}
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
                  {jacket_data.map((data, key) => {
                    return (
                      <RadioGroup>
                        <Text fontSize="1xl">{data.labelname}</Text>
                        <Stack direction="row" mt={1}>
                          {data &&
                            data.labelinfo &&
                            data.labelinfo.val.map((val, key) => {
                              return (
                                <Radio
                                  value={val}
                                  name={
                                    data &&
                                    data.labelinfo &&
                                    data.labelinfo.name
                                  }
                                  onChange={handljacket}
                                >
                                  {val}
                                </Radio>
                              );
                            })}
                        </Stack>
                      </RadioGroup>
                    );
                  })}
                </Stack>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handlejacketdata}>
                    Submit Jacket Size
                  </Button>
                </ModalFooter>
              </TabPanel>
              <TabPanel>
                <Stack>
                  {trouser_data.map((trtouseritem, key) => {
                    return (
                      <RadioGroup>
                        <Text fontSize="1xl">{trtouseritem.labelname}</Text>
                        <Stack direction="row" mt={1}>
                          {trtouseritem &&
                            trtouseritem.labelinfo &&
                            trtouseritem.labelinfo.val.map((tval, key) => {
                              return (
                                <Radio
                                  value={tval}
                                  onChange={handltrouser}
                                  name={trtouseritem.labelinfo.name}
                                >
                                  {tval}
                                </Radio>
                              );
                            })}
                        </Stack>
                      </RadioGroup>
                    );
                  })}

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
      {/*my model cart component*/}

      {isOpencart && (
        <Modal>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight="bold" mb="1rem">
                You can scroll the content behind the modal
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default Shop;
