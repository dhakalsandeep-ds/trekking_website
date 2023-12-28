import React from "react";
import "./ImgWithDetail.css";

export default function ImgWithDetail(props) {
  const { icon, staticInfo, dynamicInfo, big, widthbig } = props;
  let containerCSS = "";
  if (widthbig) {
    containerCSS = "iwdInfoB widthbig";
  } else {
    containerCSS = "iwdInfoB";
  }
  return (
    <div className={big ? containerCSS : "iwdInfo"}>
      <div className={big ? "iwdInfo_logoB" : "iwdInfo_logo"}>{icon}</div>
      <div className={big ? "iwdInfo_detailsB" : "iwdInfo_details"}>
        <div className={big ? "iwdInfo_staticB" : "iwdInfo_static"}>
          {staticInfo}
        </div>
        <div className={big ? "iwdInfo_dynamicB" : "iwdInfo_dynamic"}>
          {dynamicInfo}
        </div>
      </div>
    </div>
  );
}
