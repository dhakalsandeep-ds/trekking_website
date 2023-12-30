import React from "react";
import "./Homepage.css";
import Hero from "../../../Container/Client/Homepage/Hero/Hero";
import AboutUsHome from "../../../Container/Client/Homepage/AboutUsHome/AboutUsHome";
import PackageOffer from "../../../Container/Client/Homepage/PackageOffer/PackageOffer";
import PopularActivities from "../../../Container/Client/Homepage/PopularActivities/PopularActivities";
import Testimonial from "../../../Container/Client/Homepage/Testimonial/Testimonial";
// import AdsPanel from "../../../Components/AdsPanel/AdsPanel";

export default function Homepage() {
  return (
    <div className="homepageWrapper">
   
      <Hero />
      
      
      <AboutUsHome id="AboutUs"/>

      
      <AboutUsHome istestiomonial={true}/>
    </div>
  );
}
