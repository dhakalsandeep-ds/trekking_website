import React from "react";
import "./HeaderDisplay.css";

export default function HeaderDisplay(props) {
  const { title, textonly, subtitle, imgFile } = props;
  return (
    <div className="headerDisplay_wrapper">
      {textonly ? (
        <div className="headerDisplay_container">
          <h1>{title}</h1>
        </div>
      ) : (
        <div className="headerDisplay_imgContainer">
          <img src={imgFile} alt="" />
          <h2>{subtitle}</h2>
          <h1>{title}</h1>
          {/* <h4>Home * Location * {title} </h4> */}
        </div>
      )}
    </div>
  );
}
