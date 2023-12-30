import React from "react";
import "./Testimonial.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TestimonialComponent from "../../../../Components/TestimonialComponent/TestimonialComponent";

export default function Testimonial() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1270 },
      items: 1,
    },
    tablet1: {
      breakpoint: { max: 1270, min: 950 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 950, min: 720 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 720, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="testimonial_wrapper">
      <div className="testimonial_title">
        <h1>Testiomonials</h1>
      </div>
      <Carousel responsive={responsive} >
        <TestimonialComponent content={"“We went on an 18 day trek (Manaslu circuit with a side trip up Tsum Valley) with Adventure Treks Nepal. The organization of all the trek details - including modification to meet our specific itinerary requests - was very professional and efficient. The Managing Director was helpful and responsive, answering all of our questions.”"} name="jenny" country="USA"/>
        <TestimonialComponent content={"Everything was organised perfectly by the Adventure Treks Nepal, unfortunately for us the weather was against us and we got snowed in. We will be back to trek in Nepal again and we will ask Gyan at Adventure Trek Nepal to help us again.Highly recommend that you enlist Gyan expertise to plan and implement your adventure in Nepal."} name={"Kevin and John"} country={"Brisben,Australia"} />
      </Carousel>
    </div>
  );
}
