import React, { useEffect, useState } from "react";
import SoloActivityContainer from "../../../Container/Client/SoloActivityContainer/SoloActivityContainer";
import HeaderDisplay from "../../../Components/HeaderDisplay/HeaderDisplay";
import { useParams } from "react-router-dom";
import { getAllData } from "../../../constants/apiService";
import PageNotFound from "../PageNotFound/PageNotFound";

export default function SoloActivity() {
  const { activity } = useParams();

  const [soloActivityData, setSoloActivityData] = useState("");
  const [activityData, setActivityData] = useState("");

  const fetchActivity = async () => {
    try {
      const url = "/tripcategory";
      const result = await getAllData(url);
      if (result.status === 200) {
        const allCategory = result.data.data.results;
        const reqCategory = allCategory.filter((data) => {
          const filterUrl = data.title.replace(/\s/g, "");
          if (filterUrl === activity) {
            return data;
          }
        });
        console.log("reqCategory", reqCategory);
        setActivityData(reqCategory);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSoloActivity = async () => {
    try {
      const url = "/tripinfo";
      const result = await getAllData(url);
      if (result.status === 200) {
        console.log("allData", result.data.data.results);
        const allData = result.data.data.results;
        const reqData = allData.filter((data, i) => {
          const filterUrl = data.TripCategory.title.replace(/\s/g, "");
          if (filterUrl === activity) {
            return data;
          }
        });
        console.log("reqData", reqData);

        setSoloActivityData(reqData);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchActivity();
    fetchSoloActivity();
  }, []);

  return (
    <>
      {soloActivityData.length !== 0 && activityData.length !== 0 ? (
        <>
          <HeaderDisplay
            title={activityData && activityData[0].title}
            imgFile={activityData && activityData[0].image}
          />
          <SoloActivityContainer
            soloData={soloActivityData}
            selectedActivity={activity}
          />
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  );
}
