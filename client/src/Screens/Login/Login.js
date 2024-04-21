import { Checkbox } from "@mui/material";
import React, { useState } from "react";
// import { Blob } from "react-blob";
import { HiOutlineMail } from "react-icons/hi";
import { SlLock } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { icons } from "../../Assets/Icons";
import CustomText from "../../Components/CustomComponents/CustomText";
import Spacer from "../../Components/CustomComponents/Spacer";
import FormComponent from "../../Components/FormComponent";
import { colors } from "../../utils/Colors";
import { Regex, _isValidate } from "../../utils/validation.utils";
import { ErrorMessages, SchemaKeys } from "../../common/constants";
import { useDispatch } from "react-redux";
import { setTokens } from "../../store/actions/authAction";
import Services from "../../services";
import { setUser } from "../../store/actions/userAction";
import { toast } from "react-toastify";
import CustomButton from "../../Components/CustomComponents/CustomButton";
import { images } from "../../Assets/Images";
import useEnterKeyHandler from "../../Components/KeyHandler";
// import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [loading, isLoading] = useState(false);

  const [submitError, setSubmitError] = useState({
    emailError: "",
    passwordError: "",
  });

  const isValidate = () => {
    let schema = {
      [SchemaKeys.Email]: yup.string().required().email(),
      [SchemaKeys.Password]: yup
        .string()
        .required()
        .matches(Regex.Password, ErrorMessages.Password),
    };
    let values = {
      [SchemaKeys.Email]: state.email,
      [SchemaKeys.Password]: state.password,
    };
    const error = _isValidate(schema, values);
    if (error) {
      setSubmitError(
        error?.includes("Email")
          ? { emailError: error, passwordError: "" }
          : { emailError: "", passwordError: error }
      );
    } else {
      setSubmitError({ emailError: "", passwordError: "" });
    }
    return error ? false : true;
  };


  const onSubmit = async () => {
    if (!isValidate()) return;
    try {
      const payload = {
        email: state.email,
        password: state.password,
      };
      isLoading(true);
      await Services.Auth.login(payload)
        .then((response) => {
          if (response.status == "pending") {
            console.log("Login Response", response);
            toast.warning("Account is not Approved !");
            isLoading(false);
          } else if (response.accountStatus !== "active") {
            toast.warning("Your Account is De-Activated by Admin");
          } else {
            dispatch(setUser({ user: response }));
            dispatch(setTokens({ access_token: response?.token }));
            toast.success("Login Successful");
            navigate("/dashboard");
            isLoading(true);
          }
        })
        .catch((err) => {
          console.log("Login Error", err);
          // toast.warning(err.response.data.message);
          isLoading(false);
        });
      // console.log("Login Payload", payload);
    } catch (err) {
      isLoading(false);
      console.log("Login Screen Error", err);
    } finally {
      isLoading(false);
    }
  };
  useEnterKeyHandler(onSubmit)

  // const handleForgotPassword = async () => {

  // }

  return (
    <div style={{}}>
      <Spacer height={130} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          padding: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: 470,
            width: 450,
            boxShadow: "2px 1px 15px -1px rgba(0,0,0,0.10)",
            backgroundColor: colors.white,
            borderRadius: 10,
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
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
                alt="logo"
                src={icons.dummyLogo}
                style={{ height: 80, width: 80 }}
              />
            </div>
            <Spacer height={30} />
            <div
              style={{
                paddingLeft: 50,
                paddingRight: 50,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <CustomText
                title="sign in to continue"
                fontSize={13}
                color={colors.grey2}
              />

              <CustomText
                titleStyle={{
                  fontSize: 12,
                  textAlign: "center",
                  fontFamily: "bold",
                  cursor: "pointer",
                }}
                title="Create Account"
                onClick={() => navigate("/signup")}
              />
            </div>
            <FormComponent
              bodyContainerStyle={{ paddingLeft: 50, paddingRight: 50 }}
              placeholder={"Enter Your Email"}
              Icon={HiOutlineMail}
              name={"Email"}
              onChange={(e) => {
                setState({ ...state, email: e.target.value });
                setSubmitError({ emailError: "" });
              }}
              error={submitError.emailError}
              value={state.email}
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
              error={submitError.passwordError}
              passwordType
              value={state.password}
            />
            <Spacer height={25} />
            <CustomButton
              title={"SIGN IN"}
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
            <Spacer height={10} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 45,
                paddingLeft: 40,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Checkbox />
                <CustomText
                  titleStyle={{
                    fontSize: 12,
                    textAlign: "center",
                    fontFamily: "medium",
                  }}
                  title="Keep me Signed In"
                />
              </div>
              <CustomText
                titleStyle={{
                  fontSize: 12,
                  textAlign: "center",
                  fontFamily: "medium",
                }}
                title="Forgot Password ?"
                onClick={() => navigate("/forgot-password")}
              />
            </div>
            {/* <div style={{ paddingLeft: 45 }}>
              
            </div> */}
          </div>
        </div>
      </div>
      {/* <img
      // width={200}
              // src={images.taxOffice}
              src={images.animated_Tax}
              style={{
                width: "75%",
                height: "auto",
                objectFit: "contain",
              }}
            /> */}
    </div>
  );
};

export default Login;
