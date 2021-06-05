import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Meta from "../../components/Meta";
import routers from "../../config/routers";

function RestaurantsLincese() {
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (typeof jwt === "undefined") {
      route.push("/");
    }
  }, []);

  return (
    <Layout routers={routers}>
      <Meta title="Admin Flash - Licenses"></Meta>

      {<div></div>}
    </Layout>
  );
}
export default RestaurantsLincese;
