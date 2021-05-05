import React from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";
import Head from "next/head";

function RestaurantsLincese() {
  return (
    <Layout>
      <Head>
        <title> Admin Flash - Licenses</title>
        <link href="/Logo.png" rel="icon" />
      </Head>
      {
        <div className={styles.container}>
          <div className={styles.containerTitle}>
            Cấp quyền quản lý nhà hàng
          </div>
        </div>
      }
    </Layout>
  );
}
export default RestaurantsLincese;
