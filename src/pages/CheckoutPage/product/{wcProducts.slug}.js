import React, { useContext } from "react";
import Header from "../../../Templates/header";
import { graphql, navigate, useStaticQuery } from "gatsby";
import StripeCheckout from "react-stripe-checkout";
import { api } from "../../../API/API";
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
  const mydata = useStaticQuery(query);
  const mypdata = mydata.wcProducts;
  //console.log(mypdata);

  const onToken = (token, address) => {
    //console.log(token, address);
    const data = { token, address, ammount: 100 };
    //console.log(data);
    //return false;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(data);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:4000/stripe-payment-integration", requestOptions)
      .then(function (response) {
        //console.log(response);
        console.log(response.data);
        console.log(response.status);
        // if (response.data && response.data.status === "succeeded") {
        //   const tnx_id = localStorage.setItem(
        //     "tnx_id",
        //     response.data.charges.data[0].balance_transaction
        //   );
        //   const receipt = localStorage.setItem(
        //     "receipt",
        //     response.data.charges.data[0].receipt_url
        //   );
        //   const newcreateorder = {
        //     payment_method: response.data.payment_method_types[0],
        //     payment_method_title: response.data.description,
        //     set_paid: true,
        //     billing: {
        //       first_name: response.data.shipping.name,
        //       address_1: response.data.shipping.address.line1,
        //       address_2: "",
        //       city: response.data.shipping.address.city,
        //       state: response.data.shipping.address.state,
        //       postcode: response.data.shipping.address.postal_code,
        //       country: response.data.shipping.address.country,
        //       email: "sj2585097@gmail.com",
        //       phone: "9131649079",
        //     },
        //     shipping: {
        //       first_name: response.data.shipping.name,
        //       address_1: response.data.shipping.address.line1,
        //       address_2: "",
        //       city: response.data.shipping.address.city,
        //       state: response.data.shipping.address.state,
        //       postcode: response.data.shipping.address.postal_code,
        //       country: response.data.shipping.address.country,
        //     },
        //     line_items: [
        //       {
        //         product_id: mypdata.id,
        //         quantity: 1,
        //       },
        //     ],
        //     shipping_lines: [
        //       {
        //         method_id: response.data.charges.data[0].balance_transaction,
        //         method_title: "Flat Rate",
        //         total: mypdata.price,
        //       },
        //     ],
        //   };
        //   console.log("new create order^^^^^^^", newcreateorder);
        //   api
        //     .post("orders", newcreateorder)
        //     .then((response) => {
        //       //console.log(response.data);
        //       if (response.data && response.data.id > 0) {
        //         const data = {
        //           status: "completed",
        //         };
        //         // api
        //         //   .put(`orders/${response.data.id}`, data)
        //         //   .then((response) => {
        //         //     //console.log(response.data);
        //         //   })
        //         //   .catch((error) => {
        //         //     //console.log(error.response.data);
        //         //   });
        //         navigate(`/success/${response.data.id}`);
        //       }
        //     })
        //     .catch((error) => {
        //       //console.log(error.response.data);
        //     });
        // }

        if (response.status === 200) {
          const tnx_id = localStorage.setItem(
            "tnx_id",
            response.data.charges.data[0].balance_transaction
          );
          const receipt = localStorage.setItem(
            "receipt",
            response.data.charges.data[0].receipt_url
          );
          const newcreateorder = {
            payment_method: response.data.payment_method_types[0],
            payment_method_title: response.data.description,
            set_paid: true,
            billing: {
              first_name: response.data.shipping.name,
              address_1: response.data.shipping.address.line1,
              address_2: "",
              city: response.data.shipping.address.city,
              state: response.data.shipping.address.state,
              postcode: response.data.shipping.address.postal_code,
              country: response.data.shipping.address.country,
              email: "sj2585097@gmail.com",
              phone: "9131649079",
            },
            shipping: {
              first_name: response.data.shipping.name,
              address_1: response.data.shipping.address.line1,
              address_2: "",
              city: response.data.shipping.address.city,
              state: response.data.shipping.address.state,
              postcode: response.data.shipping.address.postal_code,
              country: response.data.shipping.address.country,
            },
            line_items: [
              {
                product_id: mypdata.id,
                quantity: 1,
              },
            ],
            shipping_lines: [
              {
                method_id: response.data.charges.data[0].balance_transaction,
                method_title: "Flat Rate",
                total: mypdata.price,
              },
            ],
          };
          console.log("new create order^^^^^^^", newcreateorder);
          api
            .post("orders", newcreateorder)
            .then((response) => {
              //console.log(response.data);
              if (response.data && response.data.id > 0) {
                const data = {
                  status: "completed",
                };
                // api
                //   .put(`orders/${response.data.id}`, data)
                //   .then((response) => {
                //     //console.log(response.data);
                //   })
                //   .catch((error) => {
                //     //console.log(error.response.data);
                //   });
                navigate(`/success/${response.data.id}`);
              }
            })
            .catch((error) => {
              //console.log(error.response.data);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
export default CheckoutPage;
