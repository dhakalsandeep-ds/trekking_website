import React, { useEffect, useState } from "react";
import "./AboutUsContainer.css";
import QuickInquiry from "../../../Components/QuickInquiry/QuickInquiry";
import { getAllData } from "../../../constants/apiService";
import HTMLReactParser from "html-react-parser";


export default function AboutUsContainer() {
  const [data, setData] = useState("");
  const fetchAbout = async () => {
    try {
      const url = "/about/1";
      const result = await getAllData(url);

      if (result.status === 200) {
        const resData = result.data.data.description;
        setData(resData);
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

  return (
    <div className="aboutUs_wrapper">
      <div className="aboutUs_container">
        {/* <div className="aboutUs_title">
          <h1>ABOUT US</h1>
        </div> */}
        <p> </p>
        <div className="aboutUs_content">
          <div className="aboutUs_details">
          <h3>Namaste & welcome to Nepal

Rocket Treks Nepal Pvt. Ltd. is founded by a team of experienced tour, trekking  and mountaineering professionals. We pride on our attention to detail for our personal service as we designs tailor-made travel itineraries to deliver an unique travel experiences in wild and wonderful  of the Himalayas. Our program is adventurous which is full of fun and at the same time we are committed to safety and freedom. All of our  adventure is about self  discovery  and  removing ourselves from the annoyances of daily life and embarking on a journey that may bring peace of  mind and drastic change on our lifestyle.

We are happy to say that Rocket Treks Nepal  is a reputed adventure travel, tour operator and trekking agency  which is registered and fully licensed by the Government of  Nepal. We also hold an active membership of Trekking Agencies's Association of Nepal  (TAAN), Nepal Mountaineering Association (NMA), Company Registrar (Ministry of Industry), Cottage of Small Industry, Ministry of Tourism & Civil Aviation, Department of Tax, Foreign Currency Exchange, Himalayan  General  Insurance co. Ltd. (Insurance for Staffs) and Thamel Tourism Development Council.</h3>
          <h3>
Trekking in Nepal
Trekking in the Himalayas opens up new horizons of awareness, blending physical challenge with mental relaxation and a spiritual elation inspired by splendid scenery and heartwarming human encounters. Different trekking routes offer a different range of lengths and difficulties. Some trekking routes are just a day hiking trip and some are very long and high altitude exploration over the mountain pass. It depends on the your own choice to fulfill your dream.

Trekking can be as long or short, as easy or difficult as you wish. There are two types of trek in Nepal- those where you stay in small lodges or " tea house" and those which are fully organized or "camping treks". We are a Professional trekking agency, specialize in giving you Nepal the way you want to see it. We tailor make trekking requirements with a team of well experienced hands.
</h3>
            {HTMLReactParser(data)}</div>
        
        </div>
      </div>
    </div>
  );
}
