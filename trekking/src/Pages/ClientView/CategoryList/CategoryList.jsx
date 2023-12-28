import React from "react";
import "./CategoryList.css";
import HeaderDisplay from "../../../Components/HeaderDisplay/HeaderDisplay";
import ActivitiesContainer from "../../../Container/Client/ActivitiesContainer/ActivitiesContainer";
import PackageOffer from "../../../Container/Client/Homepage/PackageOffer/PackageOffer";
export default function CategoryList() {
  return (
    <>
      <HeaderDisplay textonly={true} title="Activities" />
      <PackageOffer/>
    </>
  );
}
