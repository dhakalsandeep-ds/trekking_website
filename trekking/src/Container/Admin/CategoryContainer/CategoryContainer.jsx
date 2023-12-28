import React, { useEffect, useState } from "react";
import "./CategoryContainer.css";
import BtnToClick from "../../../Components/BtnToClick/BtnToClick";
import { MdModeEditOutline, MdDelete } from "react-icons/md";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  deleteData,
  getAllData,
  storeData,
  updateData,
} from "../../../constants/apiService";
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

export default function CategoryContainer() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [categoryData, setCategoryData] = useState("");
  const [soloCategoryData, setSoloCategoryData] = useState({});
  const [addCategoryData, setAddCategoryData] = useState({ priority: 1 });

  // const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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

  const fetchSoloCategoryData = async (id) => {
    try {
      const url = `/tripcategory/` + id;
      const result = await getAllData(url);

      if (result.status === 200) {
        const resData = result.data.data;
        setSoloCategoryData(resData);
      } else {
        toast.error("Some error occurred");
        console.log(result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenEdit = async (id) => {
    fetchSoloCategoryData(id);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setSoloCategoryData("");
    setOpenEdit(false);
  };

  const handleOpenDelete = (id) => {
    fetchSoloCategoryData(id);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    fetchSoloCategoryData("");
    setOpenDelete(false);
  };

  const onChange = (e) => {
    setSoloCategoryData({
      ...soloCategoryData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeInAdding = (e) => {

    if(e.target.name != 'title'){
      if(!["image/jpeg","image/png","image/jpg"].includes(e.target.files[0].type)){
        toast.error("file extenison not allowed")
        e.target.value = null;
      }

      // const result = "http://apicall.com" // api call
      // api mock 

    
      const result = {url:"https://media.wired.com/photos/5b8999943667562d3024c321/master/w_1920,c_limit/trash2-01.jpg"}
       

      setAddCategoryData({
        ...addCategoryData,
        [e.target.name]: result
      });



      return 
  
    }
    
    setAddCategoryData({
      ...addCategoryData,
      [e.target.name]: e.target.value,
    });
    
  };

  

  const onClickAddBTN = async () => {
    try {
      const url = "/tripcategory";
      const result = await storeData(url, addCategoryData);
      if (result.status === 201) {
        console.log("success", result);
        toast.success("New Category is added.");
        fetchCategoryData();
        handleCloseAdd();
      } else {
        toast.error("Some error occurred");
        console.log("failed", result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
    }
  };

  const onClickUpdateBTN = async (updateID) => {
    try {
      const url = "/tripcategory/" + updateID;
      const result = await updateData(url, soloCategoryData);
      if (result.status === 201) {
        console.log("success", result);
        toast.success("Category has been updated");
        fetchCategoryData();
        handleCloseEdit();
      } else {
        toast.error("Some error occurred");
        console.log("failed", result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
    }
  };

  const onClickDeleteBTN = async (updateID) => {
    try {
      const url = "/tripcategory/" + updateID;
      const result = await deleteData(url);
      if (result.status === 200) {
        console.log("success", result);
        toast.warn("Category is deleted.");
        fetchCategoryData();
        handleCloseDelete();
      } else {
        toast.error("Some error occurred");
        console.log("failed", result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
    }
  };

  return (
    <div className="categoryA_wrapper">
      <div className="categoryA_container">
        <h1>CATEGORY</h1>
        <div
          className="addCategory_div"
          onClick={() => {
            handleOpenAdd();
          }}
        >
          <BtnToClick title="Add Category" />
        </div>
        <div className="categoryA_content">
          <table id="categoryTable">
            <tr>
              <th width="5%">SN</th>
              <th width="80%">Category</th>
              <th width="15%">Action</th>
            </tr>
            {Array.isArray(categoryData) &&
              categoryData.map((category, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{category.title}</td>
                    <td>
                      <MdModeEditOutline
                        onClick={() => {
                          handleOpenEdit(category.id);
                        }}
                      />{" "}
                      <MdDelete
                        onClick={() => {
                          handleOpenDelete(category.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>

        {/* Add Modal  */}
        <Modal
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h3>Add Category</h3>
            <div id="modalInput">
              <input
                type="text"
                name="title"
                placeholder="Category Title"
                onChange={onChangeInAdding}
              />
              <input
                type="file"
                name="image"
                placeholder="Category Image URL"
                onChange={onChangeInAdding}
              />
              <BtnToClick title="Add" onclicking={() => onClickAddBTN()} />
            </div>
          </Box>
        </Modal>

        {/* Edit Modal */}
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h3>Edit Category : </h3>
            <div id="modalInput">
              <input
                type="text"
                name="title"
                placeholder="Category Title"
                value={soloCategoryData.title}
                onChange={onChange}
              />
              <input
                type="text"
                name="image"
                placeholder="Category Image URL"
                value={soloCategoryData.image}
                onChange={onChange}
              />
              <BtnToClick
                title="Update"
                onclicking={() => onClickUpdateBTN(soloCategoryData.id)}
              />
            </div>
          </Box>
        </Modal>

        {/* Delete Modal */}
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2>{soloCategoryData.title} </h2>
            <h3>Are you sure want to delete this Category?</h3>
            <BtnToClick
              title="Delete"
              customColor="red"
              onclicking={() => onClickDeleteBTN(soloCategoryData.id)}
            />
          </Box>
        </Modal>
      </div>
    </div>
  );
}
