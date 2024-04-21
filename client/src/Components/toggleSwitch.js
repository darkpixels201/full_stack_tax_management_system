import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import '../Assets/css/toggleSwitches.css'

const ToggleSwitch = ({ defaultStatus, onChange }) => {
  const [checked, setChecked] = useState(defaultStatus);

  useEffect(() => {
    // Update the internal state when the defaultStatus changes
    setChecked(defaultStatus);
  }, [defaultStatus]);

  const handleToggleChange = () => {
    const newStatus = !checked;
    setChecked(newStatus);
    onChange(newStatus);
  };

  return (
    <div className="checkbox-wrapper-55">
      <label className={`rocker ${checked ? "rocker-small-checked" : "rocker-small"}`}>
        <input type="checkbox" checked={checked} onChange={handleToggleChange} />
        <span className="switch-left">Yes</span>
        <span className="switch-right">No</span>
      </label>
    </div>
  );
};

ToggleSwitch.propTypes = {
  defaultStatus: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ToggleSwitch;
