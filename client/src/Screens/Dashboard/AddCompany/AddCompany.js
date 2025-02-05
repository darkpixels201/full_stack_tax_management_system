import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Grid } from "@mui/material";
import FormComponent from "../../../Components/FormComponent";
import { UseWindowSize } from "../../../Components/UseWindowSize";
import "../../../Assets/css/style.css";
import { SchemaKeys } from "../../../common/constants";
import { _isValidate } from "../../../utils/validation.utils";
import CustomSearchDropDown from "../../../Components/CustomComponents/CustomSearchDropDown";
import CustomButton from "../../../Components/CustomComponents/CustomButton";
import Spacer from "../../../Components/CustomComponents/Spacer";
import DashboardPageHeader from "../../../Components/DashboardComponent/DashboardPageHeader";
import { useSelector } from "react-redux";
import Services from "../../../services";
import { styles } from "../../../Assets/Style/AddCompanyStyle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomTagCheckBox from "../../../Components/CustomComponents/CustomTagCheckBox";
import useEnterKeyHandler from "../../../Components/KeyHandler";
import { fetchRateOfTaxList } from "../../../store/actions/rateOfTaxAction";
import { fetchUnderSectionList } from "../../../store/actions/underSectionAction";

const AddCompany = () => {
  const navigate = useNavigate();
  const [screenWidth] = UseWindowSize();
  const user_name = useSelector((state) => state.profileReducer.user_name);
  const [rateOfTaxList, setRateOfTax] = useState("");
  const [underSectionList, setUnderSectionList] = useState("");
  const [userNameList, setUserNameList] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  // console.log("User Name Reducer", user_name);

  const [loading, isLoading] = useState(false);

  const [state, setState] = useState({
    userName: "",
    companyName: "",
    address: "",
    natureOfWork: "",
    rateOfTax: "",
    underSection: "",
    ntn: "",
    // taxDeduction: "",
  });

  const [submitError, setSubmitError] = useState({
    userNameError: "",
    companyNameError: "",
    addressError: "",
    natureOfWorkError: "",
    rateOfTaxError: "",
    underSectionError: "",
    ntnError: "",
    // taxDeductionError: "",
  });

  const isValidate = () => {
    let schema = {
      [SchemaKeys.User_Name]: yup.string().required(),
      [SchemaKeys.Company_Name]: yup.string().required(),
      [SchemaKeys.Address]: yup.string().required(),
      [SchemaKeys.Nature_Of_Work]: yup.string().required(),
      [SchemaKeys.Rate_Of_Tax]: yup.array().required(),
      [SchemaKeys.Under_Section]: yup.array().required(),
      [SchemaKeys.NTN]: yup.string().required(),
      // [SchemaKeys.Tax_Deduction]: yup.string().required(),
    };
    let values = {
      [SchemaKeys.User_Name]: state.userName,
      [SchemaKeys.Company_Name]: state.companyName,
      [SchemaKeys.Address]: state.address,
      [SchemaKeys.Nature_Of_Work]: state.natureOfWork,
      [SchemaKeys.Rate_Of_Tax]: state.rateOfTax,
      [SchemaKeys.Under_Section]: state.underSection,
      [SchemaKeys.NTN]: state.ntn,
      // [SchemaKeys.Tax_Deduction]: state.taxDeduction,
    };
    const error = _isValidate(schema, values);
    if (error) {
      const setError = (errorType, error) => {
        setSubmitError({
          userNameError: errorType === "User Name" ? error : "",
          companyNameError: errorType === "Company Name" ? error : "",
          addressError: errorType === "Address" ? error : "",
          natureOfWorkError: errorType === "Nature" ? error : "",
          rateOfTaxError: errorType === "Rate" ? error : "",
          underSectionError: errorType === "Under" ? error : "",
          ntnError: errorType === "NTN" ? error : "",
          // taxDeductionError: errorType === "Tax" ? error : "",
        });
      };
      if (error) {
        if (error.includes("User Name")) {
          setError("User Name", error);
        } else if (error.includes("Company Name")) {
          setError("Company Name", error);
        } else if (error.includes("Address")) {
          setError("Address", error);
        } else if (error.includes("Nature")) {
          setError("Nature", error);
        } else if (error.includes("Rate")) {
          setError(
            "Rate",
            error.includes(
              "Rate Of Tax must be a `array` type, but the final value was"
            )
              ? "Select at least one Option"
              : error
          );
        } else if (error.includes("Under")) {
          setError(
            "Under",
            error.includes(
              "Under Section must be a `array` type, but the final value was"
            )
              ? "Select at least one Option"
              : error
          );
        } else if (error.includes("NTN")) {
          setError("NTN", error);
        }
        // else if (error.includes("Tax")) {
        //   setError("Tax", error);
        // }
      }
    } else {
      setSubmitError({
        userNameError: "",
        companyNameError: "",
        addressError: "",
        natureOfWorkError: "",
        rateOfTaxError: "",
        underSectionError: "",
        ntnError: "",
        // taxDeductionError: "",
      });
    }
    return error ? false : true;
  };

  console.log("Selected User ID", selectedUserId)

  const handleSubmit = async () => {
    if (!isValidate()) return;
    try {
      const payload = {
        userId: selectedUserId,
        companyName: state.companyName,
        address: state.address,
        natureOfWork: state.natureOfWork,
        rateOfTax: state.rateOfTax,
        underSection: state.underSection,
        ntn: state.ntn,
        taxDeduction: state.taxDeduction,
        showToAdmin: true,
      };
      // console.log("Company Payload",payload)
      isLoading(true);
      await Services.Company.addCompany(payload)
        .then(async (res) => {
          console.log("Add Company Response", res);
          toast.success("Company Added Successfully");
          setState((prevState) => ({
            ...prevState,
            companyName: "",
            address: "",
            natureOfWork: "",
            rateOfTax: "",
            underSection: "",
            ntn: "",
            // taxDeduction: "",
          }));
          navigate("/dashboard/companies");
          isLoading(false);
        })
        .catch((err) => {
          console.log("Add Company Error", err?.response?.data?.message);
          isLoading(false);
        });
    } catch (err) {
      console.log("Catch Error Add Company", err);
      isLoading(false);
    } finally {
      isLoading(false);
    }
  };

  useEnterKeyHandler(handleSubmit);

  useEffect(() => {
    fetchRateOfTaxList(setRateOfTax);
  }, []);

  // Fetch Under Section List
  useEffect(() => {
    fetchUnderSectionList(setUnderSectionList);
  }, []);

  const fetchApprovedUsers = async () => {
    try {
      const response = await Services?.Auth?.approvedUsers();
      console.log("List Of Approved Users", response);
      setUserNameList(response);
      // setHomePageLoader(true);
    } catch (error) {
      console.log("Pending User Error", error);
    }
  };
  console.log("USER NAME LIST", userNameList);

  useEffect(() => {
    fetchApprovedUsers();
  }, []);

  const formArray = [
    {
      id: 1,
      name: "User Name",
      xs: 12,
      md: 6,
      isDropDown: true,
      onchange: (v) => {
        setSubmitError({ ...submitError, userNameError: "" });
      },
      setValueToState: (selectedValue) => {
        setState({ ...state, userName: selectedValue });
        const selectedUser = userNameList.find(
          (item) => item.username === selectedValue
        );
        const selectedUserId = selectedUser ? selectedUser.id : null; // Extract and set the ID from the selected user
        setSelectedUserId(selectedUserId);
      },
      options: userNameList && userNameList?.map((item) => item?.username),
      error: submitError.userNameError,
      value: state.userName,
      // value: state.taxDeductionRate || initialRateOfTax || "",
      // initialValue: rateOfTaxList[0]
    },
    {
      id: 2,
      name: "Company Name",
      xs: 12,
      md: 6,
      type: "text",
      onchange: (v) => {
        setState({ ...state, companyName: v.target.value });
        setSubmitError({ ...submitError, companyNameError: "" });
      },
      error: submitError.companyNameError,
      value: state.companyName,
    },
    {
      id: 3,
      name: "Address",
      xs: 12,
      md: 6,
      type: "text",
      onchange: (v) => {
        setState({ ...state, address: v.target.value });
        setSubmitError({ ...submitError, addressError: "" });
      },
      error: submitError.addressError,
      value: state.address,
    },
    {
      id: 4,
      name: "Nature of Work",
      xs: 12,
      md: 6,
      type: "text",
      onchange: (v) => {
        setState({ ...state, natureOfWork: v.target.value });
        setSubmitError({ ...submitError, natureOfWorkError: "" });
      },
      error: submitError.natureOfWorkError,
      value: state.natureOfWork,
    },
    {
      id: 5,
      name: "Rate of Tax",
      xs: 12,
      md: 6,
      type: "text",
      isTagDropDown: true,
      onchange: (v) => {
        // setState({ ...state, rateOfTax: v.target.value });
        setSubmitError({ ...submitError, rateOfTaxError: "" });
      },
      onSelect: (selectedOption) => {
        // setState({ ...state, rateOfTax: selectedOption });
        setSubmitError({ ...submitError, rateOfTaxError: "" });
      },
      setValueToState: (selectedValue) => {
        // Set the selected value to the state
        console.log("SLECTED VALUE", selectedValue);
        // setState({ ...state, rateOfTax: selectedValue });
        setState((prevState) => ({ ...prevState, rateOfTax: selectedValue }));
        setSubmitError({ ...submitError, rateOfTaxError: "" });
      },
      error: submitError.rateOfTaxError,
      options: rateOfTaxList && rateOfTaxList,
      // percentage: true
      ShowPercentageIcon: true,
    },
    {
      id: 6,
      name: "Under Section",
      xs: 12,
      md: 6,
      type: "text",
      isTagDropDown: true,
      onchange: (v) => {
        setState({ ...state, underSection: v.target.value });
        setSubmitError({ ...submitError, underSectionError: "" });
      },
      onSelect: (selectedOption) => {
        setSubmitError({ ...submitError, underSectionError: "" });
      },
      setValueToState: (selectedValue) => {
        setState({ ...state, underSection: selectedValue });
        setSubmitError({ ...submitError, underSectionError: "" });
      },
      error: submitError.underSectionError,
      options: underSectionList,
      // options: top100Films
    },
    {
      id: 7,
      name: "NTN",
      xs: 12,
      md: 6,
      type: "text",
      onchange: (v) => {
        setState({ ...state, ntn: v.target.value });
        setSubmitError({ ...submitError, ntnError: "" });
      },
      error: submitError.ntnError,
      value: state.ntn,
    },
    // {
    //   id: 7,
    //   name: "Tax Deduction",
    //   xs: 12,
    //   md: 6,
    //   type: "text",
    //   onchange: (v) => {
    //     setState({ ...state, taxDeduction: v.target.value });
    //     setSubmitError({ ...submitError, taxDeductionError: "" });
    //   },
    //   error: submitError.taxDeductionError,
    // },
  ];

  return (
    <div>
      <DashboardPageHeader headerTitle={"Add Company"} />
      <Spacer height={30} />
      <Grid container paddingX={screenWidth <= 1250 ? 0 : 20} spacing={2}>
        {formArray.map((items, index) => (
          <Grid
            sx={styles.girdHeader}
            key={index}
            item
            xs={items.xs}
            md={items.md}
          >
            <>
              {!items.isDropDown && !items.isTagDropDown ? (
                <FormComponent
                  type={items.type}
                  bodyContainerStyle={{ ...styles.bodyContainerStyle }}
                  containerTitleStyle={{ fontFamily: "medium" }}
                  innerContainerStyle={{
                    backgroundColor: "rgba(239, 239, 239, 1)",
                  }}
                  containerStyle={{ backgroundColor: "rgba(239, 239, 239, 1)" }}
                  placeholder={items.name}
                  onChange={items.onchange}
                  value={items.value}
                  error={items.error}
                />
              ) : !items.isTagDropDown ? (
                <CustomSearchDropDown
                  placeholder={items.name}
                  errorMessage={items.error}
                  onSelect={items.onSelect}
                  setValueToState={items.setValueToState}
                  onChange={items.onchange}
                  options={items.options}
                  containerStyle={styles.flexCenter}
                  value={items.value}
                />
              ) : (
                <CustomTagCheckBox
                  placeholder={items.name}
                  errorMessage={items.error}
                  onSelect={items.onSelect}
                  setValueToState={items.setValueToState}
                  onChange={items.onchange}
                  options={items.options}
                  containerStyle={styles.flexCenter}
                  percentage={items.ShowPercentageIcon}
                />
              )}
            </>
          </Grid>
        ))}
      </Grid>
      <Spacer height={40} />
      <CustomButton
        onClick={handleSubmit}
        title="Save"
        className={"container"}
        loading={loading}
        containerStyle={styles.customButtonContainerStyle}
      />
    </div>
  );
};


export default AddCompany;
