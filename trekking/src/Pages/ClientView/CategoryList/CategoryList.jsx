import React from "react";
import "./CategoryList.css";
import HeaderDisplay from "../../../Components/HeaderDisplay/HeaderDisplay";
import ActivitiesContainer from "../../../Container/Client/ActivitiesContainer/ActivitiesContainer";
import PackageOffer from "../../../Container/Client/Homepage/PackageOffer/PackageOffer";
import activityImage from "../../../assets/productList/5.jpeg"
export default function CategoryList() {
  return (
    <>
      <HeaderDisplay imgFile={activityImage} textonly={false} title="Activities" />
      <PackageOffer/>
    </>
  );
}
