import React, { useEffect, useState } from "react";
import BtnToClick from "../../../Components/BtnToClick/BtnToClick";
import "./ProductContainer.css";
import ProductCard from "../../../Components/ProductCard/ProductCard";

import { getAllData } from "../../../constants/apiService";
import { MdExpandMore, MdExpandLess, MdRemoveRedEye, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { NavLink,useNavigate } from "react-router-dom";

export default function ProductContainer() {
 

  const [activityList, setActivityList] = useState([{ name: "man" }, { name: "girl" }]);



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
    <div className="productA_wrapper">
      <div className="productA_container">
        <h1>Product List</h1>
        <div className="productA_content">

          <NavLink className="button-9" to="/admin/products/add" style={{height:"40px",padding:"10px",alignText:"center",position: "relative", top: "50px", width:"90px" }} > add</NavLink>

        {Array.isArray(activityList) &&
          activityList.map((activity, i) => {
            return (
              <div className="pac_productListContainer" key={i}>
              
                <Product categoryId={activity._id} name={activity.name} />
              </div>
            );
          })}
      </div>
    </div>
    </div >
  );
}

function Product({ categoryId, name }) {
  const navigate = useNavigate()
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

  const handleEdit = (id)=>{
    navigate(`/admin/products/edit/${id}`)
}

  return (
    <div className="inquiryA_wrapper">
      <div className="inquiryA_container">
        <h1>{name}</h1>
        <div className="inquiryA_content"

        >
          <table id="inquiryTable" style={{ backgroundColor: "#154c79" }}>
            <tr >
              <th width="5%">SN</th>
              <th width="15%">Package</th>
              <th width="30%">imageUrl</th>
              <th width="150%">duration</th>
              <th width="15%">price</th>
              <th width="15%">season</th>
              <th width="15%">Action</th>
            </tr>
            {Array.isArray(products) &&
              products.map((inquiry, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{inquiry.heading}</td>
                    <td>{inquiry.imageUrl}</td>
                    <td>{inquiry.duration}</td>
                    <td>{inquiry.price}</td>
                    <td>{inquiry.season}</td>

                    <td>
                    
                        <MdRemoveRedEye
                          onClick={()=>{
                            handleEdit(inquiry._id)
                          }}
                         
                        />
                     
                      <MdDelete

                      />
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className="pac_productList" style={{ display: "grid" }}>
  //     {Array.isArray(products) &&
  //       products.map((product, j) => (
  //         <ProductCard key={j} img={product.image} title={product.heading} />
  //       ))}
  //   </div>
  // );
}
