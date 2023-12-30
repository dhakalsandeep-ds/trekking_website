import React from "react";
import "./ContactUs.css";
import HeaderDisplay from "../../../Components/HeaderDisplay/HeaderDisplay";
import ContactContainer from "../../../Container/Client/ContactContainer/ContactContainer";
import contactUs from '../../../assets/contactUs/contactUs.jpg'

export default function ContactUs() {
  return (
    <>
      <HeaderDisplay title="CONTACT US" imgFile={contactUs} textonly={false} />
      <ContactContainer />
    </>
  );
}
