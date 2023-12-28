import React from "react";
import "./TitleAndData.css";
import { Link } from "react-router-dom";

export default function TitleAndData(props) {
  const { title, data, url } = props;
  return (
    <div className="titleAndData_wrapper">
      <div className="tad_title">{title}</div>
      {url ? (
        <div className="tad_data">
          <Link to={url} target="_blank">
            {data}
          </Link>
        </div>
      ) : (
        <div className="tad_data">{data}</div>
      )}
    </div>
  );
}
