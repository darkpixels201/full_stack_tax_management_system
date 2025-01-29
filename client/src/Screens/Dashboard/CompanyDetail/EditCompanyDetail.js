import React, { useEffect, useState } from "react";
import * as yup from "yup";
import "../../../Assets/css/modalStyle.css";
import ModalHeader from "../../../Components/CustomComponents/ModalHeader";
import { Grid } from "@mui/material";
import FormComponent from "../../../Components/FormComponent";
import CustomButton from "../../../Components/CustomComponents/CustomButton";
import { SchemaKeys } from "../../../common/constants";
import { _isValidate } from "../../../utils/validation.utils";
import Spacer from "../../../Components/CustomComponents/Spacer";
import { UseWindowSize } from "../../../Components/UseWindowSize";
import { styles } from "../../../Assets/Style/AddCompanyStyle";
import Services from "../../../services";
import { toast } from "react-toastify";
import CustomTagCheckBox from "../../../Components/CustomComponents/CustomTagCheckBox";
import CustomText from "../../../Components/CustomComponents/CustomText";
import ToggleSwitch from "../../../Components/toggleSwitch";

const EditCompanyDetail = ({
  companyDetail,
  onClose,
  companyId,
  getCompanyDetail,
  editToggle,
}) => {
  const [screenWidth] = UseWindowSize();

  // const optionsWithCheckedState = options.map((option) => {
  //   return {
  //     ...option,
  //     isChecked: value.includes(option.taxDeductionRate),
  //   };
  // });

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, isLoading] = useState(false);
  console.log("Company Detail EDIT", companyDetail);

  const [state, setState] = useState({
    companyName: companyDetail?.companyName,
    address: companyDetail?.address,
    natureOfWork: companyDetail?.natureOfWork,
    rateOfTax: companyDetail?.rateOfTax,
    underSection: companyDetail?.underSection,
    ntn: companyDetail?.ntn,
    showToAdmin: companyDetail?.showToAdmin,
    // taxDeduction: companyDetail?.taxDeduction,
  });

  const [rateOfTaxList, setRateOfTaxList] = useState();
  const [underSectionList, setUnderSectionList] = useState();
  console.log("RATE OF TAX LIST", rateOfTaxList);

  // const getCompanyDetails = async () => {
  //   try {
  //     await Services.Company.companyDetail(companyDetail?._id)
  //       .then((res) => {
  //         // setCompanyDetail(res);
  //         setRateOfTaxList(res?.rateOfTax);
  //         setUnderSectionList(res?.underSection);
  //         console.log("Company Detail res", res);
  //       })
  //       .catch((err) => {
  //         console.log("Detail Error", err);
  //       });
  //   } catch {}
  // };

  // const getCompanyDetails = async () => {
  //   try {
  //     const res = await Services.Company.companyDetail(companyDetail?._id);
  //     const selectedRates = res?.rateOfTax || []; // Existing rates of tax for the company
  //     const allRates = await Services.RateOfTax.getRateOfTax(); // Fetch all available rates of tax
  
  //     // Map all rates with a 'selected' flag
  //     const ratesWithSelection = allRates.map((rate) => ({
  //       label: rate.taxDeductionRate,
  //       selected: selectedRates.includes(rate.taxDeductionRate), // Check if this rate is in the company's existing list
  //     }));
  
  //     setRateOfTaxList(ratesWithSelection);
  //     setUnderSectionList(res?.underSection); // Existing logic
  //   } catch (err) {
  //     console.log("Detail Error", err);
  //   }
  // };


  const getCompanyDetails = async () => {
    try {
      const res = await Services?.RateOfTax?.getRateOfTax();
      const mergedRateOfTaxList = [...rateOfTaxList, ...res?.rateOfTax];
      setRateOfTaxList(mergedRateOfTaxList);
      console.log("All rate of tax list", res);
    } catch (err) {
      console.log("Rate Of Tax Error", err);
    }
  };
  
  useEffect(() => {
    getCompanyDetails();
  }, []);

  const [submitError, setSubmitError] = useState({
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
      [SchemaKeys.Company_Name]: yup.string().required(),
      [SchemaKeys.Address]: yup.string().required(),
      [SchemaKeys.Nature_Of_Work]: yup.string().required(),
      [SchemaKeys.Rate_Of_Tax]: yup.array().required(),
      [SchemaKeys.Under_Section]: yup.array().required(),
      [SchemaKeys.NTN]: yup.string().required(),
      // [SchemaKeys.Tax_Deduction]: yup.string().required(),
    };
    let values = {
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
        if (error.includes("Company Name")) {
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
        //  else if (error.includes("Tax")) {
        //   setError("Tax", error);
        // }
      }
    } else {
      setSubmitError({
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

  const handleSubmit = async () => {
    if (!isValidate()) return;
    console.log("TOGGLE STATUS",toggleStatus)
    try {
      const payload = {
        companyName: state.companyName,
        address: state.address,
        natureOfWork: state.natureOfWork,
        rateOfTax: state.rateOfTax,
        underSection: state.underSection,
        ntn: state.ntn,
        // taxDeduction: state.taxDeduction,
        // showToAdmin: true,
        showToAdmin: state.showToAdmin,
        accessToDeleteLedger: toggleStatus
      };
      console.log("Handle Submit Payload",payload)
      isLoading(true);
      await Services.Company.updateCompany(companyId, payload)
        .then(async (res) => {
          console.log("UPDATE Company Response", res);
          toast.success("Company Updated Successfully");
          //   navigate("/dashboard/companies");
          onClose();
          getCompanyDetail();
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

  const formArray = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
      name: "Rate of Tax",
      xs: 12,
      md: 6,
      type: "text",
      isDropDown: true,
      onchange: (v) => {
        setSubmitError({ ...submitError, rateOfTaxError: "" });
      },
      onSelect: (selectedOption) => {
        const updatedRates = rateOfTaxList?.map((rate) => ({
          ...rate,
          selected: rate.label === selectedOption.label ? !rate.selected : rate.selected,
        }));
        setRateOfTaxList(updatedRates);
        setSubmitError({ ...submitError, rateOfTaxError: "" });
      },
      setValueToState: (selectedValues) => {
        // Update the selected rates in the state
        const updatedRates = rateOfTaxList.map((rate) => ({
          ...rate,
          selected: selectedValues.includes(rate.label),
        }));
        setRateOfTaxList(updatedRates);
    
        console.log("Updated Selected Rates", selectedValues);
      },
      error: submitError.rateOfTaxError,
      value: rateOfTaxList?.filter((rate) => rate.selected)?.map((rate) => rate?.label), // Only display selected rates
      options: rateOfTaxList?.map((rate) => ({
        label: rate.label,
        value: rate.label,
        selected: rate.selected,
      })), // Provide all options with their current selection status
      percentage: true,
    },
    {
      id: 5,
      name: "Under Section",
      xs: 12,
      md: 6,
      type: "text",
      isDropDown: true,
      onchange: (v) => {
        setState({ ...state, underSection: v.target.value });
        setSubmitError({ ...submitError, underSectionError: "" });
      },
      onSelect: (selectedOption) => {
        setSubmitError({ ...submitError, underSectionError: "" });
      },
      setValueToState: (selectedValue) => {
        setState({ ...state, underSection: selectedValue });
      },
      error: submitError.underSectionError,
      value: underSectionList,
      options: underSectionList && underSectionList,
    },
    {
      id: 6,
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
    //   value: state.taxDeduction,
    // },
  ];

  useEffect(() => {
    setModalOpen(true);
  }, []);

  const [toggleStatus, setToggleStatus] = useState(
    companyDetail?.accessToDeleteLedger
  );

  const handleToggleChange = (newStatus) => {
    // Handle state change if needed
    setToggleStatus(newStatus);
  };

  return (
    <div className={`wrapper ${editToggle ? "" : ""}`} style={{ padding: 20 }}>
      <div
        className={`main ${editToggle ? "slide-fade-in" : "slide-fade-out"} `}
      >
        <ModalHeader onClose={onClose} />
        <Grid
          sx={{ padding: "0 16px", width: screenWidth <= 900 ? "auto" : 800 }}
          container
          //    paddingX={screenWidth <= 1250 ? 100 : 20}
          spacing={2}
        >
          {formArray.map((items, index) => (
            <>
              <Grid
                sx={styles.girdHeader}
                key={index}
                item
                xs={items.xs}
                md={items.md}
              >
                <>
                  {!items.isDropDown ? (
                    <FormComponent
                      type={items.type}
                      bodyContainerStyle={{ ...styles.bodyContainerStyle }}
                      containerTitleStyle={{ fontFamily: "medium" }}
                      innerContainerStyle={{
                        backgroundColor: "rgba(239, 239, 239, 1)",
                      }}
                      containerStyle={{
                        backgroundColor: "rgba(239, 239, 239, 1)",
                      }}
                      placeholder={items.name}
                      onChange={items.onchange}
                      value={items.value}
                      error={items.error}
                      name={items.name}
                    />
                  ) : (
                    <div>
                      <CustomTagCheckBox
                        placeholder={items.name}
                        errorMessage={items.error}
                        onSelect={items.onSelect}
                        setValueToState={items.setValueToState}
                        onChange={items.onchange}
                        options={items.options}
                        containerStyle={styles.flexCenter}
                        value={items.value}
                        name={items.name}
                        percentage={items.percentage}
                        // value={[{ label: items.value }]}
                      />
                    </div>
                  )}
                </>
              </Grid>
            </>
          ))}

          <div
            style={{
              marginLeft: 40,
              marginTop: 30,
            }}
          >
            <CustomText
              title={"Access To Delete Ledger"}
              titleStyle={{ fontFamily: "medium" }}
            />
            <Spacer height={5} />
            <ToggleSwitch
              defaultStatus={companyDetail?.accessToDeleteLedger}
              status={companyDetail?.accessToDeleteLedger}
              onChange={handleToggleChange}
            />
          </div>
        </Grid>
        <Spacer height={20} />
        <CustomButton
          onClick={handleSubmit}
          title="Save"
          className={"container"}
          loading={loading}
          containerStyle={styles.customButtonContainerStyle}
        />
        <Spacer height={20} />
      </div>
    </div>
  );
};

export default EditCompanyDetail;
