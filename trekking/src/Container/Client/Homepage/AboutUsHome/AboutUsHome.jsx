import React, { useEffect, useState } from "react";
import "./AboutUsHome.css";
import { Link } from "react-router-dom";
import { getAllData } from "../../../../constants/apiService";
import HTMLReactParser from "html-react-parser";
import Testimonial from "../Testimonial/Testimonial";

export default function AboutUsHome({istestiomonial}) {


  const [aboutData, setAboutData] = useState("");

  const fetchAbout = async () => {
    try {
      const url = "/about/1";
      const result = await getAllData(url);

      if (result.status === 200) {
        const resData = result.data.data.description.slice(0, 475);
        setAboutData(resData + "....");
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);


  if(istestiomonial){
    return (
      <div className="homeAboutUs_wrapper">
      <div className="homeAboutUs_container">
        <div className="homeAboutUs_leftContainer">
       
        <h1>
           
           TESTIMONIALS <br></br>
            <span class="hide">Here is what our client says</span> 
           
                     </h1>
        </div>
        <div className="homeAboutUs_rightContainer">
        <Testimonial></Testimonial>
        


         
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className="homeAboutUs_wrapper">
      <div style={{width:"80%",margin:"auto",textAlign:"justify"}}>
        {/* <div className="homeAboutUs_leftContainer">
          <h1 >
            WELCOME TO <br />
            <span class="hide"> Rocket Trekking Nepal</span> 
          </h1>
        </div> */}
        {/* <div className="homeAboutUs_rightContainer"> */}
        
        <h3>Namaste & welcome to Nepal

Rocket Treks Nepal Pvt. Ltd. is founded by a team of experienced tour, trekking  and mountaineering professionals. We pride on our attention to detail for our personal service as we designs tailor-made travel itineraries to deliver an unique travel experiences in wild and wonderful  of the Himalayas. Our program is adventurous which is full of fun and at the same time we are committed to safety and freedom. All of our  adventure is about self  discovery  and  removing ourselves from the annoyances of daily life and embarking on a journey that may bring peace of  mind and drastic change on our lifestyle.

We are happy to say that Rocket Treks Nepal  is a reputed adventure travel, tour operator and trekking agency  which is registered and fully licensed by the Government of  Nepal. We also hold an active membership of Trekking Agencies's Association of Nepal  (TAAN), Nepal Mountaineering Association (NMA), Company Registrar (Ministry of Industry), Cottage of Small Industry, Ministry of Tourism & Civil Aviation, Department of Tax, Foreign Currency Exchange, Himalayan  General  Insurance co. Ltd. (Insurance for Staffs) and Thamel Tourism Development Council.</h3>
          <h3>
Trekking in Nepal
Trekking in the Himalayas opens up new horizons of awareness, blending physical challenge with mental relaxation and a spiritual elation inspired by splendid scenery and heartwarming human encounters. Different trekking routes offer a different range of lengths and difficulties. Some trekking routes are just a day hiking trip and some are very long and high altitude exploration over the mountain pass. It depends on the your own choice to fulfill your dream.

Trekking can be as long or short, as easy or difficult as you wish. There are two types of trek in Nepal- those where you stay in small lodges or " tea house" and those which are fully organized or "camping treks". We are a Professional trekking agency, specialize in giving you Nepal the way you want to see it. We tailor make trekking requirements with a team of well experienced hands.
</h3>


          <Link
            to={"/aboutus"}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="goBTN" style={{backgroundColor:"#063970"}}>KNOW MORE</div>
          </Link>
        {/* </div> */}
      </div>
    </div>
  );
}
