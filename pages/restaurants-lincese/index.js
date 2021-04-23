import React from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";

function RestaurantsLincese() {
  return (
    <Layout>
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
