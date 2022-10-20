import { navigate } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import api from "../../API/Woocommerceapi";
import Layout from "../../Components/Layout";
import { cartContext } from "../../Components/Store/GlobalContextProvider";

function StripeCheckouts() {
  const { cart, setcart } = useContext(cartContext);

  const [totalamt, settotalamt] = useState(0);
  useEffect(() => {
    settotalamt(
      cart.reduce((acc, curr) => Number(acc) + Number(curr.price), 0)
    );
  }, []);

  const onToken = (token, address) => {
    //console.log(token, address);
    const data = { token, address, ammount: 100 };
    //console.log(data);
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
        //console.log(data);

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
                product_id: 10,
                quantity: 1,
              },
            ],
            shipping_lines: [
              {
                method_id: data.charges.data[0].balance_transaction,
                method_title: "Flat Rate",
                total: "100",
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
      <Layout />
      <div className="container-fluid mt-5 mb-5">
        <div class="row">
          <div class="col-md-8 mb-4">
            <div class="card mb-4">
              <div class="card-header py-3">
                <h5 class="mb-0">Biling details</h5>
              </div>
              <div class="card-body">
                <form>
                  <div class="row mb-4">
                    <div class="col">
                      <div class="form-outline">
                        <label class="form-label" for="form7Example1">
                          First name
                        </label>
                        <input
                          type="text"
                          id="form7Example1"
                          class="form-control"
                        />
                      </div>
                      <div class="form-outline">
                        <label class="form-label" for="form7Example1">
                          Last name
                        </label>
                        <input
                          type="text"
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
                          Email
                        </label>
                        <input
                          type="text"
                          id="form7Example1"
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
                          id="form7Example2"
                          class="form-control"
                        />
                      </div>
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
                  amount={totalamt}
                  currency="INR"
                  stripeKey="pk_test_51LkLlPLVp3cdDpUhtxguCYbzDREYzfHgo6NCCvHrthwF5ioDMsI1tf9dwC0uTW1xwS17g4LtTOLO0HMU2NviNvY200so7jejAV"
                  locale="India"
                  token={onToken}
                  email=""
                >
                  <button
                    style={{
                      layout: "horizontal",
                      fontSize: "17px",
                      fontWeight: "bold",
                      width: "100%",
                    }}
                    class="btn btn-primary text-center"
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
