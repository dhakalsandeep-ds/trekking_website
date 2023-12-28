import React, { useEffect, useState } from "react";
import "./PerProductInfo.css";
import HeaderDisplay from "../../../Components/HeaderDisplay/HeaderDisplay";
import PerProductContainer from "../../../Container/Client/PerProductContainer/PerProductContainer";
import { Link, useParams } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { getAllData } from "../../../constants/apiService";

export default function PerProductInfo() {
  const token = localStorage.getItem("token");
  let adminUser = false;
  if (token) {
    adminUser = true;
  }
  const { tripID } = useParams();
  const [tripData, setTripData] = useState("");

  const fetchTripData = async () => {
    try {
      const url = "/tripinfo/" + tripID;
      const result = await getAllData(url);
      if (result.status === 200) {
        console.log("tripData", result.data.data);
        setTripData(result.data.data);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTripData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="perProductInfo_wrapper">
      <HeaderDisplay
        textonly={false}
        title={tripData.heading}
        subtitle="Experience the"
        imgFile={tripData.image}
      />
      <PerProductContainer tripData={tripData} />
      {adminUser && (
        <Link to={"/admin/products/edit/" + tripID}>
          <div className="adminEditBTN">
            <MdModeEditOutline />
          </div>
        </Link>
      )}
    </div>
  );
}
