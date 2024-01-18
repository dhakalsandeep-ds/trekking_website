import React, { useEffect, useState } from "react";
import "./CategoryContainer.css";

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
  const [edit,setEdit] = useState("")
  const [editId,setEditId] = useState("")
  const [add, setAdd] = useState("")

  const [categoryData, setCategoryData] = useState("");
  const [soloCategoryData, setSoloCategoryData] = useState({});
  const [addCategoryData, setAddCategoryData] = useState({ priority: 1 });



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
    setCategoryData(data.data)


    
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
    const ans = categoryData.filter(p=>p._id === id)
    console.log(ans,"ans.........")
    setEdit(ans[0].name)
    setEditId(id)
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

 


  const handleAddCateogry = async (e) => {
    e.preventDefault()
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }
    console.log("add handle category.....")

    let bodyContent = JSON.stringify({
      "name": add
    });

    let response = await fetch("http://localhost:8000/category/", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });
    
    console.log(response.status)
    if(response.status === 202){
      let data = await response.json();

      console.log("inside 202")
      console.log(data);
      toast.success("added")
      fetchCategoryData()
    }else {
      toast.error("something went wrong!")
    }
    console.log("end....")
  
  }
  const handleDelete = async(id) => {
    let headersList = {
      "Accept": "*/*"
     }
     
     let response = await fetch(`http://localhost:8000/category/${id}`, { 
       method: "DELETE",
       headers: headersList
     });
     
     let data = await response.json();
     
     console.log(data,"deleted......");
     setCategoryData(prev=>prev.filter(p=>p._id !== id))
  }

  const handleEditSumbit = async(e)=>{
    let headersList = {
      "Accept": "*/*",
     
      "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify({
       "name":edit
     });
     
     let response = await fetch(`http://localhost:8000/category/${editId}`, { 
       method: "POST",
       body: bodyContent,
       headers: headersList
     });
     
     if(response.status === 200){
      let data = await response.json();
      console.log(data,"edit data");
      toast.success(`${data.message}`)
      setCategoryData(prev => prev.map(p=>p._id === editId ? {...p,name:edit} : p))
     }else{
      toast.error(`${response.status} - ${response.statusText}`)
     }
     
     
  }

  return (
    <div className="categoryA_wrapper">
      <div className="categoryA_container">
        <h1>CATEGORY</h1>
      
        
          <input           onClick={() => {
            handleOpenAdd();
          }} type="button" className="button-9" value="add"/>
       
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
                    <td>{category.name}</td>
                    <td>
                      <MdModeEditOutline
                        onClick={() => {
                          handleOpenEdit(category._id);
                        }}
                      />{" "}
                      <MdDelete
                        onClick={() => {
                          handleDelete(category._id);
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
                value={add}
                onChange={(e) => setAdd(e.target.value)}
              />
              <input
                type="submit"
                name="submit"
                value="add"
                class='button-contact'
                style={{color:"white"}}
                onClick={(e)=>handleAddCateogry(e)}
              // onChange={handleSubmit()}
              />

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
                value={edit}
                onChange={(e)=>setEdit(e.target.value)}
              />
           
             <input type="button" class="button-contact" style={{color:"white"}} value="submit" onClick={handleEditSumbit} />
            </div>
          </Box>
        </Modal>

       
      </div>
    </div>
  );
}
