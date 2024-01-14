import React, { useContext, useEffect, useState } from "react";
import "./ContactContainer.css";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { MdModeEditOutline } from "react-icons/md";
import { MdLocationOn, MdCall, MdEmail } from "react-icons/md";
import BtnToClick from "../../../Components/BtnToClick/BtnToClick";
import { getAllData, updateData } from "../../../constants/apiService";
import { toast } from "react-toastify";
import AuthContext from "../../../AuthState";

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

export default function ContactContainer() {
  // const {user} = useContext(AuthContext)


  const [email,setEmail] = useState("")
  const [isEmailError, setIsEmailError] = useState({error:"",message:[]})

  const [phone,setPhone] = useState("")
  const [isPhoneError, setIsPhoneError] = useState({error:"",message:[]})

  const [location,setLocation] = useState("")

  const handleEmail = (e) => {
   if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    console.log('inside handle email')
    setIsEmailError({error:true,message:["email is invalid"]})
   }else{
    setIsEmailError({error:false,message:[]})
   }
    console.log(e.target.value)
    setEmail(e.target.value)
  }

  const handlePhone = (e) => {
    if(!/^[0-9]{8}$|^[0-9]{10}$/.test(phone)){
     console.log('inside handle phone')
     setIsPhoneError({error:true,message:["must not contain letter and must be of 8 or 10 digits"]})
    }else{
     setIsPhoneError({error:false,message:[]})
    }
     console.log(e.target.value)
     setPhone(e.target.value)
   }

   const handleSubmit =(e) => {
    e.preventDefault()
    async function call(){
      let headersList = {
        "Accept": "application/json",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
         "email":email,
         "contact":phone,
         "location":location
       });
       try{
       let response = await fetch("http://localhost:8000/contact", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.json();
      const newLocal = "..............";
       console.log(data,newLocal);
       if(data.success === true){
        toast.success(data.message)
       }else {
        toast.error(data.message)
       }
       
      }catch(e){
        console.log(e)
        console.log(e.message)
        toast.error(e)
      }
    }
    call()
   }
  // console.error(user,"user form dat fetched background")
  return (
   
    <>
    <div className="form-box">
  
  <form>
    <div className="field1">
      <label> Contact Info </label>
      {/* <input type="text" value={user.email} /> */}
      <input placeholder="Email" value={email} onChange={(e)=>{handleEmail(e)}}/>
      <p>
        {isEmailError.error && isEmailError.message.map((msg)=>{
          console.log("inside email error")
          return <span> {msg}</span>
        })}
      </p>
      <input placeholder="Phone" value={phone} onChange={(e)=>{handlePhone(e)}} />
      <p>
        {isPhoneError.error && isPhoneError.message.map((msg)=>{
          console.log("inside email error")
          return <span> {msg}</span>
        })}
      </p>
      <input placeholder="location" value={location} onChange={(e)=>{setLocation(e.target.value)}} />
      {/* <textarea placeholder="Shipping Address" />
      <textarea placeholder="Physical location of the project" /> */}
    </div>

    <button class="button-contact" onClick={(e)=>{handleSubmit(e)}} type="submit" id="submitBtn" className="submitBtn"  style={{height:"40px",width:"60px",backgroundColor: "#0095ff",color:"white"}}>submit</button>
  </form>

 
</div>
    </>
  );
}
