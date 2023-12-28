import React, { useEffect, useState } from "react";
import BtnToClick from "../../../Components/BtnToClick/BtnToClick";
import "./ProductContainer.css";
import ProductCard from "../../../Components/ProductCard/ProductCard";

import { getAllData } from "../../../constants/apiService";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { toast } from "react-toastify";

export default function ProductContainer() {
  const [allActivityData, setAllActivityData] = useState("");
  const [activityList, setActivityList] = useState("");

  const [expandedDiv, setExpandedDiv] = useState({});

  const handleClick = (divId) => {
    if (expandedDiv[divId]) {
      setExpandedDiv({ ...expandedDiv, [divId]: false });
    } else {
      setExpandedDiv({ ...expandedDiv, [divId]: true });
    }
  };

  const fetchActivity = async () => {
    try {
      const url = "/tripcategory";
      const result = await getAllData(url);
      if (result.status === 200) {
        const allCategory = result.data.data.results;
        console.log("allCategory", allCategory);
        setActivityList(allCategory);
      } else {
        toast.error("Some error occurred");
        console.log(result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
    }
  };

  const fetchAllActivityItems = async () => {
    try {
      const url = "/tripinfo";
      const result = await getAllData(url);
      if (result.status === 200) {
        const allData = result.data.data.results;
        console.log("allData", allData);
        setAllActivityData(allData);
      } else {
        toast.error("Some error occurred");
        console.log(result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
    }
  };

  const fetchSoloActivity = (reqActivity) => {
    try {
      // eslint-disable-next-line
      const reqData = allActivityData.filter((data, i) => {
        const filterUrl = data.TripCategory.title;
        if (filterUrl === reqActivity) {
          return data;
        }
      });
      return reqData;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchActivity();
    fetchAllActivityItems();
  }, []);

  const viewMoreLess = (id) => {
    const divSelected = document.getElementById(id).style.display;
    if (divSelected === "none") {
      document.getElementById(id).style.display = "grid";
    } else {
      document.getElementById(id).style.display = "none";
    }
  };

  return (
    <div className="productA_wrapper">
      <div className="productA_container">
        <h1>Product List</h1>
        <div className="productA_content">
          <BtnToClick title="Add Product" url="/admin/products/add" />

          {Array.isArray(activityList) &&
            activityList.map((activity, i) => {
              const printableData = fetchSoloActivity(activity.title);
              const filterUrl = activity.title.replace(/\s/g, "");
              return (
                <div className="pac_productListContainer" key={i}>
                  <div className="pac_categoryViewer">
                    <div className="pac_categoryTitle">
                      <h3>{activity.title}</h3>
                    </div>
                    <div
                      className="pac_expandBTN"
                      id={"btn_" + filterUrl}
                      onClick={() => {
                        viewMoreLess(filterUrl);
                        handleClick("btn_" + filterUrl);
                        console.log("expandedDiv", expandedDiv);
                      }}
                    >
                      {expandedDiv["btn_" + filterUrl] ? (
                        <MdExpandLess />
                      ) : (
                        <MdExpandMore />
                      )}
                    </div>
                  </div>

                  <div
                    className="pac_productList"
                    id={filterUrl}
                    style={{ display: "grid" }}
                  >
                    {Array.isArray(printableData) &&
                      printableData.map((printData, j) => {
                        return (
                          <ProductCard
                            img={printData.image}
                            title={printData.heading}
                            link={
                              "/activities/" + filterUrl + "/" + printData.id
                            }
                            tLink={true}
                            key={j}
                          />
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
