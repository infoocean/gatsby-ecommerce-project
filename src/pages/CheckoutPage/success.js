import React from "react";

import "../../assets/style.css";
import { AiOutlineCheck } from "react-icons/ai";
import { Link } from "gatsby";
import Header from "../../Templates/header";

function SuccessPage() {
  return (
    <>
      <Header />
      <div class="container">
        <div class="row">
          <div class="col-md-6 mx-auto mt-5">
            <div class="payment">
              <div class="payment_header">
                <div class="check">
                  <i class="fa fa-check" aria-hidden="true">
                    <AiOutlineCheck />
                  </i>
                </div>
              </div>
              <div class="content">
                <h1>Payment Success !</h1>
                <p>
                  Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                  used in laying out print, graphic or web designs.{" "}
                </p>
                <Link to="/orders/orders">Check Your Order Details</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuccessPage;
