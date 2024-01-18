import React, { useState } from "react";
import "./ContactContainer.css";



import { toast } from "react-toastify";


export default function ContactContainer() {
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
    if(!/^[0-9]{8}$|^[0-9]{10}$/.test(e.target.value)){
     console.log('inside handle phone')
     setPhone(e.target.value)
     setIsPhoneError({error:true,message:[`must not contain letter and must be of 8 or 10 digits ${e.target.value}` ]})
    }else{
     setIsPhoneError({error:false,message:[]})
     setPhone(e.target.value)
    }
     console.log(e.target.value)
     
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

       if(response.status === 200){
         let data = await response.json()
         toast.success(data.message)
       } else {
        toast.error(response.json().message)
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
          return <span style={{color:"red"}}> {msg}</span>
        })}
      </p>
      <input placeholder="Phone" value={phone} onChange={(e)=>{handlePhone(e)}} />
      <p>
        {isPhoneError.error && isPhoneError.message.map((msg)=>{
          console.log("inside email error")
          return <span style={{color:"red"}}> {msg}</span>
        })}
      </p>
      <input placeholder="location" value={location} onChange={(e)=>{setLocation(e.target.value)}} />
      
    </div>

    <button class="button-contact" onClick={(e)=>{handleSubmit(e)}} type="submit" id="submitBtn" className="submitBtn"  style={{height:"40px",width:"60px",backgroundColor: "#0095ff",color:"white"}}>submit</button>
  </form>

 
</div>
    </>
  );
}
