import React, { useContext, useEffect, useState } from "react";
import { Container, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { IoArrowRedoSharp, IoArrowUndoSharp } from "react-icons/io5";
import { Link } from "gatsby";
import Layout from "../../Components/Layout";
import { cartContext } from "../../Components/Store/GlobalContextProvider";

function Cart() {
  const { cart, setcart } = useContext(cartContext);
  //console.log(cart);
  const [totalamt, settotalamt] = useState(0);
  useEffect(() => {
    settotalamt(
      cart.reduce((acc, curr) => Number(acc) + Number(curr.price), 0)
    );
  }, []);

  return (
    <>
      <Layout />
      <Container maxW={"7xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 15, md: 20 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <div class="container">
              <Heading style={{ fontSize: "20px" }}>
                Total ({cart ? cart.length : 0}) item in your cart
              </Heading>
              <table id="cart" class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th style={{ width: "50%" }}>Product</th>
                    <th style={{ width: "10%" }}>Price</th>
                    <th style={{ width: "8%" }}>Quantity</th>
                    <th style={{ width: "22%" }} class="text-center">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, key) => {
                    return (
                      <tr key={key}>
                        <td data-th="Product">
                          <div class="row">
                            <div class="col-sm-2 hidden-xs">
                              <img
                                src={
                                  item && item.images[0] && item.images[0].src
                                }
                                alt="..."
                                class="img-responsive"
                              />
                            </div>
                            <div class="col-sm-10">
                              <h4 class="nomargin">{item.name}</h4>
                              <p>{item.descriprion}</p>
                            </div>
                          </div>
                        </td>
                        <td data-th="Price">{item.price}</td>
                        <td data-th="Quantity">1</td>
                        <td data-th="Subtotal" class="text-center">
                          {item.price}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td>
                      <Link to="/shop">
                        <a class="btn btn-warning">
                          <HStack>
                            <IoArrowUndoSharp />
                            <Text>Continue Shopping</Text>
                          </HStack>
                        </a>
                      </Link>
                    </td>
                    <td colspan="2" class="hidden-xs"></td>
                    <td class="hidden-xs text-center">
                      <strong>{totalamt}</strong>
                    </td>
                    <td>
                      {totalamt > 0 ? (
                        <Link to="/CheckoutPage/teststripepayment">
                          <a class="btn btn-success btn-block">
                            <HStack>
                              <Text>Checkout</Text> <IoArrowRedoSharp />
                            </HStack>
                          </a>
                        </Link>
                      ) : (
                        <Link>
                          <a class="btn btn-success btn-block">
                            <HStack>
                              <Text>Checkout</Text> <IoArrowRedoSharp />
                            </HStack>
                          </a>
                        </Link>
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default Cart;
