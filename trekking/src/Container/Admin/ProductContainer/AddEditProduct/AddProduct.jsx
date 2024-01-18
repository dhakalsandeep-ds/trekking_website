import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import HeaderDisplay from "../../../../Components/HeaderDisplay/HeaderDisplay";


import { toast } from "react-toastify";

export default function AddProduct() {
  const [tripCategory, setTripCategory] = useState("")

  
  const [addProductDetails, setAddProductDetails] = useState({
    duration:"",
    price:"",
    imageUrl:"",
    season:"",
    destination:"",
    category:""
  });
  const [durationError,setDurationError] = useState({isError:"",message:[]})
  const [categoryError,setCategoryError] = useState({isError:"",message:[]})
  const [headingError,setHeadingError] = useState({isError:"",message:[]})
  const [priceError,setPriceError] = useState({isError:"",message:[]})
  const [seasonError,setSeasonError] = useState({isError:"",message:[]})
  const [imageUrlError,setImageUrlError] = useState({isError:"",message:[]})



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

    let errors = [];

    // Validation checks
    if (!addProductDetails.category) {
      errors.push("Category is required");
    }
  
    if (!addProductDetails.heading) {
      errors.push("Heading is required");
    }
  
    if (isNaN(addProductDetails.price) || addProductDetails.price.trim() === "") {
      errors.push("Price must be a number and is required");
    }
  
    if (!addProductDetails.imageUrl) {
      errors.push("Image URL is required");
    }
  
    if (isNaN(addProductDetails.duration) || addProductDetails.duration.trim() === "") {
      errors.push("Duration must be a number and is required");
    }
  
    if (!addProductDetails.season) {
      errors.push("Season is required");
    }
  
    // If there are any errors, set them and stop further execution
    if (errors.length > 0) {
      setCategoryError((prev) => ({ isError: errors.includes("Category is required"), message: errors.filter((error) => error.startsWith("Category")) }));
      setHeadingError((prev) => ({ isError: errors.includes("Heading is required"), message: errors.filter((error) => error.startsWith("Heading")) }));
      setPriceError((prev) => ({ isError: errors.includes("Price must be a number and is required"), message: errors.filter((error) => error.startsWith("Price")) }));
      setImageUrlError((prev) => ({ isError: errors.includes("Image URL is required"), message: errors.filter((error) => error.startsWith("Image URL")) }));
      setDurationError((prev) => ({ isError: errors.includes("Duration must be a number and is required"), message: errors.filter((error) => error.startsWith("Duration")) }));
      setSeasonError((prev) => ({ isError: errors.includes("Season is required"), message: errors.filter((error) => error.startsWith("Season")) }));
      return;
    }
    
    

    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
    }
    console.log(addProductDetails,"details.....")

    let bodyContent = JSON.stringify({
      "category": addProductDetails.category,
      "heading": addProductDetails.heading,
      "price": parseInt(addProductDetails.price),
      "imageUrl": addProductDetails.imageUrl,
      "duration": parseInt(addProductDetails.duration),
      "season": addProductDetails.season

    });

    let response = await fetch("http://localhost:8000/product/add", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });
    console.log(response.status)
    if(response.status === 200){
      let data = await response.json();
      console.log(data, "product details..........");
  
     console.log(data,"data.......")
     toast.success(data.message)
      setCategoryError({});
      setHeadingError({});
      setPriceError({});
      setImageUrlError({});
      setDurationError({});
      setSeasonError({});
    }else {
      toast.error("something went wrong")
    }
    
  

   
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

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
        <h1 style={{margin:"auto",width:"60%"}}>Edit Package</h1>
        <div className="addProduct_content">
          <form action="/">
             
          <div style={{display:"flex",justifyContent:"space-around",alignContent:"space-around",marginTop:"10px",marginBottom:"10px"}} className="apc_dropDownItem" id="apc_categorySel" >
                <div className="apc_title" style={{flexGrow:2,minWidth:"30%",maxWidth:"50%",margin:"10px"}}>
                  <label for="TripCategory"> Category:</label>
                </div>
                <div className="apc_dropDownItemList" style={{flexGrow:5,position:"relative",top:"7px",left:"-19px"}}>
                  <select style={{width:"100%"}}
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
                  {categoryError.isError && categoryError.message.map(a=> <p style={{color:"red"}}> {a}</p>)}
                </div>
                
              </div>


              <div style={{display:"flex",margin:"10px"}} id="apc_duration">
                <div  style={{flexGrow:2,minWidth:"30%",maxWidth:"50%"}}>
                  Days:
                </div>
                <div  style={{flexGrow:5}}>
                  <input style={{display:"inline-block",width:"100%"}}
                    type="number"
                    placeholder="Days"
                    name="duration"
                    value={addProductDetails.duration}
                    onChange={onChangeInAddingData}
                  />
                  {durationError.isError && durationError.message.map(a=> <p style={{color:"red"}}> {a}</p>)}
                </div>
              </div>


              <div style={{display:"flex",margin:"10px"}} id="apc_season">
                <div style={{flexGrow:2,minWidth:"30%",maxWidth:"50%"}}>
                  season
                </div>
                <div  style={{flexGrow:5}}>
                  <input style={{display:"inline-block",width:"100%"}}
                    placeholder="Season"
                    name="season"
                    onChange={onChangeInAddingData}
                    value={addProductDetails.season}
                  />
                  {seasonError.isError && seasonError.message.map(a=> <p style={{color:'red'}}> {a}</p>)}
                </div>
              </div>


            
              <div style={{display:"flex",margin:"10px"}} className="apc_textItem" id="apc_heading">
                <div className="apc_title" style={{flexGrow:2,minWidth:"30%",maxWidth:"50%"}}>Destination</div>
                <div className="apc_inputText" style={{flexGrow:5}} >
                  <input style={{display:"inline-block",width:"100%"}}
                    type="text"
                    name="heading"
                    value={addProductDetails.heading}
                    onChange={onChangeInAddingData}
                  />
                 
                </div>
                
              
              

             

              
            </div>


            <div style={{display:"flex",margin:"10px"}} className="apc_textItem" id="apc_price">
                <div className="apc_title" style={{flexGrow:2,minWidth:"30%",maxWidth:"50%"}}>
                  Price
                </div>
                <div className="apc_inputText" style={{flexGrow:5}}>
                  <input style={{display:"inline-block",width:"100%"}}
                    placeholder="Price"
                    name="price"
                    value={addProductDetails.price}
                    onChange={onChangeInAddingData}
                  />
                  {priceError.isError && priceError.message.map(a=> <p style={{color:"red"}}> {a}</p>)}
                </div>
              </div>

            

            <div
              className="apc_textItem"
              id="apc_heading"
              style={{ display:"flex" ,margin:"10px"}}
            >
              <div className="apc_title" style={{flexGrow:2,minWidth:"30%",maxWidth:"50%"}} >Image URL : </div>
              <div className="apc_inputText" style={{flexGrow:5}}>
                <input  style={{display:"inline-block",width:"100%"}}
                  type="text"
                  name="imageUrl"

                  value={addProductDetails.imageUrl}
                  onChange={onChangeInAddingData}
                />
                {imageUrlError.isError && imageUrlError.message.map(a=> <p style={{color:"red"}}> {a}</p>)}
              </div>
            </div>
                   <input
              type="submit"
              value="Add Product"
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
