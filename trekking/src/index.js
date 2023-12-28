import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "8px",
          padding: "16px 26px",
          fontSize: "26px",
          backgroundColor: "#f0d679",
          color: "black",
          border: "2px solid #dcac00",
        },
      }}
      containerStyle={{
        top: 100,
        left: 20,
        bottom: 20,
        right: 20,
      }}
    /> */}
    <App />
  </React.StrictMode>
);
