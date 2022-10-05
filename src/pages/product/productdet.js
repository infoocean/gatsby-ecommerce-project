import React from "react";
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

function Productdet() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
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
            <Text>Price : $2000</Text>
            <Text>
              Long sleeves shirt appropriate for dressing up in a suite with or
              without a tie.
            </Text>
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
              <Text>Categories : Suit</Text>
            </Stack>
            <Stack>
              <Heading fontSize={"2xl"} mt={5}>
                Description
              </Heading>
              <Text>
                An incredibly beautiful business-ready light blue wide stripe.
                Made with ultra-premium certified West Indian Sea Island Cotton
                from Barbados, this twill has the perfect combination of
                durability, super soft hand, vibrant color, and silky luster.
                Known to many as the cashmere of cotton, Sea Island cotton
                represents just .0004% of the extra-long staple cotton produced
                in the world each year. It's woven with a remarkably smooth 100s
                2-ply construction in the perfect weight for year-round wear.
                The fabric is woven in Italy by the famed David &amp; John
                Anderson mill, and with a near 200-year heritage of making some
                of the world's finest shirting fabric, DJA is Albini's
                highest-end line. Learn more about premium Sea Island Cotton
                here.
              </Text>
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={
                "https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              }
              objectFit={"cover"}
            />
          </Flex>
        </SimpleGrid>
      </Container>
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
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Productdet;
