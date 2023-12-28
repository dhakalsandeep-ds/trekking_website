import React from "react";
import "./ProductCircle.css";
import { Link } from "react-router-dom";

export default function ProductCircle(props) {
  const { level, title, img } = props;
  let linkUrl = title.replace(/\s/g, "");
  let displayLevel = "productCircle_wrapper productCircle_3";

  if (level === 1) {
    displayLevel = "productCircle_wrapper productCircle_1";
  } else if (level === 2 || level === 3) {
    displayLevel = "productCircle_wrapper productCircle_2";
  } else {
    displayLevel = "productCircle_wrapper productCircle_3";
  }
  return (
    <div className={displayLevel}>
      <Link
        to={"/activities/" + linkUrl}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <img src={img} alt="" />
        <div className="productCircle_content">
          <div className="productCircle_title">
            <h2>{title}</h2>
          </div>
          <div className="productCircle_shadow"></div>
        </div>
      </Link>
    </div>
  );
}
