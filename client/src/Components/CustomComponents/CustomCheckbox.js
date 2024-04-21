import React from "react";
import "../../Assets/css/CustomSearchDrop.css";
import { Checkbox } from '@mui/material';

const CustomCheckbox = ({ label, isChecked, onChange }) => {
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
    </div>
  );
};

export default CustomCheckbox;
