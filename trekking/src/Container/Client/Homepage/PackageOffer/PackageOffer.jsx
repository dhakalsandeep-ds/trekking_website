import React, { useEffect, useState } from "react";
import "./PackageOffer.css";
// import SearchMenu from "../../../../Components/SearchMenu/SearchMenu";
import ProductCard from "../../../../Components/ProductCard/ProductCard";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { toast } from "react-toastify";
import { getAllData } from "../../../../constants/apiService";

export default function PackageOffer() {
  const [tripData, setTripData] = useState([{TripCategory:{title:"tripCategory title"},heading:"heading",duration:"duration",image:"https://img.freepik.com/free-vector/indian-god-durga-happy-durga-puja-subh-navratri-background_1035-27514.jpg?w=900&t=st=1703775836~exp=1703776436~hmac=f992bcbc91df17421c7c212822315a60fac2d59afdc80e27eae27429ad3f3d48"},{TripCategory:{title:"tripCategory title"},heading:"heading",duration:"duration",image:"https://img.freepik.com/free-vector/indian-god-durga-happy-durga-puja-subh-navratri-background_1035-27514.jpg?w=900&t=st=1703775836~exp=1703776436~hmac=f992bcbc91df17421c7c212822315a60fac2d59afdc80e27eae27429ad3f3d48"},{TripCategory:{title:"tripCategory title"},heading:"heading",duration:"duration",image:"https://img.freepik.com/free-vector/indian-god-durga-happy-durga-puja-subh-navratri-background_1035-27514.jpg?w=900&t=st=1703775836~exp=1703776436~hmac=f992bcbc91df17421c7c212822315a60fac2d59afdc80e27eae27429ad3f3d48"},{TripCategory:{title:"tripCategory title"},heading:"heading",duration:"duration",image:"https://img.freepik.com/free-vector/indian-god-durga-happy-durga-puja-subh-navratri-background_1035-27514.jpg?w=900&t=st=1703775836~exp=1703776436~hmac=f992bcbc91df17421c7c212822315a60fac2d59afdc80e27eae27429ad3f3d48"},{TripCategory:{title:"tripCategory title"},heading:"heading",duration:"duration",image:"https://img.freepik.com/free-vector/indian-god-durga-happy-durga-puja-subh-navratri-background_1035-27514.jpg?w=900&t=st=1703775836~exp=1703776436~hmac=f992bcbc91df17421c7c212822315a60fac2d59afdc80e27eae27429ad3f3d48"},{TripCategory:{title:"tripCategory title"},heading:"heading",duration:"duration",image:"https://img.freepik.com/free-vector/indian-god-durga-happy-durga-puja-subh-navratri-background_1035-27514.jpg?w=900&t=st=1703775836~exp=1703776436~hmac=f992bcbc91df17421c7c212822315a60fac2d59afdc80e27eae27429ad3f3d48"},]);

  const getAllTripData = async () => {
    try {
      const url = "/tripinfo";
      const result = await getAllData(url);
      if (result.status === 200) {
        setTripData(result.data.data.results);
      } else {
        toast.error("Some error occurred");
      }
    } catch (err) {
      toast.error("Some error occurred");
    }
  };

  useEffect(() => {
    getAllTripData();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1270 },
      items: 4,
    },
    tablet1: {
      breakpoint: { max: 1270, min: 950 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 950, min: 720 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 720, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="packageOffer_wrapper" id="packageOffer">
      <div className="packageOffer_container">
        <div className="packageOffer_title">
          <h1>PACKAGE we OFFER</h1>
        </div>
        {/* <div className="packageOffer_searchBar">
          <SearchMenu />
        </div> */}
        <div className="packageOffer_collection">
          <Carousel responsive={responsive}>
            {Array.isArray(tripData) &&
              tripData.map((data, i) => {
                const categoryTitle = data.TripCategory.title.replace(
                  /\s/g,
                  ""
                );
                return (
                  <ProductCard
                    key={i}
                    img={data.image}
                    title={data.heading}
                    duration={data.duration}
                    
                  />
                );
              })}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
