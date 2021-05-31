import React from "react";
import Head from "next/head";

function Meta({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <link href="/img/Logo.png" rel="icon" />
    </Head>
  );
}
export default Meta;
