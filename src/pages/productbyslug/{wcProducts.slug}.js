import React, { useContext, useState } from "react";
import Header from "../../Templates/header";
import { graphql, navigate, useStaticQuery } from "gatsby";
import StripeCheckout from "react-stripe-checkout";
import api from "../../API/Woocommerceapi";
import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

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
  //const mydata = useStaticQuery(query);
  //console.log(mydata.wcProducts);
  //console.log(data.wcProducts);
  const myproductdet = data.wcProducts;
  console.log(myproductdet);

  const onToken = (token, address) => {
    //console.log(token, address);
    const data = { token, address, ammount: myproductdet.price * 100 };

    fetch("http://localhost:4000/stripe-payment-integration", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        if (data && data.status === "succeeded") {
          const tnx_id = localStorage.setItem(
            "tnx_id",
            data.charges.data[0].balance_transaction
          );
          const receipt = localStorage.setItem(
            "receipt",
            data.charges.data[0].receipt_url
          );
          const newcreateorder = {
            payment_method: data.payment_method_types[0],
            payment_method_title: data.description,
            set_paid: true,
            billing: {
              first_name: data.shipping.name,
              address_1: data.shipping.address.line1,
              address_2: "",
              city: data.shipping.address.city,
              state: data.shipping.address.state,
              postcode: data.shipping.address.postal_code,
              country: data.shipping.address.country,
              email: "sj2585097@gmail.com",
              phone: "9131649079",
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
                product_id: myproductdet.id,
                quantity: 1,
              },
            ],
            shipping_lines: [
              {
                method_id: data.charges.data[0].balance_transaction,
                method_title: "Flat Rate",
                total: (myproductdet.price * 100).toString(),
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
                };
                api
                  .put(`orders/${response.data.id}`, data)
                  .then((response) => {
                    //console.log(response.data);
                  })
                  .catch((error) => {
                    //console.log(error.response.data);
                  });
                localStorage.setItem("order_id", response.data.id);
                navigate(`/CheckoutPage/success`);
              }
            })
            .catch((error) => {
              //console.log(error.response.data);
            });
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      {/*header component*/}
      <Header />
      <div class="container  mt-5 mb-5">
        <div className="row">
          <div className="col-lg-6">
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
          </div>
          <div className="col-lg-6 ">
            <div class="box-2 " style={{ width: "100%" }}>
              <StripeCheckout
                name={"Securly Payment"}
                description="Big Data Stuff"
                image="https://cdn-icons-png.flaticon.com/512/1803/1803612.png"
                amount="$100"
                currency="USD"
                stripeKey="pk_test_51LkLlPLVp3cdDpUhtxguCYbzDREYzfHgo6NCCvHrthwF5ioDMsI1tf9dwC0uTW1xwS17g4LtTOLO0HMU2NviNvY200so7jejAV"
                locale="India"
                token={onToken}
                email=""
                shippingAddress
                billingAddress
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
              </StripeCheckout>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;