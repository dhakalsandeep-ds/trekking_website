import React from "react";
import "./PerProductContainer.css";
import ProductBookMenu from "../../../Components/ProductBookMenu/ProductBookMenu";
import ImgWithDetail from "../../../Components/ImgWithDetail/ImgWithDetail";

import { FaRegClock, FaCloudSun } from "react-icons/fa";
import { MdDirectionsWalk } from "react-icons/md";
import HTMLReactParser from "html-react-parser";

export default function PerProductContainer(props) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const { tripData } = props;
  return (
    <div className="perProductContainer_wrapper">
      <div className="perProductContainer_container">
        <div className="perProductContainer_content">
          <p>
            {tripData ? HTMLReactParser(tripData.description) : "Loading...."}
          </p>

          <h2 className="ppc_tripInfo_h2">TRIP INFORMATION</h2>
          <div className="ppc_tripInfo">
            <ImgWithDetail
              icon={<FaRegClock />}
              staticInfo="Duration"
              dynamicInfo={tripData.duration + " Days"}
              big={true}
            />
            <ImgWithDetail
              icon={<MdDirectionsWalk />}
              staticInfo="Trip Grade"
              dynamicInfo={tripData.trip_grade}
              big={true}
            />
            <ImgWithDetail
              icon={<FaCloudSun />}
              staticInfo="Season"
              dynamicInfo={tripData.seasons}
              big={true}
              widthbig={true}
            />
          </div>

          <h2>ITINERARY</h2>
          <div className="ppc_itinerary">
            <p>
              {tripData ? HTMLReactParser(tripData.itinerary) : "Loading...."}
            </p>
          </div>

          <h2>COST INFO</h2>
          <div className="ppc_costInfo">
            <h3>COST INCLUDES</h3>
            <ul>
              {tripData
                ? HTMLReactParser(tripData.cost_includes)
                : "Loading...."}
            </ul>
            <h3>COST EXCLUDES</h3>
            <ul>
              {tripData
                ? HTMLReactParser(tripData.cost_excludes)
                : "Loading...."}
            </ul>
          </div>
        </div>
        <div className="perProductContainer_order">
          <ProductBookMenu tripData={tripData} />
        </div>
      </div>
    </div>
  );
}
