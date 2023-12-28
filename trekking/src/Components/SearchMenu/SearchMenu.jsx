import React from "react";
import "./SearchMenu.css";

export default function SearchMenu() {
  return (
    <div className="searchMenu_wrapper">
      <div className="searchMenu_container">
        <div className="searchMenu_option1">
          <select className="sm_opt1" id="sm_opt1">
            <option value="optionTXT">DESTINATION</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
          </select>
        </div>

        <div className="searchMenu_option2">
          <select className="sm_opt2" id="sm_opt2">
            <option value="optionTXT">CHECK-IN</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
          </select>
        </div>

        <div className="searchMenu_option3">
          <select className="sm_opt3" id="sm_opt3">
            <option value="optionTXT">DURATION</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
          </select>
        </div>

        <div className="goBTN">SEARCH</div>
      </div>
    </div>
  );
}
