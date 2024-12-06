import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { SlLock } from "react-icons/sl";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import Spacer from "../../Components/CustomComponents/Spacer";
import { colors } from "../../utils/Colors";
import CustomText from "../../Components/CustomComponents/CustomText";
import FormComponent from "../../Components/FormComponent";
import { ErrorMessages, SchemaKeys } from "../../common/constants";
import { Regex, _isValidate } from "../../utils/validation.utils";
import { icons } from "../../Assets/Icons";
import Services from "../../services";
import { toast } from "react-toastify";
import CustomButton from "../../Components/CustomComponents/CustomButton";
import useEnterKeyHandler from "../../Components/KeyHandler";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, isLoading] = useState(false);
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitError, setSubmitError] = useState({
    userNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

 

  const isValidate = () => {
    let schema = {
      [SchemaKeys.User_Name]: yup.string().required(),
      [SchemaKeys.Email]: yup.string().required().email(),
      [SchemaKeys.Password]: yup
        .string()
        .required()
        .matches(Regex.Password, ErrorMessages.Password),
      [SchemaKeys.Confirm_Password]: yup
        .string()
        .required()
        .oneOf([yup.ref("Password"), null], "Passwords must match"),
    };
    let values = {
      [SchemaKeys.User_Name]: state.username,
      [SchemaKeys.Email]: state.email,
      [SchemaKeys.Password]: state.password,
      [SchemaKeys.Confirm_Password]: state.confirmPassword,
    };
    const error = _isValidate(schema, values);
    if (error) {
      setSubmitError(
        error.includes("Email")
          ? { emailError: error, passwordError: "" }
          : error.includes("Confirm") || error.includes("match")
          ? {
              emailError: "",
              passwordError: "",
              confirmPasswordError: error,
              userNameError: "",
            }
          : error.includes("Password")
          ? {
              emailError: "",
              passwordError: error,
              confirmPasswordError: "",
              userNameError: "",
            }
          : {
              emailError: "",
              userNameError: error,
              passwordError: "",
              confirmPasswordError: "",
            } // Fix the typo here
      );
    } else {
      setSubmitError({
        userNameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
      });
    }
    return error ? false : true;
  };

  const onSubmit = async () => {
    if (!isValidate()) return;
    try {
      const payload = {
        username: state.username,
        email: state.email,
        password: state.password,
      };
      Services.Auth.singUp(payload)
        .then((response) => {
          console.log("Singup Response =>>>>>>", response);
          toast.success(
            "Registered Successfully, Admin will Approve your Account Soon!"
          );
          isLoading(true);
          navigate("/login");
        })
        .catch((error) => {
          console.log("SignUp Errorrrrrrrr", error);
          toast.warning(error.response.data.message);
          isLoading(false);
        });
    } catch (err) {
      console.log("SignUp Screen Error", err);
      isLoading(false);
    }
  };

  useEnterKeyHandler(onSubmit)
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            height: 550,
            width: 450,
            boxShadow: "2px 1px 15px -1px rgba(0,0,0,0.10)",
            backgroundColor: colors.white,
            borderRadius: 10,
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent:"center" }}
          >
            <Spacer height={30} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt="Logo"
                src={icons.factsLogo}
                style={{ height: 250, width: 250, position:"absolute" }}
              />
            </div>
            <Spacer height={50} />
            <div style={{ paddingLeft: 50 }}>
              <CustomText
                title="sign in to continue"
                fontSize={13}
                color={colors.grey2}
              />
            </div>
            <FormComponent
              bodyContainerStyle={{ paddingLeft: 50, paddingRight: 50 }}
              placeholder={"User Name"}
              Icon={AiOutlineUser}
              name={"User Name"}
              onChange={(e) => {
                setState({ ...state, username: e.target.value });
                setSubmitError({ userNameError: "" });
              }}
              value={state.username}
              error={submitError.userNameError}
            />
            <FormComponent
              bodyContainerStyle={{ paddingLeft: 50, paddingRight: 50 }}
              placeholder={"Enter Your Email"}
              Icon={HiOutlineMail}
              name={"Email"}
              onChange={(e) => {
                setState({ ...state, email: e.target.value });
                setSubmitError({ emailError: "" });
              }}
              value={state.email}
              error={submitError.emailError}
            />
            <FormComponent
              bodyContainerStyle={{ paddingLeft: 50, paddingRight: 50 }}
              placeholder={"Enter Password"}
              Icon={SlLock}
              name={"Password"}
              fontSize={16}
              password
              onChange={(e) => {
                setState({
                  ...state,
                  password: e.target.value,
                });
                setSubmitError({ passwordError: "" });
              }}
              value={state.password}
              error={submitError.passwordError}
              passwordType
            />

            <FormComponent
              bodyContainerStyle={{ paddingLeft: 50, paddingRight: 50 }}
              placeholder={"Enter Confirm Password"}
              Icon={SlLock}
              name={"Confirm Password"}
              fontSize={16}
              password
              onChange={(e) => {
                setState({
                  ...state,
                  confirmPassword: e.target.value,
                });
                setSubmitError({ confirmPasswordError: "" });
              }}
              error={submitError.confirmPasswordError}
              value={state.confirmPassword}
              passwordType
            />
            <Spacer height={25} />

            <CustomButton
              title={"SIGN UP"}
              containerStyle={{ display: "flex", justifyContent: "center" }}
              innerContainerStyle={{
                width: "73%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                height: 28,
                borderRadius: 10,
                backgroundColor: colors.purple,
                boxShadow: "2px 1px 15px -1px rgba(0,0,0,0.40)",
                cursor: "pointer",
              }}
              onClick={() => onSubmit()}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
