import { navigate } from "gatsby";
import React from "react";
import StripeCheckout from "react-stripe-checkout";
import api from "../../API/Woocommerceapi";
import Header from "../../Templates/header";

function StripeCheckouts() {
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
      <Header />
      <StripeCheckout
        name={"Securly Payment"}
        description="Big Data Stuff"
        image="https://cdn-icons-png.flaticon.com/512/1803/1803612.png"
        //panelLabel="Give Money"
        amount="100"
        currency="USD"
        stripeKey="pk_test_51LkLlPLVp3cdDpUhtxguCYbzDREYzfHgo6NCCvHrthwF5ioDMsI1tf9dwC0uTW1xwS17g4LtTOLO0HMU2NviNvY200so7jejAV"
        locale="India"
        token={onToken}
        email=""
        shippingAddress
        billingAddress
        //zipCode={true}
        //allowRememberMe={true}
      >
        <button
          style={{
            layout: "horizontal",
            fontSize: "17px",
            fontWeight: "bold",
            width: "30%",
            marginTop: "200px",
            marginLeft: "500px",
          }}
          class="btn btn-primary text-center"
        >
          Pay With Card Stripe Payment
        </button>
      </StripeCheckout>
    </>
  );
}

export default StripeCheckouts;
