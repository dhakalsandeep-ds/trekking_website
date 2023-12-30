import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import HeaderDisplay from "../../../../Components/HeaderDisplay/HeaderDisplay";

import { FaRegClock, FaCloudSun, FaDollarSign } from "react-icons/fa";
import { MdDirectionsWalk } from "react-icons/md";


import BtnToClick from "../../../../Components/BtnToClick/BtnToClick";
import { useNavigate, useParams } from "react-router-dom";



import { toast } from "react-toastify";
import ProductDetails from "../../../../Pages/AdminView/ProductDetails/ProductDetails";




export default function EditProduct() {
  const {tripID } = useParams()


  const [tripCategory,setTripCategory] = useState("")
  const [addProductDetails, setAddProductDetails] = useState({category: "",
  heading: "",
  price: "",
  imageUrl: "",
  duration: "",
  season: ""});
  

  const fetchCategoryData = async () => {
    let headersList = {
      "Accept": "*/*",

      "Content-Type": "application/json"
    }



    let response = await fetch("http://localhost:8000/category/", {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    console.log(data,
      "category......");
    setTripCategory(data.data)
  };

  const onSubmitClick = async () => {

    let headersList = {
      "Accept": "*/*",
 
      "Content-Type": "application/json"
    }
   

    let bodyContent = JSON.stringify({
      "category": addProductDetails.category,
      "heading": addProductDetails.heading,
      "price": parseInt(addProductDetails.price),
      "imageUrl": addProductDetails.imageUrl,
      "duration": parseInt(addProductDetails.duration),
      "season": addProductDetails.season

    });

    let response = await fetch(`http://localhost:8000/product/${tripID}`, {
      method: "PUT",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    console.log(data, "updated ifno of precut.");





  };

  async function fetchEditData(id){
    let headersList = {
      "Accept": "*/*",

      "Content-Type": "application/json"
    }



    let response = await fetch(`http://localhost:8000/product/${id}`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    console.log(data,
      "cateedit......");
    setAddProductDetails(data.data)
  }

  useEffect(() => {
    console.log("Trip ID:", tripID);
    fetchEditData(tripID);
    fetchCategoryData();
    
 }, [tripID]);
 


  const onChangeInAddingData = (e) => {
    setAddProductDetails({
      ...addProductDetails,
      [e.target.name]: e.target.value,
    });

  };


  return (
    <div className="addProduct_wrapper">
      <HeaderDisplay
        textonly={false}
        title={addProductDetails.heading}
        subtitle="Edit Product"
        imgFile={addProductDetails.imageUrl}
        price = {addProductDetails.price}
        duration = {addProductDetails.duration}
        season = {addProductDetails.season}
        isEdit={true}
      />
      <div className="addProduct_container">
        <h1>Edit Package</h1>
        <div className="addProduct_content">
          <form action="/">
             
          <div className="apc_dropDownItem" id="apc_categorySel" >
                <div className="apc_title">
                  <label for="TripCategory">Trip Category:</label>
                </div>
                <div className="apc_dropDownItemList">
                  <select
                    name="category"
                    id="TripCategory"
                    value={addProductDetails.category}
                    onChange={onChangeInAddingData}
                  >
                            <option selected value="" disabled>Select an option</option>
                    {Array.isArray(tripCategory) &&
                      tripCategory.map((category, i) => {
                        return (
                          <option  value={category._id} key={i}>
                            {category.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                
              </div>


              <div className="apc_textItem" id="apc_duration">
                <div className="apc_title">
                  <FaRegClock />
                </div>
                <div className="apc_inputText" >
                  <input
                    type="number"
                    placeholder="Days"
                    name="duration"
                    value={addProductDetails.duration}
                    onChange={onChangeInAddingData}
                  />
                </div>
              </div>


              <div className="apc_textItem" id="apc_season">
                <div className="apc_title">
                  <FaCloudSun />
                </div>
                <div className="apc_inputText">
                  <input
                    placeholder="Season"
                    name="season"
                    onChange={onChangeInAddingData}
                    value={addProductDetails.season}
                  />
                </div>
              </div>


            <div className="divFlex">
              <div className="apc_textItem" id="apc_heading">
                <div className="apc_title">Destination : </div>
                <div className="apc_inputText" >
                  <input
                    type="text"
                    name="heading"
                    value={addProductDetails.heading}
                    onChange={onChangeInAddingData}
                  />
                </div>
                
              </div>
              

             

              <div className="apc_textItem" id="apc_price">
                <div className="apc_title">
                  <FaDollarSign />
                </div>
                <div className="apc_inputText">
                  <input
                    placeholder="Price"
                    name="price"
                    value={addProductDetails.price}
                    onChange={onChangeInAddingData}
                  />
                </div>
              </div>
            </div>




            

            <div
              className="apc_textItem"
              id="apc_heading"
              style={{ width: "96%" }}
            >
              <div className="apc_title">Image URL : </div>
              <div className="apc_inputText">
                <input
                  type="text"
                  name="imageUrl"

                  value={addProductDetails.imageUrl}
                  onChange={onChangeInAddingData}
                />
              </div>
            </div>

            <div className="divFlex">
             



             

             
            </div>







            <input
              type="submit"
              value="Edit Product"
              id="BtnToSubmit"
              onClick={(e) => {
                e.preventDefault();
                onSubmitClick();
              }}
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
}
