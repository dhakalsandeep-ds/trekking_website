import React, { useEffect, useState } from "react";
import "./InquiryContainer.css";

import BtnToClick from "../../../Components/BtnToClick/BtnToClick";
import { MdRemoveRedEye, MdDelete } from "react-icons/md";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TitleAndData from "../../../Components/TitleAndData/TitleAndData";
import {
  deleteData,
  getAllData,
  updateData,
} from "../../../constants/apiService";
import { toast } from "react-toastify";


export default function InquiryContainer() {

  const [inquiryData, setInquiryData] = useState([{name:"sandeep",email:"dhakalsandeep71@gmail.com",phone_number:123456789},{name:"sandeep",email:"dhakalsandeep71@gmail.com",phone_number:123456789}]);
 
  const fetchInquiryData = async () => {

    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
     }
     
    
     try{
     let response = await fetch("http://localhost:8000/inquiry", { 
       method: "GET",
       headers: headersList
     });
     
     let data = await response.json();
     console.log(data,".....................");
     setInquiryData(data.data)
    }catch(e){
      console.log(e,"eroror")
    }

   
  };



  useEffect(() => {
    fetchInquiryData();
  }, []);

  const handleSeen = async(id) => {
    let headersList = {
      "Accept": "*/*",
     }
     try{
     let response = await fetch(`http://localhost:8000/inquiry/toggleSeen/${id}`, { 
       method: "POST",
       headers: headersList,
       body:JSON.stringify({})
     });
      
     if(response.ok){
      let data = await response.json();
      setInquiryData((prev)=>prev.map(p=> p._id === id ? {...p,seen:!p.seen} : p))
     }else{
      console.log(response.status,response.statusText)
     }

     
    
    }catch(e){
      console.log(e,"error ...........")
    }
  };






 

  const handleDelete = async (id) => {
    let headersList = {
      "Accept": "*/*",
     }
     try{
     let response = await fetch(`http://localhost:8000/inquiry/${id}`, { 
       method: "DELETE",
       headers: headersList
     });
     
     let data = await response.json();
     console.log(data);
     if(data.sucess === true){
     
      setInquiryData((prevInquiries) => {
         console.log("heeeeeee")
        return prevInquiries.filter((inquiry) => inquiry._id !== id)});
         toast.success(data.message)
     }else {
      toast.error(data.message)
     }
     
    }catch(e){
         toast.error("something went wrong")
    }

    // Delete the inquiry with the given ID
    // try {
    //   const response = await axios.delete(`/api/inquiries/${id}`);
    //   console.log(response.data.message);
    //   // Remove the deleted inquiry from the state
    //   setInquiries((prevInquiries) => prevInquiries.filter((inquiry) => inquiry._id !== id));
    // } catch (error) {
    //   console.error('Error deleting inquiry:', error);
    // }
  };

  return (
    <div className="inquiryA_wrapper">
      <div className="inquiryA_container">
        <h1>Inquiries</h1>
        <div className="inquiryA_content"  
      
        >
          <table id="inquiryTable" style={{backgroundColor:"#154c79"}}>
            <tr >
              <th width="5%">SN</th>
              <th width="20%">Customer Name</th>
              <th width="20%">Email</th>
              <th width="20%">Contact Number</th>
              <th width="35%">message</th>
              <th width="10%">Action</th>
            </tr>
            {Array.isArray(inquiryData) &&
              inquiryData.map((inquiry, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{inquiry.name}</td>
                    <td>{inquiry.email}</td>
                    <td>{inquiry.contactNumber}</td>
                    <td>{inquiry.message}</td>
                    <td>
                      {inquiry.seen ? (
                        <MdRemoveRedEye
                          onClick={() => {
                            handleSeen(inquiry._id);
                          }}
                          style={{ color: "green" }}
                        />
                      ) : (
                        <MdRemoveRedEye
                          onClick={() => {
                            handleSeen(inquiry._id);
                          }}
                        />
                      )}
                      <MdDelete
                        onClick={() => {
                          handleDelete(inquiry._id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
        
      </div>
    </div>
  );
}
