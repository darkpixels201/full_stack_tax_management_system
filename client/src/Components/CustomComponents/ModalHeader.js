import React from "react";
import { RxCross2 } from "react-icons/rx";
import CustomText from "./CustomText";
import Spacer from "./Spacer";

const ModalHeader = ({ onClose, modalTitle }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CustomText
          titleStyle={{ fontFamily: "bold", fontSize: 18 }}
          titleContainerStyle={{ marginLeft: 10 }}
          title={modalTitle}
        />
        <div
          style={{
            // display: "flex", justifyContent: "flex-end",
            padding: 12,
          }}
        >
          <RxCross2 cursor={"pointer"} size={18} onClick={onClose} />
        </div>
      </div>
      <div
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#d1d5da",
          margin: "auto",
        }}
      />
    </div>
  );
};

export default ModalHeader;
