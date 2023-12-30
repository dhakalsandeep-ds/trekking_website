import React from "react";
import "./AboutUs.css";
import AboutUsContainer from "../../../Container/Client/AboutUsContainer/AboutUsContainer";
import HeaderDisplay from "../../../Components/HeaderDisplay/HeaderDisplay";
import walking from "../../../assets/aboutUs/walking.jpg"

export default function AboutUs() {
  return (
    <>
      <HeaderDisplay title="ABOUT US" imgFile={walking} textonly={false} />
      <AboutUsContainer />
    </>
  );
}
