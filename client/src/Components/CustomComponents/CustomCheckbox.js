import React from "react";
import "../../Assets/css/CustomSearchDrop.css";
import { Checkbox } from '@mui/material';
import Spacer from "./Spacer";

const CustomCheckbox = ({ label, isChecked, onChange, ShowPercentage }) => {
  return (
    <div
      className="dropdown-option"
      //  style={{zIndex:100}}
    >
      {/* <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        style={{ marginRight: 8 }}
      /> */}
      <Checkbox checked={isChecked} onChange={onChange} />
      {label}
      {ShowPercentage && <ShowPercentage />}
    </div>
  );
};

export default CustomCheckbox;
