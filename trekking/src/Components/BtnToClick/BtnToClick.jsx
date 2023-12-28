import React from "react";
import "./BtnToClick.css";
import { Link } from "react-router-dom";

export default function BtnToClick(props) {
  const { title, customColor, url, onclicking } = props;
  let customClass = "baseBTN";
  let customStyle;

  if (customColor === "delete") {
    customClass = "deleteBTN";
  } else if (customColor === "success") {
    customClass = "successBTN";
  } else {
    customStyle = {
      backgroundColor: customColor,
    };
  }

  return (
    <Link to={url} onClick={onclicking}>
      <div className={customClass} style={customStyle}>
        {title}
      </div>
    </Link>
  );
}
