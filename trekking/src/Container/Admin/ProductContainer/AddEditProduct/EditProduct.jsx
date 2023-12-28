import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import HeaderDisplay from "../../../../Components/HeaderDisplay/HeaderDisplay";

import { FaRegClock, FaCloudSun, FaDollarSign } from "react-icons/fa";
import { MdDirectionsWalk } from "react-icons/md";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BtnToClick from "../../../../Components/BtnToClick/BtnToClick";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteData,
  getAllData,
  updateData,
} from "../../../../constants/apiService";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "var(--dim-bg)",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function EditProduct() {
  const { tripID } = useParams();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState("");
  const [editProductDetails, setEditProductDetails] = useState();
  const [openDelete, setOpenDelete] = useState(false);

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

  const fetchTripData = async () => {
    try {
      const url = "/tripinfo/" + tripID;
      const result = await getAllData(url);

      if (result.status === 200) {
        const resData = result.data.data;
        console.log("resData101 : ", resData);
        setEditProductDetails(resData);
        setCkEditorDescription(resData.description);
        setCkEditorItinerary(resData.itinerary);
        setCkEditorCostIncludes(resData.cost_includes);
        setCkEditorCostExcludes(resData.cost_excludes);
      } else {
        toast.error("Some error occurred");
        console.log(result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
    }
  };

  const onClickDeleteBTN = async (updateID) => {
    try {
      const url = "/tripinfo/" + updateID;
      console.log(url);
      const result = await deleteData(url);
      if (result.status === 200) {
        console.log("success", result);
        navigate("/admin/products");
        toast.warn("Product is deleted");
      } else {
        toast.error("Some error occurred");
        console.log("failed", result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
    }
  };

  const onSubmitClick = async () => {
    let menuItemData = new FormData();
    menuItemData.append("categoryId", editProductDetails.categoryId);
    menuItemData.append("heading", editProductDetails.heading);
    menuItemData.append("image", editProductDetails.image);
    menuItemData.append("duration", editProductDetails.duration);
    menuItemData.append("trip_grade", editProductDetails.trip_grade);
    menuItemData.append("seasons", editProductDetails.seasons);
    menuItemData.append("price", editProductDetails.price);
    menuItemData.append("description", ckEditorDescription);
    menuItemData.append("itinerary", ckEditorItinerary);
    menuItemData.append("cost_includes", ckEditorCostIncludes);
    menuItemData.append("cost_excludes", ckEditorCostExcludes);
    menuItemData.append("overview", "overview");

    try {
      const url = "/tripinfo/" + tripID;
      const result = await updateData(url, menuItemData);
      if (result.status === 201) {
        console.log("update product", result);
        navigate("/admin/products");
        toast.success("Product is added");
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
    fetchTripData();
    // eslint-disable-next-line
  }, []);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const onChangeInEditingData = (e) => {
    setEditProductDetails({
      ...editProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="addProduct_wrapper">
      <HeaderDisplay
        textonly={false}
        title={editProductDetails ? editProductDetails.heading : "Loading ...."}
        subtitle="Edit Product"
        imgFile={editProductDetails ? editProductDetails.image : "Loading ...."}
      />
      <div className="addProduct_container">
        <h1>Edit Product</h1>
        <div className="addProduct_content">
          <form action="/">
            <div className="divFlex">
              <div className="apc_textItem" id="apc_heading">
                <div className="apc_title">Heading : </div>
                <div className="apc_inputText">
                  <input
                    type="text"
                    name="heading"
                    value={editProductDetails ? editProductDetails.heading : ""}
                    onChange={onChangeInEditingData}
                  />
                </div>
              </div>

              <div className="apc_dropDownItem" id="apc_categorySel">
                <div className="apc_title">
                  <label for="categoryId">Trip Category:</label>
                </div>
                <div className="apc_dropDownItemList">
                  <select
                    name="categoryId"
                    id="categoryId"
                    onChange={onChangeInEditingData}
                  >
                    {Array.isArray(categoryData) &&
                      editProductDetails &&
                      categoryData.map((category, i) => {
                        let selectedCategory = false;
                        if (
                          category.title ===
                          editProductDetails.TripCategory.title
                        ) {
                          selectedCategory = true;
                        }
                        return (
                          <option
                            value={category.id}
                            key={i}
                            selected={selectedCategory}
                          >
                            {category.title}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>

            {/* image uploader  */}
            {/* <div className="apc_uploadImg">
              <input type="file" id="myFile" name="filename" />
            </div> */}

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
                  value={editProductDetails ? editProductDetails.image : ""}
                  onChange={onChangeInEditingData}
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
                    value={
                      editProductDetails ? editProductDetails.duration : ""
                    }
                    onChange={onChangeInEditingData}
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
                    value={
                      editProductDetails ? editProductDetails.trip_grade : ""
                    }
                    onChange={onChangeInEditingData}
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
                    value={editProductDetails ? editProductDetails.seasons : ""}
                    onChange={onChangeInEditingData}
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
                    value={editProductDetails ? editProductDetails.price : ""}
                    onChange={onChangeInEditingData}
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
                />
              </div>
            </div>

            <input
              type="submit"
              value="Update Product"
              id="BtnToSubmit"
              onClick={(e) => {
                e.preventDefault();
                onSubmitClick();
              }}
            />
          </form>
          <BtnToClick
            title="Delete Product"
            customColor="red"
            onclicking={() => {
              handleOpenDelete();
            }}
          />
        </div>
        {/* Delete Modal */}
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h3>Are you sure want to delete this Category?</h3>
            <BtnToClick
              title="Delete"
              customColor="red"
              onclicking={() => onClickDeleteBTN(editProductDetails.id)}
            />
          </Box>
        </Modal>
      </div>
    </div>
  );
}
