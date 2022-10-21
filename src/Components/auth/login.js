import React, { useContext, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, navigate } from "gatsby";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usercontext } from "../Store/GlobalContextProvider";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showsnipper, setshowsnipper] = useState(false);

  const { isuser, setisuser } = useContext(usercontext);
  //console.log(isuser);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [err, seterr] = useState("");
  const showToastLoginSuccessMessage = () => {
    toast.success("User Login SuccessFully !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  function HandlEmail(event) {
    setemail(event.target.value);
  }
  const HandlPassword = (e) => {
    setpassword(e.target.value);
  };
  const HandleLoginform = async (e) => {
    setshowsnipper(true);
    e.preventDefault();
    if (email !== "" && password !== "") {
      let data = JSON.stringify({ email, password });
      //alert(data);
      try {
        const response = await fetch(
          "https://mynodeherokuappproject.herokuapp.com/wybrituserlogin",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: data,
          }
        );
        const res = await response.json();
        //console.log(res);
        if (response.status === 200) {
          setisuser({
            userid: res.userinfo._id,
            username: res.userinfo.firstname,
          });
          setemail("");
          setpassword("");
          seterr("");
          showToastLoginSuccessMessage();
          const redirectfn = () => {
            navigate("/");
          };
          setshowsnipper(false);
          setTimeout(() => {
            redirectfn();
          }, "3000");
        } else {
          seterr("Plese Enter Valid Email  or Password  ");
          setshowsnipper(false);
        }
      } catch (error) {
        //console.log(error);
      }
    } else {
      seterr("Plese Enter Email** or Password**");
      setshowsnipper(false);
    }
  };

  return (
    <>
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
                <FormControl id="password" mt={5}>
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
                <Stack spacing={7} mt={3}>
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
                    {showsnipper === true ? (
                      <Spinner
                        color="white.500"
                        size="sm"
                        style={{ marginLeft: "10px" }}
                      />
                    ) : (
                      ""
                    )}
                  </Button>
                </Stack>
              </form>
              <Stack pt={1}>
                <Text align={"center"}>
                  New user?{" "}
                  <Link to="/registrationpage">
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
      <ToastContainer />
    </>
  );
}
