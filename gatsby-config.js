module.exports = {
  siteMetadata: {
    title: `My Gatsby Site`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "@chakra-ui/gatsby-plugin",
    {
      resolve: "@pasdo501/gatsby-source-woocommerce",
      options: {
        // Base URL of Wordpress site
        api: "https://furniture.mangoitsol.com",
        // set to false to not see verbose output during build
        // default: true
        verbose: true,
        // true if using https. otherwise false.
        https: false,
        api_keys: {
          consumer_key: "ck_6cf353bb47b6da0c254907ef6f23f3be37b96cc4",
          consumer_secret: "cs_9a67c76409f19b1f50e77debeca371de2a22a84a",
        },
        // Array of strings with fields you'd like to create nodes for...
        fields: ["products", "products/categories", "products/attributes"],
        // Send the API keys as query string parameters instead of using the authorization header
        // OPTIONAL: defaults to false
        query_string_auth: false,
        // Version of the woocommerce API to use
        // OPTIONAL: defaults to 'wc/v3'
        api_version: "wc/v3",
        // OPTIONAL: How many results to retrieve *per request*
        per_page: 100,
        // OPTIONAL: Custom WP REST API url prefix, only needed if not using
        // the default prefix ('wp-json').
        // wpAPIPrefix: 'wp-json',
        // OPTIONAL: Support for URLs with ports, e.g. 8080; defaults to no port
        // port: '8080',
        // OPTIONAL: Encoding; default to 'utf8'
        encoding: "utf8",
        // OPTIONAL: Custom Axios config (see https://github.com/axios/axios) - note that this can override other options.
        axios_config: {
          // Axios config options
        },
      },
    },
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: [
          "Balance",
          "BalanceTransaction",
          "Product",
          "ApplicationFee",
          "Sku",
          "Subscription",
        ],
        secretKey:
          "sk_test_51LkLlPLVp3cdDpUh7AUoQIdolBC7QY9JVlF5okcCNIER6wfF7dy5D1sk3sCW4Pqz50hPL6vlJP7YpOfYoJjKeJGQ00Kwtav4kX",
        downloadFiles: true,
      },
    },
  ],
};
