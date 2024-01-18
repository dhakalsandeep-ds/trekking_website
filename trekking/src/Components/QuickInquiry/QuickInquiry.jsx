import React, { useState } from "react";
import "./QuickInquiry.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function QuickInquiry() {
   const [message,setMessage] = useState("")
   const [email,setEmail] = useState("")
   const [phone,setPhone] = useState("")
   const [name,setName] = useState("")

   const [isEmailError, setIsEmailError] = useState({error:"",message:[]})
   const [isPhoneError, setIsPhoneError] = useState({error:"",message:[]})
   const [isNameError,setIsNameError] = useState({error:false,message:[]})
   
   const handleEmail = (e) => {
    if(e.target.value === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
     console.log('inside handle email')
     setIsEmailError({error:true,message:["email is invalid and required"]})
    }else{
     setIsEmailError({error:false,message:[]})
    }
     console.log(e.target.value)
     setEmail(e.target.value)
   }

   const handlePhone = (e) => {
    if(e.target.value || !/^[0-9]{8}$|^[0-9]{10}$/.test(phone)){
     console.log('inside handle phone')
     setIsPhoneError({error:true,message:["must not contain letter and must be of 8 or 10 digits and is required"]})
    }else{
     setIsPhoneError({error:false,message:[]})
    }
     console.log(e.target.value)
     setPhone(e.target.value)
   }

   const handleName = (e) => {
    if( e.target.value === "" || !/^[A-Za-z ]+$/.test(e.target.value)){
     console.log('inside handle phone')
     setIsNameError({error:true,message:["name can contain only letter and space and is required"]})
    }else{
     setIsNameError({error:false,message:[]})
    }
     console.log(e.target.value)
     setName(e.target.value)
   }

   const handleSubmit = async(e) => {
    e.preventDefault()
   
      let headersList = {
        "Accept": "application/json",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
         "email":email,
         "contactNumber":phone,
         "name":name,
         "message":message
       });
       try{
       let response = await fetch("http://localhost:8000/inquiry", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.json();
      const newLocal = "..............";
       console.log(data,newLocal);
       if(data.sucess === true){
        toast.success(data.message)
       }else {
        console.log(data)
        toast.error(data.message)
       }
       
      }catch(e){
        console.log(e)
        console.log(e.message)
        console.log("insied toast error")
        toast.error(e)
      }
    
  
 
   }

  return (
    <div className="quickInquiry_wrapper">
      <div className="quickInquiry_container">
        <h3>Contact Us</h3>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={name}
          onChange={(e)=>handleName(e)}
        />
         <p>
        {isNameError.error && isNameError.message.map((msg)=>{
          console.log("inside email error")
          return <span style={{color:"red"}}> {msg}</span>
        })}
      </p>
        <input
          type="text"
          placeholder="Email Id"
          name="email"
          value={email}
          onChange={(e)=>handleEmail(e)}
        />
         <p>
        {isEmailError.error && isEmailError.message.map((msg)=>{
          console.log("inside email error")
          return <span style={{color:"red"}}> {msg}</span>
        })}
      </p>
        <input
          type="text"
          placeholder="Phone Number"
          name="phone_number"
          value={phone}
          onChange={(e)=>handlePhone(e)}
        />
          {isPhoneError.error && isPhoneError.message.map((msg)=>{
          console.log("inside email error")
          return <span style={{color:"red"}}> {msg}</span>
        })}
        <textarea
          placeholder="Message for us"
          name="message"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />
        <div
          className="goBTN"
          style={{backgroundColor: "#0095ff"}}
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          send
        </div>
      </div>
    </div>
  );
}
