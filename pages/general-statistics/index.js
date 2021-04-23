import React from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";

function GeneralStatistic() {
  return (
    <Layout>
      {
        <div className={styles.container}>
          <div className="container__title"> Thống kê chung</div>
          <div></div>
        </div>
      }
    </Layout>
  );
}
export default GeneralStatistic;
