import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { SlLock } from "react-icons/sl";
import FormComponent from "../../Components/FormComponent";
import CustomButton from "../../Components/CustomComponents/CustomButton";
import { colors } from "../../utils/Colors";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Services from "../../services";
import { Regex, _isValidate } from "../../utils/validation.utils";
import * as yup from "yup";
import { ErrorMessages, SchemaKeys } from "../../common/constants";
import "../../Assets/css/forgotPassword.css";
import DashboardPageHeader from "../../Components/DashboardComponent/DashboardPageHeader";
import Spacer from "../../Components/CustomComponents/Spacer";
import { styles } from "./ForgotPasswordStyle";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailLoading, isEmailLoading] = useState(false);
  const [otpLoading, isOtpLoading] = useState(false);

  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [submitError, setSubmitError] = useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    otpError: "",
  });

  const [isEmailSent, setIsEmailSent] = useState(false);

  const isValidate = () => {
    let schema = {
      [SchemaKeys.Email]: yup.string().required().email(),
    };
    let values = {
      [SchemaKeys.Email]: state.email,
    };
    const error = _isValidate(schema, values);
    if (error) {
      setSubmitError({ emailError: error });
    } else {
      setSubmitError({ emailError: "" });
    }
    return error ? false : true;
  };

  const isResetValidate = () => {
    let schema = {
      // [SchemaKeys.]: yup.string().required(),
      [SchemaKeys.Password]: yup
        .string()
        .required()
        .matches(Regex.Password, ErrorMessages.Password),
      [SchemaKeys.Confirm_Password]: yup
        .string()
        .required()
        .oneOf([yup.ref("Password"), null], "Passwords must match"),
      [SchemaKeys.OTP]: yup.string().required(),
    };
    let values = {
      [SchemaKeys.Password]: state.password,
      [SchemaKeys.Confirm_Password]: state.confirmPassword,
      [SchemaKeys.OTP]: state.otp,
    };
    const error = _isValidate(schema, values);
    if (error) {
      setSubmitError(
        error.includes("Confirm") || error.includes("match")
          ? {
              passwordError: "",
              confirmPasswordError: error,
              otpError: "",
            }
          : error.includes("Password")
          ? {
              passwordError: error,
              confirmPasswordError: "",
              otpError: "",
            }
          : // : error.includes("Password")
            // ? {
            //     emailError: "",
            //     passwordError: error,
            //     confirmPasswordError: "",
            //     userNameError: "",
            //   }
            {
              passwordError: "",
              confirmPasswordError: "",
              otpError: error,
            } // Fix the typo here
      );
    } else {
      setSubmitError({
        passwordError: "",
        confirmPasswordError: "",
        otpError: "",
      });
    }
    return error ? false : true;
  };

  const sendOtpToMail = async () => {
    if (!isValidate()) return;
    try {
      const payload = {
        email: state.email,
      };
      isEmailLoading(true);
      await Services.Auth.forgotPassword(payload)
        .then((response) => {
          if (response.status == "pending") {
            toast.warning("Account is not Approved !");
            isEmailLoading(false);
          } else {
            toast.success("OTP Sent Successful");
            setIsEmailSent(true);
            // navigate("/dashboard");
            isEmailLoading(true);
          }
        })
        .catch((err) => {
          console.log("Login Error", err);
          // toast.warning(err.response.data.message);
          isEmailLoading(false);
        });
      console.log("forgot Password Payload", payload);
    } catch (err) {
      isEmailLoading(false);
      console.log("Forgot Password Screen Error", err);
    } finally {
      isEmailLoading(false);
    }
  };

  // API T Change Password

  const handleChangePassword = async () => {
    if (!isResetValidate()) return;
    try {
      const payload = {
        email: state.email,
        newPassword: state.password,
        otp: state.otp,
      };
      isOtpLoading(true);
      await Services.Auth.resetPassword(payload)
        .then((response) => {
          toast.success("Password has been Changed Successful");
          navigate("/login");
          isOtpLoading(true);
        })
        .catch((err) => {
          console.log("Login Error", err);
          isOtpLoading(false);
        });
      console.log("forgot Password Payload", payload);
    } catch (err) {
      isOtpLoading(false);
      console.log("Forgot Password Screen Error", err);
    } finally {
      isOtpLoading(false);
    }
  };

  return (
    <>
      <DashboardPageHeader headerTitle={"Change Password"} />
      <Spacer height={40} />
      <div
        style={{ height: "100vh" }}
        className={`forgot-password-container ${
          isEmailSent ? "email-sent" : ""
        }`}
      >
        {/* Email Input and Send OTP Button */}
        {!isEmailSent && (
          <div
            className="email-section"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <FormComponent
              bodyContainerStyle={{ ...styles.formBodyContainerStyle }}
              placeholder={"Enter Email"}
              containerStyle={{ width: "16em" }}
              name={"Email"}
              fontSize={16}
              password
              onChange={(e) => {
                setState({
                  ...state,
                  email: e.target.value,
                });
                setSubmitError({ emailError: "" });
              }}
              value={state.email}
              error={submitError.emailError}
            />

            <Spacer height={20} />
            <CustomButton
              title={"SEND OTP"}
              containerStyle={{ display: "flex", justifyContent: "center" }}
              innerContainerStyle={styles.buttonStyle}
              onClick={() => sendOtpToMail()}
              loading={emailLoading}
            />
          </div>
        )}

        {/* Password, Confirm Password, and OTP Input */}
        {isEmailSent && (
          <div
            className="password-section"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <FormComponent
              bodyContainerStyle={styles.formBodyContainerStyle}
              containerStyle={{ width: "16em" }}
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
              bodyContainerStyle={styles.formBodyContainerStyle}
              containerStyle={{ width: "16em" }}
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

            <FormComponent
              bodyContainerStyle={styles.formBodyContainerStyle}
              containerStyle={{ width: "16em" }}
              placeholder={"Enter OTP"}
              name={"OTP"}
              onChange={(e) => {
                setState({ ...state, otp: e.target.value });
                setSubmitError({ otpError: "" });
              }}
              value={state.otp}
              error={submitError.otpError}
            />
            <Spacer height={20} />
            <CustomButton
              title={"SUBMIT"}
              containerStyle={{ display: "flex", justifyContent: "center" }}
              innerContainerStyle={styles.buttonStyle}
              onClick={() => handleChangePassword()}
              loading={otpLoading}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
