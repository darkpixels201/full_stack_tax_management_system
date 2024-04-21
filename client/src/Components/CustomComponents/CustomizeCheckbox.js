// CustomizeCheckbox.js

import React from 'react';
import '../../Assets/css/customizedCheckbox.css';

const CustomizeCheckbox = ({ id, checked, onChange }) => {
  return (
    <div className="checkbox-wrapper-19">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="check-box"></label>
    </div>
  );
};

export default CustomizeCheckbox;
