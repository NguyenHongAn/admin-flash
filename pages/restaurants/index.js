import React, { useState, useRef } from "react";
import Layout from "../../components/Layout";
import { IconButton, TextField, InputAdornment } from "@material-ui/core";
import { Icon } from "@iconify/react";
import searchIcon from "@iconify/icons-fe/search";
//components
import CreateRestaurantDialog from "../../components/CreateRestaurantDialog";
import Meta from "../../components/Meta";
import ErrorCollection from "../../config";
import clearObject from "../../utils/clearObject";

import RestaurantTable from "../../components/RestaurantTable";
//styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/views/TableListStyle";
//functions
import Service from "./services.js";
import { useRouter } from "next/router";
import routers from "../../config/routers";
import classNames from "classnames";
import { getTokenInSS, removeJwt } from "../../utils/handleAuthetication";

export async function getServerSideProps({ req, query }) {
  const { city } = query;
  const token = getTokenInSS(req);
  try {
    const { errorCode, data } = await Service.getCities(city, token);
    if (errorCode === 0) {
      return {
        props: {
          cities: data.cities,
          districts: data.districts,
        },
      };
    } else if (errorCode === ErrorCollection.INVALID_PARAM) {
      return { notFound: true };
    }
    return {
      props: {
        errorMsg: ErrorCollection.EXECUTION[errorCode],
      },
    };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      removeJwt();
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else if (typeof error.response !== "undefined") {
      return {
        props: {
          errorMsg: ErrorCollection.SERVER[error.response.status],
        },
      };
    }
    return { notFound: true };
  }
}

const useStyle = makeStyles(styles);

function RestaurantsManagement({ cities, districts, errorMsg }) {
  const classes = useStyle();
  const router = useRouter();
  const { city: selectedCity } = router.query;

  const [isOpenNewRestaurant, setIsOpenNewRestaurant] = useState(false);
  const typingTimeoutRef = useRef(null);
  const [searchString, setSearchString] = useState("");
  const [strDisplay, setStrDisplay] = useState("");
  const [reload, setReload] = useState(null);
  const handleCityChange = (e) => {
    router.push({
      pathname: `/restaurants`,
      query: clearObject({ city: e.target.value }),
    });
  };

  const handleSearchTermChange = (e) => {
    setStrDisplay(e.target.value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    console.log(e.target.value);

    typingTimeoutRef.current = setTimeout(() => {
      setSearchString(e.target.value);
    }, 700);
  };

  const handleCreateRestaurantDialog = () => {
    setIsOpenNewRestaurant(false);
    router.push({
      pathname: "/restaurants",
      query: clearObject({ city }),
    });
  };

  return (
    <Layout routers={routers}>
      <Meta title="Admin Flash - Restaurants"></Meta>
      <CreateRestaurantDialog
        open={isOpenNewRestaurant}
        handleClose={handleCreateRestaurantDialog}
        location={cities}
      ></CreateRestaurantDialog>
      {
        <div>
          <div className={classes.containerTitle}>
            <div>
              <span className={classes.total}>
                <select
                  name="city"
                  className="city-filter"
                  value={selectedCity ? selectedCity : -1}
                  onChange={handleCityChange}
                >
                  <option value="-1" disabled>
                    Th??nh ph???
                  </option>
                  {cities &&
                    cities.map((city) => (
                      <option value={city.Name} key={city._id}>
                        {city.Name}
                      </option>
                    ))}
                </select>
              </span>
            </div>
            <TextField
              onChange={handleSearchTermChange}
              name="search"
              id="search"
              value={strDisplay}
              style={{ width: "30%" }}
              placeholder="T??m ki???m nh?? h??ng"
              InputProps={{
                "aria-label": "T??m ki???m nh?? h??ng",
                endAdornment: (
                  <InputAdornment>
                    <IconButton type="submit" aria-label="search">
                      <Icon icon={searchIcon}></Icon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </div>
          <div>
            <RestaurantTable
              color="info"
              partner={false}
              search={searchString}
              selectedCity={selectedCity}
              cities={cities}
              districts={districts}
              reload={reload}
              setReload={setReload}
            ></RestaurantTable>
            <RestaurantTable
              partner={true}
              color="rose"
              search={searchString}
              selectedCity={selectedCity}
              cities={cities}
              districts={districts}
              reload={reload}
              setReload={setReload}
            ></RestaurantTable>
          </div>
        </div>
      }
    </Layout>
  );
}
export default RestaurantsManagement;
