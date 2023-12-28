import React from "react";
import "./ContactUs.css";
import HeaderDisplay from "../../../Components/HeaderDisplay/HeaderDisplay";
import ContactContainer from "../../../Container/Client/ContactContainer/ContactContainer";

export default function ContactUs() {
  return (
    <>
      <HeaderDisplay title="CONTACT US" textonly="true" />
      <ContactContainer />
    </>
  );
}
