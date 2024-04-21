import React, { useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { colors } from "../utils/Colors";
import CustomText from "./CustomComponents/CustomText";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Spacer from "./CustomComponents/Spacer";
import "../Assets/css/formComponentStyle.css";

const FormComponent = ({
  placeholder,
  Icon,
  value,
  name,
  fontSize,
  email,
  passwordType,
  onChange,
  error,
  containerStyle,
  bodyContainerStyle,
  innerContainerStyle,
  containerTitleStyle,
  customPlaceholderColor,
  renderRightItem,
  onFocus,
  type,
  checked,
  readOnly,
  inputRef
}) => {
  const [show, setShow] = useState(true);

  const topStyle = {
    width: "auto",
    paddingTop: 10,
  };

  return (
    <div
      style={{
        ...topStyle,
        ...bodyContainerStyle,
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <CustomText
          titleStyle={{ ...styles.initialTitleStyle, ...containerTitleStyle }}
          title={name}
        />
      </div>
      <Spacer height={5} />
      <div style={{ ...styles.initialContainerStyle, ...containerStyle }}>
        {Icon ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon color={colors.lightGrey} size={fontSize || 20} />
            </div>
            <Spacer width={10} />
          </>
        ) : (
          ""
        )}

        <input
          required
          type={show && passwordType ? "password" : type}
          value={value || ''}
          // className={"placeholderFormComponentColor"}
          // name={name}
          placeholder={placeholder}
          onChange={onChange}
          style={{
            ...styles.initialInnerContainerStyle,
            ...innerContainerStyle,
          }}
          onFocus={onFocus}
          checked={checked}
          readOnly={readOnly}
          ref={inputRef}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            paddingRight: 5,
          }}
        >
          {typeof renderRightItem == "function" && renderRightItem()}
        </div>

        {passwordType ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              paddingRight: 5,
            }}
            onClick={() => setShow(!show)}
          >
            {show ? (
              <AiFillEye fontSize={18} />
            ) : (
              <AiFillEyeInvisible fontSize={18} />
            )}
          </div>
        ) : null}
      </div>

      <div style={{ padding: error ? 1 : "" }}>
        <CustomText
          titleStyle={{ fontSize: 11, color: colors.lightRed }}
          fontSize={11}
          color={colors.lightRed}
          title={error ? error : ""}
        />
      </div>
    </div>
  );
};

const styles = {
  initialContainerStyle: {
    display: "flex",
    flexDirection: "row",
    border: "solid",
    borderWidth: 1,
    borderColor: colors.grey1,
    borderRadius: 2,
    height: 35,
    borderRadius: 10,
    padding: 3,
    paddingLeft: 11,
  },
  initialInnerContainerStyle: {
    width: "100%",
    outline: "none",
    border: "none",
    backgroundColor: colors.white,
    fontSize: 13,
  },
  initialTitleStyle: {
    fontSize: 12,
    marginLeft: 5,
  },
};

export default FormComponent;
