import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: "https://furniture.mangoitsol.com",
  consumerKey: "ck_09e070e7214fbbaac8d98e6d96478704d59457f7",
  consumerSecret: "cs_d271fb01e3893cb7513d762a4f1cb409d9bb1944",
  version: "wc/v3",
});

export default api;
