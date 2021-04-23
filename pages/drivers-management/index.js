import React from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";

function DriversManagement() {
  return (
    <Layout>
      {
        <div className={styles.container}>
          <div className={styles.containerTitle}> Quản lý tài xế</div>
        </div>
      }
    </Layout>
  );
}
export default DriversManagement;
