import React, { useContext, useEffect, useState } from "react";
import api from "../../API/Woocommerceapi";

import "../../assets/style.css";
import Layout from "../../Components/Layout";
import { orderid, receipt } from "../../Components/Store/GlobalContextProvider";

function Orders() {
  const { order_id, setorder_id } = useContext(orderid);
  const { payreceipt, setpayreceipt } = useContext(receipt);
  const [orderdet, setorderdet] = useState([]);
  const [productdet, setproductdet] = useState([]);
  const [product_id, setproduct_id] = useState([]);
  let totalamt = 0;

  useEffect(() => {
    fetchorderdet();
    fetchproduct();
  }, [product_id]);

  function fetchorderdet() {
    api
      .get(`orders/${order_id}`)
      .then((response) => {
        //console.log(response.data);
        setorderdet(response.data);
        setproduct_id(
          orderdet && orderdet.line_items && orderdet.line_items[0].product_id
        );
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  console.log(orderdet);

  function fetchproduct() {
    api
      .get(`products/${product_id}`)
      .then((response) => {
        console.log(response.data);
        setproductdet(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

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
        <div class="h4">
          Tuesday, December {orderdet && orderdet.date_completed}
        </div>
        <div class="pt-1">
          <p>
            Order {orderdet && orderdet.order_key} is{" "}
            <b class="text-dark"> {orderdet && orderdet.status}</b>
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
              {orderdet &&
                orderdet.line_items &&
                orderdet.line_items.map((data, key) => {
                  totalamt = totalamt + data.price;
                  return (
                    <tr key={key}>
                      <th scope="row">{data.name}</th>
                      <td class="text-right">
                        <b>{data.price}</b>
                      </td>
                    </tr>
                  );
                })}
              <hr />
              <p style={{ textAlign: "end" }}>{totalamt}</p>
            </tbody>
          </table>
        </div>
        <div class="row border rounded p-1 my-3">
          <div class="col-md-6 py-3">
            <div class="d-flex flex-column align-items start">
              {" "}
              <b>Tranaction Id</b>
              <p class="text-justify pt-2">
                {orderdet &&
                  orderdet.shipping_lines &&
                  orderdet.shipping_lines[0].method_id}{" "}
              </p>
            </div>
          </div>
          <div class="col-md-6 py-3">
            <div class="d-flex flex-column align-items start">
              {" "}
              <b>Invoice</b>
              <p class="text-justify pt-2">
                <a href={payreceipt} target="__blank">
                  Get Payment Invoice
                </a>
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
                {orderdet && orderdet.billing && orderdet.billing.address_1}
              </p>
              <p class="text-justify">
                {" "}
                {orderdet && orderdet.billing && orderdet.billing.city}
              </p>
            </div>
          </div>
          <div class="col-md-6 py-3">
            <div class="d-flex flex-column align-items start">
              {" "}
              <b>Shipping Address</b>
              <p class="text-justify pt-2">
                {orderdet && orderdet.billing && orderdet.billing.address_1}
              </p>
              <p class="text-justify">
                {" "}
                {orderdet && orderdet.billing && orderdet.billing.city}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
