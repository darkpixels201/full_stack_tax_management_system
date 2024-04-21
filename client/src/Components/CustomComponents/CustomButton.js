import React from "react";
import Lottie from "lottie-react";
import { colors } from "../../utils/Colors";
import loader from "../../Assets/json/doubleWhiteLoader.json";
import Spacer from "./Spacer";

function CustomButton({
  containerStyle,
  onClick,
  icon,
  title,
  loading,
  innerContainerStyle,
  titleStyle,
}) {
  const initialStyles = {
    backgroundColor: colors.black1,
    color: colors.white,
    display: "flex",
    height:20,
    width: 80,
    padding: 10,
    borderRadius: 5,
    shadowColor: "black",
    shadowRadius: 8,
    justifyContent: "center",
    cursor: "pointer",
    position:"relative"
  };
  return (
    <div
      style={{
        width: "100%",
        ...containerStyle,
      }}
      onClick={onClick}
      // onSubmit={onSubmit}
    >
      <div
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          ...initialStyles,
          ...innerContainerStyle,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {icon ? icon : null}
          <Spacer width={5} />
          {loading ? (
           <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
           <Lottie animationData={loader} style={{ height: 40, width: 40 }} />
         </div>
          ) : (
            <div style={{ fontSize: 15, ...titleStyle }}>{title}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomButton;
