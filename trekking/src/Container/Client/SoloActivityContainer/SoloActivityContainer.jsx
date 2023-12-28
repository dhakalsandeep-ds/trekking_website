import React from "react";
import "./SoloActivityContainer.css";

import ProductCard from "../../../Components/ProductCard/ProductCard";

export default function SoloActivityContainer(props) {
  const { soloData, selectedActivity } = props;

  return (
    <div className="categoryList_wrapper">
      <div className="categoryList_container">
        <div className="categoryList_content">
          {Array.isArray(soloData) &&
            soloData.map((activity, i) => {
              return (
                <ProductCard
                  img={activity.image}
                  title={activity.heading}
                  duration={activity.duration}
                  link={"/activities/" + selectedActivity + "/" + activity.id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
