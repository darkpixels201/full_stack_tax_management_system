import React from "react";
import Spacer from "./Spacer";

function CustomText({ titleStyle, title, onClick, titleContainerStyle, leftIcon, rightIcon  }) {
  const initialStyles = {
    // color: "black",
    // fontSize: 20,
    // alignSelf: "flex-start",
    display:"flex",
    fontFamily:"regular",
    
  };
  const titleContainerInitialStyle = {
    display:"flex",
    alignItems: "center",
  }
  return (
    <div style={{...titleContainerStyle, ...titleContainerInitialStyle}} onClick={onClick} disabled={!onClick}>
      {leftIcon ? leftIcon : null}
      <Spacer width={5} />
        <div style={{ ...initialStyles, ...titleStyle }}>{title}</div>
      <Spacer width={5} />
      {rightIcon ? rightIcon : null}
    </div>
  );
}

export default CustomText;
