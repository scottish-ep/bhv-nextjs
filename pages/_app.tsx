import get from "lodash/get";
import React from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <div id="root">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
