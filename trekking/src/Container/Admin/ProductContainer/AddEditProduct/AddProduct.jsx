import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import HeaderDisplay from "../../../../Components/HeaderDisplay/HeaderDisplay";

import { FaRegClock, FaCloudSun, FaDollarSign } from "react-icons/fa";
import { MdDirectionsWalk } from "react-icons/md";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getAllData, storeData } from "../../../../constants/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddProduct() {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState("");
  const [addProductDetails, setAddProductDetails] = useState({});
  const [ckEditorDescription, setCkEditorDescription] = useState("");
  const [ckEditorItinerary, setCkEditorItinerary] = useState("");
  const [ckEditorCostIncludes, setCkEditorCostIncludes] = useState("");
  const [ckEditorCostExcludes, setCkEditorCostExcludes] = useState("");

  const fetchCategoryData = async () => {
    try {
      const url = "/tripcategory";
      const result = await getAllData(url);

      if (result.status === 200) {
        const resData = result.data.data.results;
        // setAddProductDetails({ categoryId: resData[0].id.toString() });
        // setAddProductDetails({
        //   ...addProductDetails,
        //   ['categoryId']:resData[0].id.toString(),
        // });
        setCategoryData(resData);
      } else {
        toast.error("Some error occurred");
        console.log(result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
    }
  };

  const onSubmitClick = async () => {
    let menuItemData = new FormData();
    menuItemData.append(
      "categoryId",
      addProductDetails.TripCategory
        ? addProductDetails.TripCategory
        : categoryData[0].id.toString()
    );
    menuItemData.append("heading", addProductDetails.heading);
    menuItemData.append("image", addProductDetails.image);
    menuItemData.append("duration", addProductDetails.duration);
    menuItemData.append("trip_grade", addProductDetails.trip_grade);
    menuItemData.append("seasons", addProductDetails.seasons);
    menuItemData.append("price", addProductDetails.price);
    menuItemData.append("description", ckEditorDescription);
    menuItemData.append("itinerary", ckEditorItinerary);
    menuItemData.append("cost_includes", ckEditorCostIncludes);
    menuItemData.append("cost_excludes", ckEditorCostExcludes);
    menuItemData.append("overview", "overview");

    

    try {
      const url = "/tripinfo";
      const result = await storeData(url, menuItemData);
      if (result.status === 200) {
        console.log("success product", result);
        navigate("/admin/products");
        toast.success("New Product is added.");
      } else {
        toast.error("Some error occurred");
        console.log("failed product", result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
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

  const fileHandle = (e)=>{
    console.log(e.target.files[0].type)
      if(!["image/jpeg","image/png","image/jpg"].includes(e.target.files[0].type)){
        toast.error("file extenison not allowed")
        e.target.value = null;
      }

      // const result = "http://apicall.com" // api call
      // api mock 
      const result = {url:"https://media.wired.com/photos/5b8999943667562d3024c321/master/w_1920,c_limit/trash2-01.jpg"}
  

      setAddProductDetails({
        ...addProductDetails,
        "image": result.url,
      });
  }

  return (
    <div className="addProduct_wrapper">
      <HeaderDisplay
        textonly={false}
        title={addProductDetails.heading}
        subtitle="Add Product"
        imgFile={addProductDetails.image}
      />
      <div className="addProduct_container">
        <h1>Add Product</h1>
        <div className="addProduct_content">
          <form action="/">
            <div className="divFlex">
              <div className="apc_textItem" id="apc_heading">
                <div className="apc_title">Heading : </div>
                <div className="apc_inputText">
                  <input
                    type="text"
                    name="heading"
                    onChange={onChangeInAddingData}
                  />
                </div>
              </div>

              <div className="apc_dropDownItem" id="apc_categorySel">
                <div className="apc_title">
                  <label for="TripCategory">Trip Category:</label>
                </div>
                <div className="apc_dropDownItemList">
                  <select
                    name="TripCategory"
                    id="TripCategory"
                    onChange={onChangeInAddingData}
                  >
                    {console.log(
                      "category print : ",
                      categoryData ? categoryData[1].id : "ok"
                    )}
                    {Array.isArray(categoryData) &&
                      categoryData.map((category, i) => {
                        return (
                          <option value={category.id} key={i}>
                            {category.title}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>

            {/* image uploader */}
            <div className="apc_uploadImg">
              <input type="file" id="myFile"  name="filename" onChange={fileHandle}/>
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
                  name="image"
                  disabled
                  value={addProductDetails.image }
                  onChange={onChangeInAddingData}
                />
              </div>
            </div>

            <div className="apc_textAreaItem">
              <div className="apc_title">Description : </div>
              <div className="apc_textArea">
                <CKEditor
                  editor={ClassicEditor}
                  id="apc_description"
                  data={ckEditorDescription}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setCkEditorDescription(data);
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </div>
            </div>

            <div className="divFlex">
              <div className="apc_textItem" id="apc_duration">
                <div className="apc_title">
                  <FaRegClock />
                </div>
                <div className="apc_inputText">
                  <input
                    type="number"
                    placeholder="Days"
                    name="duration"
                    onChange={onChangeInAddingData}
                  />
                </div>
              </div>

              <div className="apc_textItem" id="apc_grade">
                <div className="apc_title">
                  <MdDirectionsWalk />
                </div>
                <div className="apc_inputText">
                  <input
                    placeholder="Trip Grade"
                    name="trip_grade"
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
                    name="seasons"
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
                    onChange={onChangeInAddingData}
                  />
                </div>
              </div>
            </div>

            <div className="apc_textAreaItem">
              <div className="apc_title">Itinerary : </div>
              <div className="apc_textArea">
                <CKEditor
                  editor={ClassicEditor}
                  id="apc_itinerary"
                  data={ckEditorItinerary}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setCkEditorItinerary(data);
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </div>
            </div>

            <div className="apc_textAreaItem">
              <div className="apc_title">Cost Includes : </div>
              <div className="apc_textArea">
                <CKEditor
                  editor={ClassicEditor}
                  id="apc_costIncludes"
                  data={ckEditorCostIncludes}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setCkEditorCostIncludes(data);
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </div>
            </div>

            <div className="apc_textAreaItem">
              <div className="apc_title">Cost Excludes : </div>
              <div className="apc_textArea">
                <CKEditor
                  editor={ClassicEditor}
                  id="apc_costExcludes"
                  data={ckEditorCostExcludes}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setCkEditorCostExcludes(data);
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
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
