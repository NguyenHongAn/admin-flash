import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Service from "./services";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  Slide,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Table,
  DialogTitle,
  TextField,
  Grid,
  IconButton,
} from "@material-ui/core";
import ErrorCollection from "../../config";
import Button from "../../components/CustomButtons/Button";
import { useRouter } from "next/router";
import ToastAction from "../../store/actions/toast.A";
import { removeJwt } from "../../utils/handleAuthetication";
import Icon from "@iconify/react";
import add12Filled from "@iconify/icons-fluent/add-12-filled";
import { makeStyles } from "@material-ui/core";
import settingStyle from "../../assets/jss/components/settingStyle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyle = makeStyles(settingStyle);
function SettingDialog({ open, handleClose }) {
  const dispatch = useDispatch();
  const [id, setID] = useState("");
  const [shippingFee, setShippingFee] = useState([]);
  const [onFocus, setOnfocus] = useState(-1);
  const router = useRouter();
  const classes = useStyle();

  const formik = useFormik({
    initialValues: {
      shipperPercent: 0,
      merchantPercent: 0,
      delayDay: 0,
    },
    validationSchema: Service.validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { shipperPercent, merchantPercent, delayDay } = values;

        const { errorCode, data } = await Service.updateSetting({
          id,
          shipperPercent,
          merchantPercent,
          delayDay,
          shippingFee,
        });
        console.log({ errorCode, data });
        if (errorCode === 0) {
          resetForm();
          dispatch(
            ToastAction.displayInfo(
              "success",
              "Cập nhật cài đặt phí dịch vụ thành công"
            )
          );
        } else {
          dispatch(
            ToastAction.displayInfo(
              "error",
              ErrorCollection.EXECUTION[errorCode]
            )
          );
        }
        handleClose();
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
          router.push("/");
          removeJwt();
        }
        error.response
          ? dispatch(
              ToastAction.displayInfo(
                "error",
                ErrorCollection.SERVER[error.response.status]
              )
            )
          : null;
      }
    },
  });

  const handleShippingFeeChange = (e, property, index) => {
    const temp = [...shippingFee];
    const value = parseInt(e.target.value) || 0;
    temp[index][property] = value;

    setOnfocus(value);
    setShippingFee(temp);
  };

  const addMoreCell = () => {
    setShippingFee([...shippingFee, {}]);
  };

  useEffect(() => {
    (async () => {
      try {
        const { errorCode, data } = await Service.getSetting();

        if (errorCode === 0) {
          formik.setFieldValue("shipperPercent", data.PercentFeeShipper);
          formik.setFieldValue("merchantPercent", data.PercentFeeMerchant);
          formik.setFieldValue("delayDay", data.MAX_DAY_DELAY_PAY_RECEIPT);
          setShippingFee(data.ShippingFee);
          setID(data._id);
        } else {
          dispatch(
            ToastAction.displayInfo("error", ErrorCollection[errorCode])
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [open]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="sm"
      fullWidth
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title" align="center">
        Chỉnh sửa Phí dịch vụ
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          component="form"
          onSubmit={formik.handleSubmit}
          spacing={1}
        >
          <Grid item container>
            <Grid item sm={4}>
              Tài xế:{" "}
            </Grid>
            <Grid item sm={8}>
              <TextField
                fullWidth
                variant="outlined"
                required
                id="shipperPercent"
                name="shipperPercent"
                value={formik.values.shipperPercent}
                onChange={formik.handleChange}
                error={
                  formik.errors.shipperPercent &&
                  formik.touched.shipperPercent &&
                  true
                }
                label={formik.errors.shipperPercent}
              ></TextField>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item sm={4}>
              Nhà hàng:{" "}
            </Grid>
            <Grid item sm={8}>
              <TextField
                fullWidth
                variant="outlined"
                required
                id="merchantPercent"
                name="merchantPercent"
                value={formik.values.merchantPercent}
                onChange={formik.handleChange}
                error={
                  formik.errors.merchantPercent &&
                  formik.touched.merchantPercent &&
                  true
                }
                label={formik.errors.merchantPercent}
              ></TextField>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item sm={4}>
              Ngày thanh toán:{" "}
            </Grid>
            <Grid item sm={8}>
              <TextField
                fullWidth
                variant="outlined"
                required
                id="delayDay"
                name="delayDay"
                value={formik.values.delayDay}
                onChange={formik.handleChange}
                error={
                  formik.errors.delayDay && formik.touched.delayDay && true
                }
                label={formik.errors.delayDay}
              ></TextField>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item sm={12}>
              Phí dịch vụ vận chuyển:
            </Grid>
            <Table>
              <TableHead></TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    Khoảng cách(km):
                  </TableCell>
                  {shippingFee &&
                    shippingFee.map((obj, index) => (
                      <TableCell
                        className={classes.tableCell}
                        key={obj.MaxDistance}
                      >
                        <input
                          type="text"
                          autoFocus={obj.MaxDistance === onFocus}
                          value={obj.MaxDistance ? obj.MaxDistance : 0}
                          className={classes.input}
                          id={`distance_${index}`}
                          onChange={(e) =>
                            handleShippingFeeChange(e, "MaxDistance", index)
                          }
                        ></input>
                      </TableCell>
                    ))}
                  <TableCell className={classes.tableCell}>
                    <IconButton
                      color="primary"
                      component="span"
                      onClick={addMoreCell}
                    >
                      <Icon icon={add12Filled}></Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    Phí(đồng):
                  </TableCell>
                  {shippngFee &&
                    shippingFee.map((obj, index) => (
                      <TableCell className={classes.tableCell} key={obj.Fee}>
                        <input
                          type="text"
                          id={`fee_${index}`}
                          className={classes.input}
                          autoFocus={obj.Fee === onFocus}
                          value={obj.Fee ? obj.Fee : 0}
                          onChange={(e) =>
                            handleShippingFeeChange(e, "Fee", index)
                          }
                        ></input>
                      </TableCell>
                    ))}
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid
            container
            justify="center"
            spacing={1}
            style={{ marginTop: "10px" }}
          >
            <Button
              onClick={() => {
                handleClose();
                formik.resetForm();
              }}
              style={{ width: "20%" }}
            >
              Huỷ
            </Button>

            <Button type="submit" color="info" style={{ width: "20%" }}>
              Chỉnh sửa
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
export default SettingDialog;
