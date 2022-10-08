import React, { useReducer, useState } from "react";
import {
  Button,
  Container,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { HiRefresh } from "react-icons/hi";
import { IoArrowRedoSharp, IoArrowUndoSharp } from "react-icons/io5";

function cart() {
  const [state, dispatch] = useReducer(rerducer, initialstate);
  const [quantity, setquantity] = useState(1);
  function handleincrement() {
    setquantity(quantity + 1);
  }
  function handledecrement() {
    if (quantity > 1) {
      setquantity(quantity - 1);
    } else {
      return 1;
    }
  }
  const initialstate = 1;
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

  return (
    <>
      <Container maxW={"7xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 15, md: 20 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <div class="container">
              <table id="cart" class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th style={{ width: "50%" }}>Product</th>
                    <th style={{ width: "10%" }}>Price</th>
                    <th style={{ width: "8%" }}>Quantity</th>
                    <th style={{ width: "22%" }} class="text-center">
                      Subtotal
                    </th>
                    <th style={{ width: "10%" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-th="Product">
                      <div class="row">
                        <div class="col-sm-2 hidden-xs">
                          <img
                            src="https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg"
                            alt="..."
                            class="img-responsive"
                          />
                        </div>
                        <div class="col-sm-10">
                          <h4 class="nomargin">Product 1</h4>
                          <p>
                            Quis aute iure reprehenderit in voluptate velit esse
                            cillum dolore.
                          </p>
                        </div>
                      </div>
                    </td>
                    <td data-th="Price">$1.99</td>
                    <td data-th="Quantity">
                      <HStack>
                        <Button
                          colorScheme="gray"
                          size="xs"
                          onClick={handledecrement}
                        >
                          -
                        </Button>
                        <Input type="button" size="xs" value={quantity} />
                        <Button
                          colorScheme="gray"
                          size="xs"
                          onClick={handleincrement}
                        >
                          +
                        </Button>
                      </HStack>
                    </td>
                    <td data-th="Subtotal" class="text-center">
                      1.99
                    </td>
                    <td class="actions" data-th="">
                      <button
                        class="btn btn-info btn-sm "
                        style={{ marginRight: "10px" }}
                      >
                        <HiRefresh />
                      </button>
                      <button class="btn btn-danger btn-sm">
                        <RiDeleteBin5Line />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td data-th="Product">
                      <div class="row">
                        <div class="col-sm-2 hidden-xs">
                          <img
                            src="https://t3.ftcdn.net/jpg/05/00/16/32/360_F_500163262_0voHcgJfF7yR4TPnWOw1527Qmlj4zfd3.jpg"
                            alt="..."
                            class="img-responsive"
                          />
                        </div>
                        <div class="col-sm-10">
                          <h4 class="nomargin">Product 2</h4>
                          <p>
                            Quis aute iure reprehenderit in voluptate velit esse
                            cillum dolore.
                          </p>
                        </div>
                      </div>
                    </td>
                    <td data-th="Price">$1.99</td>
                    <td data-th="Quantity">
                      <HStack>
                        <Button
                          colorScheme="gray"
                          size="xs"
                          onClick={() => dispatch({ type: "decrement" })}
                        >
                          -
                        </Button>
                        <Input size="xs" value={Number(state)} type="button" />
                        <Button
                          colorScheme="gray"
                          size="xs"
                          onClick={() => dispatch({ type: "increment" })}
                        >
                          +
                        </Button>
                      </HStack>
                    </td>
                    <td data-th="Subtotal" class="text-center">
                      1.99
                    </td>
                    <td class="actions" data-th="">
                      <button
                        class="btn btn-info btn-sm "
                        style={{ marginRight: "10px" }}
                      >
                        <HiRefresh />
                      </button>
                      <button class="btn btn-danger btn-sm">
                        <RiDeleteBin5Line />
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>
                      <a href="#" class="btn btn-warning">
                        <HStack>
                          <IoArrowUndoSharp />
                          <Text>Continue Shopping</Text>
                        </HStack>
                      </a>
                    </td>
                    <td colspan="2" class="hidden-xs"></td>
                    <td class="hidden-xs text-center">
                      <strong>Total $1.99</strong>
                    </td>
                    <td>
                      <a href="#" class="btn btn-success btn-block">
                        <HStack>
                          <Text>Checkout</Text> <IoArrowRedoSharp />
                        </HStack>
                      </a>
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

export default cart;
