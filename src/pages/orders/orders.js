import React from "react";
import "../../assets/style.css";

function Orders() {
  return (
    <>
      <div
        class="d-flex flex-column justify-content-center align-items-center"
        id="order-heading"
      >
        <div class="text-uppercase">
          <p>Order detail</p>
        </div>
        <div class="h4">Tuesday, December 08, 2020</div>
        <div class="pt-1">
          <p>
            Order #12615 is <b class="text-dark"> Completed</b>
          </p>
        </div>
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
                  <b>$69.86</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-start align-items-center list py-1">
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
