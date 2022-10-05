import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "gatsby";
import Header from "../../Templates/header";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [err, seterr] = useState("");

  function HandlEmail(event) {
    setemail(event.target.value);
  }
  const HandlPassword = (e) => {
    setpassword(e.target.value);
  };

  const HandleLoginform = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      let data = JSON.stringify({ email, password });
      alert(data);
      setemail("");
      setpassword("");
      seterr("");
    } else {
      seterr("Plese Enter Email** or Password**");
    }
  };

  return (
    <>
      <Header />
      <Flex
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack mx={"auto"} maxW={"lg"} py={5}>
          <Stack align={"center"}>
            <Heading fontSize={"3xl"}>Log In</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Log in on the internal platform
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <form action="#" onSubmit={HandleLoginform}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    placeholder=""
                    autoComplete="off"
                    onChange={HandlEmail}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={password}
                      placeholder=""
                      autoComplete="off"
                      onChange={HandlPassword}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Text mt={1} mb={1} style={{ color: "red" }}>
                  {err}
                </Text>
                <Stack spacing={7}>
                  <Button
                    type="submit"
                    name="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Log in
                  </Button>
                </Stack>
              </form>
              <Stack pt={1}>
                <Text align={"center"}>
                  New user?{" "}
                  <Link to="/auth/signup">
                    <Text as={"span"} color={"blue.400"}>
                      Signup
                    </Text>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
