import React from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";

function RestaurantsManagement() {
  return (
    <Layout>
      {
        <div className={styles.container}>
          <div className={styles.containerTitle}>Quản lý nhà hàng</div>
        </div>
      }
    </Layout>
  );
}
export default RestaurantsManagement;
