import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const { img, title, duration, link, tLink, key } = props;
  return (
    <div className="productCard_wrapper" key={key}>
      <div className="productCard_container">
        <img src={img} alt="" />
        <div className="productCard_contents">
          <div className="productCard_info">
            <div className="productCard_title">
              {tLink ? (
                <Link to={link} target="_blank">
                  <h2>{title}</h2>
                </Link>
              ) : (
                <Link to={link}>
                  <h2>{title}</h2>
                </Link>
              )}
            </div>
            <div className="productCard_duration">
              <h4>{duration ? duration + " Days" : <br />} - Rs. 40  - autumn</h4>
              
            </div>
          </div>
          <div className="productCard_shadow"></div>
        </div>
      </div>
    </div>
  );
}
