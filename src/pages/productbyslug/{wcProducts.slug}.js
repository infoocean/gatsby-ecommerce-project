import React, { useContext, useState } from "react";
import { graphql, navigate } from "gatsby";
import StripeCheckout from "react-stripe-checkout";
import api from "../../API/Woocommerceapi";
import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import Layout from "../../Components/Layout";
import { usercontext } from "../../Components/Store/GlobalContextProvider";

const style = {
  color: "red",
};

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
  const myproductdet = data.wcProducts;
  const { isuser, setisuser } = useContext(usercontext);
  //console.log(isuser);
  let customerid = 0;
  const [paymentstatus, setpaymentstatus] = useState(false);

  if (isuser.length === 0) {
    //navigate("/loginpage");
  }

  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    number: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    hnobno: "",
    areacolony: "",
    address: "",
  });

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setformdata((formdata) => ({
      ...formdata,
      [name]: value,
    }));
  };

  const onToken = (token) => {
    //console.log(token, address);
    const data = { token, formdata, ammount: myproductdet.price };
    //console.log(data);
    //return false;
    setpaymentstatus(true);
    fetch(
      "https://mynodeherokuappproject.herokuapp.com/stripe-payment-integration-gatsby",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        if (data && data.status === "succeeded") {
          // api
          //   .post("customers", {
          //     email: isuser.useremail,
          //     first_name: isuser.username,
          //     last_name: "",
          //     username: isuser.username,
          //     billing: {
          //       first_name: isuser.username,
          //       last_name: "",
          //       company: "",
          //       address_1: "",
          //       address_2: "",
          //       city: "",
          //       state: "",
          //       postcode: "",
          //       country: "",
          //       email: isuser.email,
          //       phone: "",
          //     },
          //     shipping: {
          //       first_name: isuser.username,
          //       last_name: "",
          //       company: "",
          //       address_1: "",
          //       address_2: "",
          //       city: "",
          //       state: "",
          //       postcode: "",
          //       country: "",
          //     },
          //   })
          //   .then((response) => {
          //     console.log(response.data);
          //     customerid = response.data.id;
          //   })
          //   .catch((error) => {
          //     console.log(error.response.data);
          //   });

          const newcreateorder = {
            payment_method: data.payment_method_types[0],
            payment_method_title: data.description,
            set_paid: true,
            customer_id: 0,
            billing: {
              first_name: data.shipping.name,
              address_1: data.shipping.line1,
              address_2: "",
              city: data.shipping.address.city,
              state: data.shipping.address.state,
              postcode: data.shipping.address.postal_code,
              country: data.shipping.address.country,
              email: formdata.email,
              phone: formdata.number,
            },
            shipping: {
              first_name: data.shipping.name,
              address_1: data.shipping.address.line1,
              address_2: "",
              city: data.shipping.address.city,
              state: data.shipping.address.state,
              postcode: data.shipping.address.postal_code,
              country: data.shipping.address.country,
            },
            line_items: [
              {
                product_id: 10443,
                quantity: 1,
                subtotal: myproductdet.price.toString(),
                total: myproductdet.price.toString(),
              },
            ],
            shipping_lines: [
              {
                method_id: "flat_rate",
                method_title: "Flat Rate",
                total: "0",
              },
            ],
          };
          //console.log("new create order^^^^^^^", newcreateorder);

          api
            .post("orders", newcreateorder)
            .then((response) => {
              //console.log(response.data);
              if (response.data && response.data.id > 0) {
                const data = {
                  status: "completed",
                  customer_id: customerid,
                };
                api
                  .put(`orders/${response.data.id}`, data)
                  .then((response) => {
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    var raw = JSON.stringify({
                      Userid: isuser.userid,
                      Orderid: response.data.id,
                    });

                    var requestOptions = {
                      method: "POST",
                      headers: myHeaders,
                      body: raw,
                    };
                    fetch("http://localhost:3000/wybritorders", requestOptions)
                      .then((response) => response.text())
                      .then((result) => console.log(result))
                      .catch((error) => console.log("error", error));
                    alert("Thanks ! Order placed successfully");
                    setpaymentstatus(false);
                    setformdata({
                      name: "",
                      email: "",
                      number: "",
                      city: "",
                      state: "",
                      country: "",
                      zipcode: "",
                      hnobno: "",
                      areacolony: "",
                      address: "",
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <Layout />
      <div class="container-fluid  mt-5 mb-5">
        <div className="row">
          <div className="col-lg-5">
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
                {myproductdet.price ? (
                  <Text>Price : {myproductdet.price}</Text>
                ) : (
                  ""
                )}
                <Text>{myproductdet.name}</Text>
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
                    Description :
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
          </div>
          <div className="col-lg-7 ">
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={5}
            >
              <Stack>
                <HStack>
                  <Box>
                    <FormControl id="fullname">
                      <FormLabel>
                        Full Name <span style={style}>*</span>
                      </FormLabel>
                      <Input
                        type="text"
                        size={"sm"}
                        name="name"
                        value={formdata.name}
                        onChange={inputsHandler}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="email">
                      <FormLabel>
                        Email <span style={style}>*</span>
                      </FormLabel>
                      <Input
                        type="email"
                        size={"sm"}
                        name="email"
                        value={formdata.email}
                        onChange={inputsHandler}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="number">
                      <FormLabel>
                        Number <span style={style}>*</span>
                      </FormLabel>
                      <Input
                        type="text"
                        size={"sm"}
                        name="number"
                        value={formdata.number}
                        onChange={inputsHandler}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <HStack>
                  <Box>
                    <FormControl id="city">
                      <FormLabel>
                        City <span style={style}>*</span>
                      </FormLabel>
                      <Input
                        type="text"
                        size={"sm"}
                        name="city"
                        value={formdata.city}
                        onChange={inputsHandler}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="state">
                      <FormLabel>
                        State <span style={style}>*</span>
                      </FormLabel>
                      <Input
                        type="text"
                        size={"sm"}
                        name="state"
                        value={formdata.state}
                        onChange={inputsHandler}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="country">
                      <FormLabel>
                        country <span style={style}>*</span>
                      </FormLabel>
                      <Input
                        type="text"
                        size={"sm"}
                        name="country"
                        value={formdata.country}
                        onChange={inputsHandler}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <HStack>
                  <Box>
                    <FormControl id="city">
                      <FormLabel>
                        ZipCode <span style={style}>*</span>
                      </FormLabel>
                      <Input
                        type="text"
                        size={"sm"}
                        name="zipcode"
                        value={formdata.zipcode}
                        onChange={inputsHandler}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="city">
                      <FormLabel>
                        H.No./B.No <span style={style}>*</span>
                      </FormLabel>
                      <Input
                        type="text"
                        size={"sm"}
                        name="hnobno"
                        value={formdata.hnobno}
                        onChange={inputsHandler}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="city">
                      <FormLabel>
                        Area/Colony <span style={style}>*</span>
                      </FormLabel>
                      <Input
                        type="text"
                        size={"sm"}
                        name="areacolony"
                        value={formdata.areacolony}
                        onChange={inputsHandler}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <HStack>
                  <FormControl id="email">
                    <FormLabel>
                      Full Address <span style={style}>*</span>
                    </FormLabel>
                    <Textarea
                      placeholder=""
                      size="sm"
                      name="address"
                      value={formdata.address}
                      onChange={inputsHandler}
                    />
                  </FormControl>
                </HStack>
                <HStack>
                  <FormControl id="email">
                    <Checkbox
                      style={{
                        fontSize: "10px",
                        fontWeight: "normal",
                      }}
                    >
                      Billing Address Same as the shipping Address
                    </Checkbox>
                  </FormControl>
                </HStack>
                <Stack pt={2} style={{ alignItems: "center" }}>
                  <div
                    class="box-2 "
                    style={{ width: "100%", alignItems: "center" }}
                  >
                    <StripeCheckout
                      name={"Securly Payment"}
                      description="Big Data Stuff"
                      image="https://cdn-icons-png.flaticon.com/512/1803/1803612.png"
                      amount={myproductdet.price * 100}
                      currency="INR"
                      stripeKey="pk_test_51LkLlPLVp3cdDpUhtxguCYbzDREYzfHgo6NCCvHrthwF5ioDMsI1tf9dwC0uTW1xwS17g4LtTOLO0HMU2NviNvY200so7jejAV"
                      locale="India"
                      token={onToken}
                      email=""
                      //shippingAddress
                      //billingAddress
                    >
                      <button
                        style={{
                          layout: "horizontal",
                          fontSize: "17px",
                          fontWeight: "bold",
                          width: "100%",
                        }}
                        class="btn btn-primary"
                      >
                        Pay With Card Stripe Payment
                      </button>
                      {paymentstatus === true ? (
                        <span class="spinner spinner-large spinner-blue spinner-slow"></span>
                      ) : (
                        ""
                      )}
                    </StripeCheckout>
                  </div>
                </Stack>
              </Stack>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
