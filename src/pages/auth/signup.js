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
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik } from "formik";
import { Link } from "gatsby";
import Header from "../../Templates/header";

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Header />
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

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
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
                        First Name{" "}
                        <Text as={"span"} style={{ color: "red" }}>
                          {" "}
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
                        Last Name{" "}
                        <Text as={"span"} style={{ color: "red" }}>
                          {" "}
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
                        Email address{" "}
                        <Text as={"span"} style={{ color: "red" }}>
                          {" "}
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
                    <FormControl id="password">
                      <FormLabel>
                        Password{" "}
                        <Text as={"span"} style={{ color: "red" }}>
                          {" "}
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
                        Address1{" "}
                        <Text as={"span"} style={{ color: "red" }}>
                          {" "}
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
                      <FormLabel>
                        Address2{" "}
                        <Text as={"span"} style={{ color: "red" }}>
                          {" "}
                          *
                        </Text>
                      </FormLabel>
                      <Input
                        type="text"
                        name="address2"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address1}
                      />
                    </FormControl>
                    <FormControl id="country" mt={2}>
                      <FormLabel>
                        Country{" "}
                        <Text as={"span"} style={{ color: "red" }}>
                          {" "}
                          *
                        </Text>
                      </FormLabel>
                      <Select placeholder="Select option">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Select>
                    </FormControl>
                    <FormControl id="state" mt={2}>
                      <FormLabel>
                        State{" "}
                        <Text as={"span"} style={{ color: "red" }}>
                          {" "}
                          *
                        </Text>
                      </FormLabel>
                      <Select placeholder="Select option">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Select>
                    </FormControl>
                    <FormControl id="city" mt={2}>
                      <FormLabel>
                        City{" "}
                        <Text as={"span"} style={{ color: "red" }}>
                          {" "}
                          *
                        </Text>
                      </FormLabel>
                      <Select placeholder="Select option">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Select>
                    </FormControl>
                    <FormControl id="number" mt={2}>
                      <FormLabel>
                        Mobile Number{" "}
                        <Text as={"span"} style={{ color: "red" }}>
                          {" "}
                          *
                        </Text>
                      </FormLabel>
                      <Input
                        type="text"
                        name="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.number}
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
                      </Button>
                    </Stack>
                    <Stack pt={1}>
                      <Text align={"center"}>
                        Already a user?{" "}
                        <Link to="/auth/login">
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
    </>
  );
}
