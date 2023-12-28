import React, { useState, useEffect } from "react";
import "./Login.css";
import logo from "../../assets/icon/logo_main.png";
import { toast } from "react-toastify";
import { storeData } from "../../constants/apiService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const [loading, setLoading] = useState(false);

  const isAuth = localStorage.getItem("token");
  useEffect(() => {
    if (isAuth) {
      window.location.replace("/admin");
    }
    // eslint-disable-next-line
  }, []);

  const onSubmitLogin = async () => {
    try {
      setLoading(true);

      const url = "/user/login";
      const result = await storeData(url, credentials);
      console.log(result.data)
      if (result.status === 200) {
        console.log("RESULT :", result);
        const messageToAdmin = "Welcome " + result.data.data.user.username;
        toast.success(messageToAdmin);
        localStorage.setItem("token", result.data.data.token);
        localStorage.setItem("username", result.data.data.user.username);
        setLoading(false);
        // navigate("/admin");
      } else {
        setLoading(false);
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Some error occured");
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
          {isAuth ? (
            "... Loading ..."
          ) : (
            <form action="/admin">
              {/* <h2>LOGIN</h2> */}
              <div className="login_input">
                <h4>Email</h4>
                <input
                  type="text"
                  name="email"
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
                onClick={(e) => {
                  e.preventDefault();
                  onSubmitLogin();
                }}
              >
                {loading ? "... Loading ..." : "LOGIN"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
