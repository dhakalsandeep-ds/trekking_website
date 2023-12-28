import React from "react";
import "./SearchBar.css";
import { BiSearch } from "react-icons/bi";

export default function SearchBar() {
  return (
    <div className="searchBar" id="mainBox">
      <div className="sb2" id="searchForm">
        <BiSearch />
        <input type="text" id="searchInput" />
      </div>
    </div>
  );
}
