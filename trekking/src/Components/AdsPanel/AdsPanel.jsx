import React from "react";
import "./AdsPanel.css";
import ad1 from "../../assets/Ads/mahaShivarati.jpeg";
import { AiFillCloseCircle } from "react-icons/ai";

export default function AdsPanel() {
  const onCloseAd = () => {
    const adDiv = document.getElementById("adsPanel_wrapper");
    adDiv.style.display = "none";
  };

  const adToShow = true;
  return (
    <>
      {adToShow && (
        <div className="adsPanel_wrapper" id="adsPanel_wrapper">
          <div className="adsPanel_container">
            <img src={ad1} alt="" />
            <AiFillCloseCircle onClick={onCloseAd} />
          </div>
        </div>
      )}
    </>
  );
}
