import React from "react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Header from "../../Templates/header";
const buttonStyles = {
  fontSize: "13px",
  textAlign: "center",
  color: "#000",
  padding: "12px 60px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255, 178, 56)",
  borderRadius: "6px",
  letterSpacing: "1.5px",
};

const buttonDisabledStyles = {
  opacity: "0.5",
  cursor: "not-allowed",
};
let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51LkLlPLVp3cdDpUhtxguCYbzDREYzfHgo6NCCvHrthwF5ioDMsI1tf9dwC0uTW1xwS17g4LtTOLO0HMU2NviNvY200so7jejAV"
    );
  }
  return stripePromise;
};

function StripeCheckout() {
  const [loading, setLoading] = useState(false);
  const redirectToCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: "price_1LsJcmLVp3cdDpUhrxQ6emYN", quantity: 1 }],
      successUrl: `http://localhost:8000/CheckoutPage/success/`,
      cancelUrl: `http://localhost:8000/`,
    });

    if (error) {
      console.warn("Error:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div style={{ marginTop: "15%", marginLeft: "40%" }}>
        <button
          disabled={loading}
          style={
            loading
              ? { ...buttonStyles, ...buttonDisabledStyles }
              : buttonStyles
          }
          onClick={redirectToCheckout}
        >
          <b>Pay With Card</b>
        </button>
      </div>
    </>
  );
}

export default StripeCheckout;
