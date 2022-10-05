import * as React from "react";

const pageStyles = {
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
  marginTop: 0,
};

const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>Congratulations</h1>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
