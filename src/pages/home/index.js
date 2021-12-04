import HomeListItem from "../../components/home-page/home-job-list.js";


import { default as React, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomeList = (props) => {

  const auth = useSelector((stateItem) => stateItem?.['auth']);
  useEffect(() => {
    fetch("https://geolocation-db.com/json/", {
      method: "GET",
      headers: {},
    })
      .then((res) => {
        return res.text();
      })
      .then((location) => {
        let response = JSON.parse(location);
        sessionStorage.setItem("ip", response.IPv4);
        sessionStorage.setItem("country_code", response.country_code);
      });
  }, []);


  return (
    <HomeListItem></HomeListItem>
  );
}
export default HomeList;
