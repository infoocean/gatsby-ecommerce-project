module.exports = {
  siteMetadata: {
    title: `My Gatsby Site`,
    siteUrl: `https://www.yourdomain.tld`,
  },

  plugins: [
    //chakra ui plugin
    "@chakra-ui/gatsby-plugin",
    //woocommerce plugin
    {
      resolve: "@pasdo501/gatsby-source-woocommerce",
      options: {
        // Base URL of Wordpress site
        api: "furniture.mangoitsol.com/",
        // true if using https. otherwise false.
        https: true,
        api_keys: {
          consumer_key: "ck_6cf353bb47b6da0c254907ef6f23f3be37b96cc4",
          consumer_secret: "cs_9a67c76409f19b1f50e77debeca371de2a22a84a",
        },
        // Array of strings with fields you'd like to create nodes for...
        fields: ["products", "products/categories"],
        // Send the API keys as query string parameters instead of using the authorization header
      },
    },
    //stripe plugin
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
    //firebase plugin
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyC1x4S7GrHymFCrW4hETkfSq7hMw9MAXdg",
          authDomain: "gatsbyproject-9c16d.firebaseapp.com",
          databaseURL:
            "https://gatsbyproject-9c16d-default-rtdb.firebaseio.com/",
          projectId: "gatsbyproject-9c16d",
          storageBucket: "gatsbyproject-9c16d.appspot.com",
          messagingSenderId: "991833274704",
          appId: "1:991833274704:web:f3be1c52b3ae17e4441455",
        },
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "SWAPI",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "swapi",
        // Url to query from
        url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
  ],
};
