import React, { useContext } from "react";
import Header from "../../../Templates/header";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { graphql, useStaticQuery } from "gatsby";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51LkLlPLVp3cdDpUhtxguCYbzDREYzfHgo6NCCvHrthwF5ioDMsI1tf9dwC0uTW1xwS17g4LtTOLO0HMU2NviNvY200so7jejAV"
    );
  }
  return stripePromise;
};

const buttonStyles = {
  display: "block",
  fontSize: "13px",
  textAlign: "center",
  color: "#000",
  padding: "12px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255, 178, 56)",
  borderRadius: "6px",
  letterSpacing: "1.5px",
};

const buttonDisabledStyles = {
  opacity: "0.5",
  cursor: "not-allowed",
  width: "100%",
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

function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const mydata = useStaticQuery(query);
  const mypdata = mydata.wcProducts;
  //console.log(mypdata);

  const redirectToCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: "price_1LsJcmLVp3cdDpUhrxQ6emYN", quantity: 1 }],
      successUrl: `http://localhost:8000/success?session_id={CHECKOUT_SESSION_ID}`,
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
      <div class="container  mt-5 mb-5">
        <div className="row">
          <div className="col-lg-6">
            <div class=" bg-light user ">
              <div class=" d-flex align-items-center mb-3">
                <img
                  src={
                    mypdata.images && mypdata.images[0] && mypdata.images[0].src
                  }
                  class="pic rounded-circle"
                  alt=""
                />
              </div>
              <div class="box-inner-1 pb-3 mb-3 ">
                <div class="d-flex justify-content-between mb-3 userdetails">
                  <p class="fw-bold">{mypdata.name}</p>
                  <p class="fw-lighter">
                    <span class="fas fa-dollar-sign"></span>
                    {mypdata.price}
                  </p>
                </div>
                <div
                  id="my"
                  class="carousel slide carousel-fade img-details"
                  data-bs-ride="carousel"
                  data-bs-interval="2000"
                ></div>
                <p class="dis my-3 info">
                  {mypdata.description.replace(/(<([^>]+)>)/gi, "")}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 ">
            <div class="box-2 " style={{ width: "100%" }}>
              <button
                disabled={loading}
                style={
                  loading
                    ? { ...buttonStyles, ...buttonDisabledStyles }
                    : buttonStyles
                }
                onClick={redirectToCheckout}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CheckoutPage;
