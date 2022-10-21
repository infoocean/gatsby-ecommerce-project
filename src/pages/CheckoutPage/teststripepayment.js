import { Checkbox, color } from "@chakra-ui/react";
import { navigate } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import api from "../../API/Woocommerceapi";
import Layout from "../../Components/Layout";
import {
  cartContext,
  usercontext,
} from "../../Components/Store/GlobalContextProvider";

function StripeCheckouts() {
  const { cart, setcart } = useContext(cartContext);
  const [totalamt, settotalamt] = useState(0);
  useEffect(() => {
    settotalamt(
      cart.reduce((acc, curr) => Number(acc) + Number(curr.price), 0)
    );
  }, []);

  const { isuser, setisuser } = useContext(usercontext);

  console.log(isuser);

  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    number: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    h_no_b_no: "",
    area_colony: "",
    landmark: "",
    altnum: "",
    altemail: "",
  });

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setformdata((formdata) => ({
      ...formdata,
      [name]: value,
    }));
  };

  const onToken = (token) => {
    //console.log(token);
    const data = { token, formdata, ammount: totalamt };
    console.log(data);
    //return false;
    fetch(
      "https://mynodeherokuappproject.herokuapp.com/stripe-payment-integration",
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
          // localStorage.setItem(
          //   "tnx_id",
          //   data.charges.data[0].balance_transaction
          // );
          // localStorage.setItem("receipt", data.charges.data[0].receipt_url);

          const newcreateorder = {
            payment_method: data.payment_method_types[0],
            payment_method_title: data.description,
            set_paid: true,
            billing: {
              first_name: formdata.name,
              address_1: formdata.address,
              address_2: formdata.address,
              city: formdata.city,
              state: formdata.state,
              postcode: formdata.zipcode,
              country: formdata.country,
              email: formdata.email,
              phone: formdata.number,
            },
            shipping: {
              first_name: formdata.name,
              address_1: formdata.address,
              address_2: formdata.address,
              city: formdata.city,
              state: formdata.state,
              postcode: formdata.zipcode,
              country: formdata.country,
            },
            line_items: [
              {
                product_id: 10443,
                quantity: 1,
              },
            ],
            shipping_lines: [
              {
                method_id: data.charges.data[0].balance_transaction,
                method_title: "Flat Rate",
                total: (totalamt * 100).toString(),
              },
            ],
          };
          console.log("new create order^^^^^^^", newcreateorder);
          return false;
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
      <Layout />
      <div className="container-fluid mt-5 mb-5">
        <div class="row">
          <div class="col-md-8 mb-4">
            <div class="card mb-4">
              <div class="card-header py-3">
                <h5 class="mb-0">Biling details & Shipping Details</h5>
              </div>
              <div class="card-body">
                <form>
                  <div class="row mb-4">
                    <div class="col">
                      <div class="form-outline">
                        <label class="form-label" for="form7Example1">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formdata.name}
                          onChange={inputsHandler}
                          id="form7Example1"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-outline">
                        <label class="form-label" for="form7Example2">
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={formdata.email}
                          onChange={inputsHandler}
                          id="form7Example2"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-outline">
                        <label class="form-label" for="form7Example2">
                          Number
                        </label>
                        <input
                          type="text"
                          name="number"
                          onChange={inputsHandler}
                          value={formdata.number}
                          id="form7Example2"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col">
                      <div class="form-outline">
                        <label class="form-label" for="form7Example1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formdata.city}
                          onChange={inputsHandler}
                          id="form7Example1"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-outline">
                        <label class="form-label" for="form7Example2">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formdata.state}
                          onChange={inputsHandler}
                          id="form7Example2"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-outline">
                        <label class="form-label" for="form7Example2">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formdata.country}
                          onChange={inputsHandler}
                          id="form7Example2"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col">
                      <div class="form-outline">
                        <label class="form-label" for="form7Example1">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          name="zipcode"
                          value={formdata.zipcode}
                          onChange={inputsHandler}
                          id="form7Example1"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-outline">
                        <label class="form-label" for="form7Example2">
                          H.NO/B.No
                        </label>
                        <input
                          type="text"
                          name="hnobno"
                          value={formdata.h_no_b_no}
                          onChange={inputsHandler}
                          id="form7Example2"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-outline">
                        <label class="form-label" for="form7Example2">
                          Area/Colony
                        </label>
                        <input
                          type="text"
                          name="areacolony"
                          value={formdata.area_colony}
                          onChange={inputsHandler}
                          id="form7Example2"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col">
                      <div class="form-outline">
                        <label class="form-label" for="form7Example1">
                          LandMark
                        </label>
                        <input
                          type="text"
                          name="landmark"
                          value={formdata.landmark}
                          onChange={inputsHandler}
                          id="form7Example1"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-outline">
                        <label class="form-label" for="form7Example2">
                          Alt Number
                        </label>
                        <input
                          type="text"
                          name="altnumber"
                          value={formdata.altnum}
                          onChange={inputsHandler}
                          id="form7Example2"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-outline">
                        <label class="form-label" for="form7Example2">
                          Alt Eamil
                        </label>
                        <input
                          type="text"
                          name="altemail"
                          value={formdata.altemail}
                          onChange={inputsHandler}
                          id="form7Example2"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col">
                      <Checkbox
                        style={{
                          fontSize: "10px",
                          fontWeight: "normal",
                        }}
                      >
                        Billing and Shipping Adddress Same
                      </Checkbox>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-4">
            <div class="card mb-4">
              <div class="card-header py-3">
                <h5 class="mb-0">Summary</h5>
              </div>
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  {cart &&
                    cart.map((val, key) => {
                      return (
                        <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          {val.name}
                          <span>{val.price}</span>
                        </li>
                      );
                    })}
                  <hr />
                  <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>{totalamt ? totalamt : ""}</strong>
                    </span>
                  </li>
                </ul>
                <StripeCheckout
                  name={"Securly Payment"}
                  description="Big Data Stuff"
                  image="https://cdn-icons-png.flaticon.com/512/1803/1803612.png"
                  //panelLabel="Give Money"
                  amount={totalamt * 100}
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
                    class="btn btn-primary text-center"
                    //onClick={handleform}
                  >
                    Pay With Card Stripe Payment
                  </button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StripeCheckouts;
