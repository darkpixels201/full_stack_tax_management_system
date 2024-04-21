import React from "react";
import CustomText from "../CustomComponents/CustomText";
import { AiFillEdit } from "react-icons/ai";
import { icons } from "../../Assets/Icons";
import { FaTrash } from "react-icons/fa";
import { colors } from "../../utils/Colors";
import Spacer from "../CustomComponents/Spacer";
import { commonStyle } from "../../Assets/Style/CommonStyle";

const DashboardPageHeader = ({
  headerTitle,
  showEdit,
  showDelete,
  DeleteOnClick,
  editOnClick,
}) => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CustomText
          title={headerTitle}
          titleStyle={{ fontSize: 22, fontFamily: "medium" }}
          titleContainerStyle={{
            paddingTop: 25,
            paddingLeft: 26,
            paddingBottom: 10,
          }}
        />

        <div
          style={{
            display: "flex",
            paddingTop: 30,
            paddingRight: 40,
            paddingBottom: 10,
          }}
        >
          {showEdit ? (
            <div style={commonStyle.editStyle} onClick={editOnClick}>
              <img src={icons.greyEdit1} style={{ height: 13, width: 13 }} />
            </div>
          ) : (
            ""
          )}

          <Spacer width={10} />

          {showDelete ? (
            <div style={commonStyle.deleteStyle} onClick={DeleteOnClick}>
              <FaTrash
                style={commonStyle.deleteCenterPointer}
                size={15}
                color={colors.red}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        style={{
          height: 1,
          width: "95%",
          backgroundColor: "#d1d5da",
          margin: "auto",
        }}
      />
    </div>
  );
};

export default DashboardPageHeader;
