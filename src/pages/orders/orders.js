import React, { useState } from "react";
import api from "../../API/Woocommerceapi";

import "../../assets/style.css";
import Layout from "../../Components/Layout";

function Orders() {
  // const order_id = localStorage.getItem("order_id");
  // const tnx_id = localStorage.getItem("tnx_id");
  // const receipt = localStorage.getItem("receipt");

  // const [orderdet, setorderdet] = useState([]);

  // api
  //   .get(`orders/${order_id}`)
  //   .then((response) => {
  //     //console.log(response.data);
  //     setorderdet(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error.response.data);
  //   });

  // console.log(orderdet);

  return (
    <>
      <Layout />
      <div
        class="d-flex flex-column justify-content-center align-items-center"
        id="order-heading"
      >
        <div class="text-uppercase">
          <p>Order detail</p>
        </div>
        {/* <div class="h4">
          Tuesday, December {orderdet && orderdet.date_completed}
        </div>
        <div class="pt-1">
          <p>
            Order {orderdet && orderdet.order_key} is{" "}
            <b class="text-dark"> {orderdet && orderdet.status}</b>
          </p>
        </div> */}
      </div>
      <div class="wrapper bg-white">
        <div class="table-responsive">
          <table class="table table-borderless">
            <thead>
              <tr class="text-uppercase text-muted">
                <th scope="col">product</th>
                <th scope="col" class="text-right">
                  total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Babyblends: 1meal/day</th>
                <td class="text-right">
                  {/* <b>{orderdet && orderdet.total}</b> */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div class="d-flex justify-content-start align-items-center list py-1">
          <div class="mx-3">
            {" "}
            <img
              src="https://images.pexels.com/photos/206959/pexels-photo-206959.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="apple"
              width="100"
              height="100"
            />{" "}
          </div>
          <div class="order-item">Apple</div>
        </div> */}
        <div class="row border rounded p-1 my-3">
          <div class="col-md-6 py-3">
            <div class="d-flex flex-column align-items start">
              {" "}
              <b>Tranaction Id</b>
              {/* <p class="text-justify pt-2">{tnx_id }</p> */}
            </div>
          </div>
          <div class="col-md-6 py-3">
            <div class="d-flex flex-column align-items start">
              {" "}
              <b>Invoice</b>
              <p class="text-justify pt-2">
                {/* <a href={receipt} target="__blank">
                  Get Payment Invoice
                </a> */}
              </p>
            </div>
          </div>
        </div>
        <div class="row border rounded p-1 my-3">
          <div class="col-md-6 py-3">
            <div class="d-flex flex-column align-items start">
              {" "}
              <b>Billing Address</b>
              <p class="text-justify pt-2">
                James Thompson, 356 Jonathon Apt.220,
              </p>
              <p class="text-justify">New York</p>
            </div>
          </div>
          <div class="col-md-6 py-3">
            <div class="d-flex flex-column align-items start">
              {" "}
              <b>Shipping Address</b>
              <p class="text-justify pt-2">
                James Thompson, 356 Jonathon Apt.220,
              </p>
              <p class="text-justify">New York</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
