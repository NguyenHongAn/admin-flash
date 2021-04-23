import React from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";

function UsersManagement() {
  return (
    <Layout>
      {
        <div className={styles.container}>
          <div className={styles.containerTitle}>Quản lý người dùng</div>
        </div>
      }
    </Layout>
  );
}
export default UsersManagement;
