import React from "react";
import { Button, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import { Link } from "gatsby";

function LandingPage() {
  return (
    <>
      <Flex
        w={"full"}
        h={"55vh"}
        backgroundImage={
          "https://t4.ftcdn.net/jpg/02/31/18/05/360_F_231180575_TRhWzorCwok7l0h2IdH22yf7s8IDV9Yp.jpg"
        }
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
            <Text color={"white"} fontWeight={700} lineHeight={1.2}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
              eiusmod tempor
            </Text>
            <Stack direction={"row"}>
              <Link to="/shop">
                <Button
                  bg={"blue.400"}
                  rounded={"full"}
                  color={"white"}
                  _hover={{ bg: "blue.500" }}
                >
                  Visit Our Shop
                </Button>
              </Link>
              <Button
                bg={"whiteAlpha.300"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "whiteAlpha.500" }}
              >
                Contact us
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    </>
  );
}

export default LandingPage;
