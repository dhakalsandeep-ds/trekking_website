import React from "react";
import "./PageNotFound.css";
import HeaderDisplay from "../../../Components/HeaderDisplay/HeaderDisplay";
import { MdExtensionOff } from "react-icons/md";

export default function PageNotFound() {
  return (
    <>
      <HeaderDisplay title="PAGE NOT FOUND" textonly="true" />
      <div className="pageNotFound_wrapper">
        <h1>
          <MdExtensionOff />
        </h1>
      </div>
    </>
  );
}
