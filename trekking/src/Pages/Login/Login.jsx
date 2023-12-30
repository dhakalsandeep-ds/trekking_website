import React, { useState, useEffect, useContext } from "react";
import "./Login.css";
import logo from "../../assets/travel-svgrepo-com.svg";
import { toast } from "react-toastify";
import { storeData } from "../../constants/apiService";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../AuthState";

export default function Login() {
  const {login}= useContext(AuthContext)
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const [loading, setLoading] = useState(false);

 

  const onSubmitLogin = async () => {
    const success = await login({email:credentials.email,password:credentials.password})
    console.log(success,"from on submit login")
    if(success){
      navigate("/admin")
    }
  };
  

  const onChangeCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login_wrapper">
      <div className="login_container">
        <img src={logo} alt="" />
        <div className="login_content">
          
            <form action="/admin">
              {/* <h2>LOGIN</h2> */}
              <div className="login_input">
                <h4>Email</h4>
                <input
                  type="text"
                  name="email"
                  style={{borderColor:"orange"}}
                  onChange={onChangeCredentials}
                />
              </div>
              <div className="login_input">
                <h4>Password</h4>
                <input
                  type="password"
                  name="password"
                  onChange={onChangeCredentials}
                />
              </div>
              <button
                type="submit"
                value="Submit"
                style={{backgroundColor:"#154c79",borderColor:"orange"}}
                onClick={(e) => {
                  e.preventDefault();
                  onSubmitLogin();
                }}
              >
               Login
              </button>
            </form>
      
        </div>
      </div>
    </div>
  );
}
