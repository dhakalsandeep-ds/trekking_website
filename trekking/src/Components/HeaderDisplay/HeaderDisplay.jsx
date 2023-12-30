import React from "react";
import "./HeaderDisplay.css";

export default function HeaderDisplay(props) {
  const { title, textonly, subtitle, imgFile,isEdit} = props;
  return (
    <div className="headerDisplay_wrapper"  >
      {textonly ? (
        <div className="headerDisplay_container" style={{backgroundColor:"#063970"}}>
          <h1>{title}</h1>
        </div>
      ) : (
        <div className="headerDisplay_imgContainer">
          <img src={imgFile} alt="" />
          {!isEdit && <h2>{subtitle}</h2>}
          <h2>{title} </h2>
          <h1>{isEdit && `${props.duration} days - Rs.${props.price} - ${props.season}`}</h1>
        </div>
      )}
    </div>
  );
}
