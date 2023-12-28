import React, { useEffect, useState } from "react";
import "./PopularActivities.css";
import ProductCircle from "../../../../Components/ProductCircle/ProductCircle";
import { getAllData } from "../../../../constants/apiService";

export default function PopularActivities() {
  const [activityData, setActivityData] = useState([{title:"same",image:"https://img.freepik.com/free-vector/indian-god-durga-happy-durga-puja-subh-navratri-background_1035-27514.jpg?w=900&t=st=1703775836~exp=1703776436~hmac=f992bcbc91df17421c7c212822315a60fac2d59afdc80e27eae27429ad3f3d48"},{title:"same",image:"https://img.freepik.com/free-vector/indian-god-durga-happy-durga-puja-subh-navratri-background_1035-27514.jpg?w=900&t=st=1703775836~exp=1703776436~hmac=f992bcbc91df17421c7c212822315a60fac2d59afdc80e27eae27429ad3f3d48"},{title:"same",image:"https://img.freepik.com/free-vector/indian-god-durga-happy-durga-puja-subh-navratri-background_1035-27514.jpg?w=900&t=st=1703775836~exp=1703776436~hmac=f992bcbc91df17421c7c212822315a60fac2d59afdc80e27eae27429ad3f3d48"},{title:"same",image:"https://img.freepik.com/free-vector/indian-god-durga-happy-durga-puja-subh-navratri-background_1035-27514.jpg?w=900&t=st=1703775836~exp=1703776436~hmac=f992bcbc91df17421c7c212822315a60fac2d59afdc80e27eae27429ad3f3d48"}]);

  const fetchActivity = async () => {
    try {
      const url = "/tripcategory";
      const result = await getAllData(url);
      if (result.status === 200) {
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
    <div className="popularActivities_wrapper">
      <div className="popularActivities_container">
        <div className="popularActivities_title">
          <h1>POPULAR ACTIVITIES</h1>
        </div>
        <div className="popularActivities_content">
          {Array.isArray(activityData) &&
            activityData
              .filter((item, index) => index < 5)
              .map((activity, i) => {
                let varKey = i + 1;
                let classNameVar = "pA_" + varKey + " pA_shadow";
                return (
                  <div className={classNameVar}>
                    <ProductCircle
                      level={varKey}
                      title={activity.title}
                      img={activity.image}
                    />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
