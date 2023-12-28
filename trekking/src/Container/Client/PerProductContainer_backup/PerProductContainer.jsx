import React from "react";
import "./PerProductContainer.css";
import ProductBookMenu from "../../../Components/ProductBookMenu/ProductBookMenu";
import ImgWithDetail from "../../../Components/ImgWithDetail/ImgWithDetail";

import { PerProductData } from "../../../Data/PerProductData";

import { FaRegClock, FaCloudSun } from "react-icons/fa";
import { MdDirectionsWalk } from "react-icons/md";

export default function PerProductContainer() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div className="perProductContainer_wrapper">
      <div className="perProductContainer_container">
        <div className="perProductContainer_content">
          <p>{PerProductData.Description}</p>

          <h2 className="ppc_tripInfo_h2">TRIP INFORMATION</h2>
          <div className="ppc_tripInfo">
            <ImgWithDetail
              icon={<FaRegClock />}
              staticInfo="Duration"
              dynamicInfo="23 Days"
              big={true}
            />
            <ImgWithDetail
              icon={<MdDirectionsWalk />}
              staticInfo="Trip Grade"
              dynamicInfo="Easy"
              big={true}
            />
            <ImgWithDetail
              icon={<FaCloudSun />}
              staticInfo="Season"
              dynamicInfo="All Year, Summer, Autumn, Spring"
              big={true}
              widthbig={true}
            />
          </div>

          <h2>ITINERARY</h2>
          <div className="ppc_itinerary">
            <p>{PerProductData.Description}</p>
          </div>

          <h2>COST INFO</h2>
          <div className="ppc_costInfo">
            <h3>COST INCLUDES</h3>
            <ul>
              {PerProductData.CostIncludes.map((data, i) => {
                return <li key={i}>{data}</li>;
              })}
            </ul>
            <h3>COST EXCLUDES</h3>
            <ul>
              {PerProductData.CostExcludes.map((data, i) => {
                return <li key={i}>{data}</li>;
              })}
            </ul>
          </div>
        </div>
        <div className="perProductContainer_order">
          <ProductBookMenu />
        </div>
      </div>
    </div>
  );
}
