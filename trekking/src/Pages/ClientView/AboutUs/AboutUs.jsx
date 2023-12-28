import React from "react";
import "./AboutUs.css";
import AboutUsContainer from "../../../Container/Client/AboutUsContainer/AboutUsContainer";
import HeaderDisplay from "../../../Components/HeaderDisplay/HeaderDisplay";

export default function AboutUs() {
  return (
    <>
      <HeaderDisplay title="ABOUT US" textonly="true" />
      <AboutUsContainer />
    </>
  );
}
