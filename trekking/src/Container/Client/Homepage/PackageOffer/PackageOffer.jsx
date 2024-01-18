import React, { useEffect, useState } from "react";
import "./PackageOffer.css";
import ProductCard from "../../../../Components/ProductCard/ProductCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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



export default function PackageOffer() {
  const [activityList, setActivityList] = useState([{ name: "no data" }]);



  const fetchActivity = async () => {
    try {
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      let response = await fetch("http://localhost:8000/category", {
        method: "GET",
        headers: headersList,
      });

      let data = await response.json();
      console.log(data, "...........");
      setActivityList(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

 

  useEffect(() => {
    fetchActivity();

  }, []);








  

  return (
    <>
     {Array.isArray(activityList) && activityList.map((p)=>{
       return <div > <Product categoryId={p._id} name={p.name}></Product> </div>
     })}
    </>
  );
}

function Product({ categoryId,name}) {
  const [products, setProducts] = useState([]);

  const fetchSoloActivity = async (id) => {
    try {
      let headersList = {
        Accept: "*/*",
      };

      let response = await fetch(`http://localhost:8000/product/category/${id}`, {
        method: "GET",
        headers: headersList,
      });

      let data = await response.json();
      console.log(data, "second.....");
      setProducts(data.data);
    } catch (error) {
      console.error(`Error fetching products for category ${id}:`, error);
    }
  };

  useEffect(() => {
    fetchSoloActivity(categoryId);
  }, [categoryId]);



  return (
   
    <div className="packageOffer_container">
      <div className="packageOffer_title">
        <h1>{name}</h1>
      </div>
  

        <Carousel responsive={responsive} style={{border:"1px solid black"}}>
          {Array.isArray(products) &&
            products.map((data, i) => {
            
              return (
                <ProductCard
                  tlink={true}
                  link={`/perProduct/${data._id}`}
                  key={i}
                  img={data.imageUrl}
                  title={data.heading}
                  duration={data.duration}
                  
                />
              );
            })}
        </Carousel>
    
    </div>
  
  )

}
