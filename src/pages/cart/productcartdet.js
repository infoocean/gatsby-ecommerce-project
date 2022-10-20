import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { HiRefresh } from "react-icons/hi";
import { IoArrowRedoSharp, IoArrowUndoSharp } from "react-icons/io5";
import Header from "../../Templates/header";

import { Link } from "gatsby";
import { MyCart } from "../Store/Context";

const product = [
  {
    id: 1,
    product_name: "product1",
    descriprion:
      " Quis aute iure reprehenderit in voluptate velit essecillum dolore.",
    price: "$20",
    image:
      "https://cdn.pixabay.com/photo/2020/05/26/09/32/product-5222398_960_720.jpg",
  },
];

//console.log(product);

function Cart() {
  // const { cart } = useContext(MyCart);
  // console.log(cart);

  const [calculation, setcalculation] = useState({ subtotal: 1, total: 1 });

  const rerducer = (state, action) => {
    //console.log(state, action);
    if (action.type === "increment") {
      return eval(state + 1);
    } else {
      if (state > 1) {
        return eval(state - 1);
      } else {
        return state;
      }
    }
  };
  const [state, dispatch] = useReducer(rerducer, 1);

  useEffect(() => {}, []);

  return (
    <>
      <Header />
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
                Total (0) item in your cart
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
                  {product.map((item, key) => {
                    return (
                      <tr key={key}>
                        <td data-th="Product">
                          <div class="row">
                            <div class="col-sm-2 hidden-xs">
                              <img
                                src={item.image}
                                alt="..."
                                class="img-responsive"
                              />
                            </div>
                            <div class="col-sm-10">
                              <h4 class="nomargin">{item.product_name}</h4>
                              <p>{item.descriprion}</p>
                            </div>
                          </div>
                        </td>
                        <td data-th="Price">{item.price}</td>
                        <td data-th="Quantity">
                          {/* <HStack>
                            <Button
                              colorScheme="gray"
                              size="xs"
                              onClick={() => dispatch({ type: "decrement" })}
                            >
                              -
                            </Button>
                            <Input
                              size="xs"
                              value={Number(state)}
                              type="button"
                            />
                            <Button
                              colorScheme="gray"
                              size="xs"
                              onClick={() => dispatch({ type: "increment" })}
                            >
                              +
                            </Button>
                          </HStack> */}
                          1
                        </td>
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
                      <strong>${calculation.total}</strong>
                    </td>
                    <td>
                      <Link to="/CheckoutPage/teststripepayment">
                        <a class="btn btn-success btn-block">
                          <HStack>
                            <Text>Checkout</Text> <IoArrowRedoSharp />
                          </HStack>
                        </a>
                      </Link>
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
