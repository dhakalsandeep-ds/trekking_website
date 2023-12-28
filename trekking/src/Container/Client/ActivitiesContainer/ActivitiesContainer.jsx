import React, { useEffect, useState } from "react";
import "./ActivitiesContainer.css";

import ProductCard from "../../../Components/ProductCard/ProductCard";
import { getAllData } from "../../../constants/apiService";

export default function ActivitiesContainer() {
  const [activityData, setActivityData] = useState([{title:"ad",TripCategory:{title:"tripCategory title"},heading:"heading",duration:"duration",image:"https://img.freepik.com/free-vector/indian-god-durga-happy-durga-puja-subh-navratri-background_1035-27514.jpg?w=900&t=st=1703775836~exp=1703776436~hmac=f992bcbc91df17421c7c212822315a60fac2d59afdc80e27eae27429ad3f3d48"},]);

  const fetchActivity = async () => {
    try {
      const url = "/tripcategory";
      const result = await getAllData(url);
      if (result.status === 200) {
        console.log("hello", result.data.data.results);
        setActivityData(result.data.data.results);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <div className="categoryList_wrapper">
      <div className="categoryList_container">
        <div className="categoryList_content">
          {Array.isArray(activityData) &&
            activityData.map((activity, i) => {
              let linkUrl = activity.title.replace(/\s/g, "");
              return (
                <ProductCard
                  img={activity.image}
                  title={activity.title}
                  link={"/activities/" + linkUrl}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
