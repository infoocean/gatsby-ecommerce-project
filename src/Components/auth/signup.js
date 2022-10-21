import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
  Checkbox,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik } from "formik";
import { Link, navigate } from "gatsby";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showsnipper, setshowsnipper] = useState(false);
  const showToastregisterSuccessMessage = () => {
    toast.success("User Registration SuccessFully !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastEamilNumberValidation = () => {
    toast.success("This Email Or Number Allready Registred !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack mx={"auto"} maxW={"lg"} py={5}>
          <Stack align={"center"}>
            <Heading fontSize={"3xl"} textAlign={"center"}>
              Register
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Register on the internal platform
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <Formik
                initialValues={{
                  firstname: "",
                  lastname: "",
                  email: "",
                  number: "",
                  password: "",
                  address1: "",
                  address2: "",
                  country: "",
                  state: "",
                  city: "",
                }}
                validate={(values) => {
                  const errors = {};

                  if (!values.firstname) {
                    errors.firstname = "Required Feild **";
                  }

                  if (!values.lastname) {
                    errors.lastname = "Required Feild **";
                  }

                  if (!values.email) {
                    errors.email = "Required Feild **";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address **";
                  }

                  if (!values.number) {
                    errors.number = "Required Feild **";
                  }

                  if (!values.password) {
                    errors.password = "Required Feild **";
                  }

                  if (!values.address1) {
                    errors.address1 = "Required Feild **";
                  }

                  if (!values.country) {
                    errors.country = "Required Feild **";
                  }

                  if (!values.state) {
                    errors.state = "Required Feild **";
                  }
                  if (!values.city) {
                    errors.city = "Required Feild **";
                  }

                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setshowsnipper(true);
                  //console.log(values);
                  //alert(JSON.stringify(values, null, 2));
                  try {
                    const responce = await fetch(
                      "https://mynodeherokuappproject.herokuapp.com/wybrituserregistration",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                      }
                    );
                    const res = await responce.json();
                    //console.log(res);
                    if (responce.status === 201) {
                      setshowsnipper(false);
                      showToastregisterSuccessMessage();
                      const redirectfn = () => {
                        navigate("/loginpage");
                      };
                      setshowsnipper(false);
                      setTimeout(() => {
                        redirectfn();
                      }, "3000");
                    } else {
                      showToastEamilNumberValidation();
                      setshowsnipper(false);
                    }
                  } catch (error) {
                    console.error(error);
                    showToastEamilNumberValidation();
                  }
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>
                    <FormControl id="firstName">
                      <FormLabel>
                        First Name
                        <Text as={"span"} style={{ color: "red" }}>
                          *
                        </Text>
                      </FormLabel>
                      <Input
                        type="text"
                        name="firstname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstname}
                      />
                      <span
                        style={{
                          color: "red",
                          fontSize: "13px",
                          paddingBottom: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {errors.firstname &&
                          touched.firstname &&
                          errors.firstname}
                      </span>
                    </FormControl>
                    <FormControl id="lastName" mt={2}>
                      <FormLabel>
                        Last Name
                        <Text as={"span"} style={{ color: "red" }}>
                          *
                        </Text>
                      </FormLabel>
                      <Input
                        type="text"
                        name="lastname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastname}
                      />
                      <span
                        style={{
                          color: "red",
                          fontSize: "13px",
                          paddingBottom: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {errors.lastname && touched.lastname && errors.lastname}
                      </span>
                    </FormControl>
                    <FormControl id="email" mt={2}>
                      <FormLabel>
                        Email address
                        <Text as={"span"} style={{ color: "red" }}>
                          *
                        </Text>
                      </FormLabel>
                      <Input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <span
                        style={{
                          color: "red",
                          fontSize: "13px",
                          paddingBottom: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {errors.email && touched.email && errors.email}
                      </span>
                    </FormControl>
                    <FormControl id="number" mt={2}>
                      <FormLabel>
                        Mobile Number
                        <Text as={"span"} style={{ color: "red" }}>
                          *
                        </Text>
                      </FormLabel>
                      <Input
                        type="text"
                        name="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.number}
                        maxLength="10"
                        minLength="10"
                      />
                      <span
                        style={{
                          color: "red",
                          fontSize: "13px",
                          paddingBottom: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {errors.number && touched.number && errors.number}
                      </span>
                    </FormControl>
                    <FormControl id="password">
                      <FormLabel>
                        Password
                        <Text as={"span"} style={{ color: "red" }}>
                          *
                        </Text>
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
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
                      <span
                        style={{
                          color: "red",
                          fontSize: "13px",
                          paddingBottom: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {errors.password && touched.password && errors.password}
                      </span>
                    </FormControl>
                    <FormControl id="address1" mt={2}>
                      <FormLabel>
                        Address1
                        <Text as={"span"} style={{ color: "red" }}>
                          *
                        </Text>
                      </FormLabel>
                      <Input
                        type="text"
                        name="address1"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address1}
                      />
                      <span
                        style={{
                          color: "red",
                          fontSize: "13px",
                          paddingBottom: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {errors.address1 && touched.address1 && errors.address1}
                      </span>
                    </FormControl>
                    <FormControl id="address2" mt={2}>
                      <FormLabel>Address2 </FormLabel>
                      <Input
                        type="text"
                        name="address2"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address2}
                      />
                    </FormControl>
                    <FormControl id="country" mt={2}>
                      <FormLabel>
                        Country
                        <Text as={"span"} style={{ color: "red" }}>
                          *
                        </Text>
                      </FormLabel>
                      <Select
                        placeholder="Select option"
                        name="country"
                        value={values.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="India">India</option>
                        <option value="Japan">Japan</option>
                        <option value="US">US</option>
                      </Select>
                      <span
                        style={{
                          color: "red",
                          fontSize: "13px",
                          paddingBottom: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {errors.country && touched.country && errors.country}
                      </span>
                    </FormControl>
                    <FormControl id="state" mt={2}>
                      <FormLabel>
                        State
                        <Text as={"span"} style={{ color: "red" }}>
                          *
                        </Text>
                      </FormLabel>
                      <Select
                        placeholder="Select option"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="MP">MP</option>
                        <option value="UP">UP</option>
                        <option value="CG">CG</option>
                      </Select>
                      <span
                        style={{
                          color: "red",
                          fontSize: "13px",
                          paddingBottom: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {errors.state && touched.state && errors.state}
                      </span>
                    </FormControl>
                    <FormControl id="city" mt={2}>
                      <FormLabel>
                        City
                        <Text as={"span"} style={{ color: "red" }}>
                          *
                        </Text>
                      </FormLabel>
                      <Select
                        placeholder="Select option"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="Indore">Indore</option>
                        <option value="Bhopal">Bhopal</option>
                        <option value="Jabalpur">Jabalpur </option>
                      </Select>
                      <span
                        style={{
                          color: "red",
                          fontSize: "13px",
                          paddingBottom: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {errors.city && touched.city && errors.city}
                      </span>
                    </FormControl>
                    <Stack mt={2} mb={1}>
                      <Checkbox>
                        I have read the{" "}
                        <Text as={"span"} style={{ color: "blueviolet" }}>
                          Terms and Conditions
                        </Text>
                      </Checkbox>
                    </Stack>
                    <Stack spacing={10} pt={2}>
                      <Button
                        loadingText="Submitting"
                        size="lg"
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        type="submit"
                        name="submit"
                        disabled={isSubmitting}
                      >
                        Sign up
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
                    <Stack pt={1}>
                      <Text align={"center"}>
                        Already a user?{" "}
                        <Link to="/loginpage">
                          <Text as={"span"} color={"blue.400"}>
                            Login
                          </Text>
                        </Link>
                      </Text>
                    </Stack>
                  </form>
                )}
              </Formik>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      <ToastContainer />
    </>
  );
}
