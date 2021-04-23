import React from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";

function ListReport() {
  return (
    <Layout>
      {
        <div className={styles.container}>
          <div className={styles.containerTitle}>Danh sách khiếu nại</div>
        </div>
      }
    </Layout>
  );
}
export default ListReport;
