import React from "react";
import "./TestimonialComponent.css";

export default function TestimonialComponent({content,name,country}) {
  return (
    <section  >
     
       

        <p className="testimonial_content">
         {content}
        </p>
        
        <h2 className="testimonial_fullname testimonial_position">{name}, { country}</h2>
        
      
    </section>
  );
}
