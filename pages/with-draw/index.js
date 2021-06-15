import React, { useState, useRef, useEffect } from "react";
import Layout from "../../components/Layout";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
} from "@material-ui/core";

import BlockUserDialog from "../../components/BlockUserDialog";
import Service from "./services";
import Pagination from "../../components/Pagination";
import ErrorCollection from "../../config";
import RatingStar from "../../components/RatingStar";
import Meta from "../../components/Meta";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
//style
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/views/TableListStyle";
//function
import { useRouter } from "next/router";
import clearObject from "../../utils/clearObject";
import routers from "../../config/routers";
import getTokenInSS from "../../utils/handldAutheticaion";

export async function getServerSideProps({ req, query }) {
  const { page } = query;
  const token = getTokenInSS(req);
  try {
    const { errorCode, data, pagingInfo } = await Service.getWithDrawList(
      page,
    //   email,
    //   phone,
      token
    );
    if (errorCode === 0) {
      return {
        props: {
          totalShipper: data.totalShipper,
          shippers: data.shippers,
          totalPage: pagingInfo.totalPage,
          currentPage: pagingInfo.currentPage,
          perPage: pagingInfo.perPage,
        },
      };
    } else if (errorCode === ErrorCollection.INVALID_PARAM) {
      return { notFound: true };
    } else {
      return {
        props: {
          errorType: "error",
          errorMsg: ErrorCollection.EXECUTION[errorCode],
        },
      };
    }
  } catch (error) {
    console.log(error.message);
    if (error.response && error.response.status === 401) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else if (typeof error.response !== "undefined") {
      return {
        props: {
          errorType: "error",
          errorMsg: ErrorCollection.SERVER[error.response.status],
        },
      };
    }
    return { notFound: true };
  }
}

const useStyles = makeStyles(styles);

//tên, role, số điện thoại, số tiền yêu cầu rút, số tiền hiện tại trong ví
function WithDraw() {
  //const [phoneFilter, setPhoneFilter] = useState("");
  const router = useRouter();
//   const handlePhoneFilterChange = (e) => {
//     setPhoneFilter(e.target.value);

//     if (typingTimeoutRef.current) {
//       clearTimeout(typingTimeoutRef.current);
//     }
//     typingTimeoutRef.current = setTimeout(() => {
//       router.push({
//         pathname: "/with-draw",
//         query: clearObject({ page, phone: e.target.value }),
//       });
//     }, 700);
//   };
  return (
    <Layout routers={routers}>
      <Meta title="Flash Admin - Shipper"></Meta>
    </Layout>
  );
}
export default WithDraw;
