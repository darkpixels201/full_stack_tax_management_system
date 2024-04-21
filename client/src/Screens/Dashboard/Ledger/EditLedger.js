import React, { useEffect, useState } from "react";
import * as yup from "yup";
import CustomText from "../../../Components/CustomComponents/CustomText";
import FormComponent from "../../../Components/FormComponent";
import { SchemaKeys } from "../../../common/constants";
import { _isValidate } from "../../../utils/validation.utils";
import CustomSearchDropDown from "../../../Components/CustomComponents/CustomSearchDropDown";
import { Grid } from "@mui/material";
import { UseWindowSize } from "../../../Components/UseWindowSize";
import { bankName, bankNames, top100Films } from "../../../utils/DataArray";
import "../../../Assets/css/style.css";
import CustomButton from "../../../Components/CustomComponents/CustomButton";
import Spacer from "../../../Components/CustomComponents/Spacer";
import DashboardPageHeader from "../../../Components/DashboardComponent/DashboardPageHeader";
import "../../../Assets/css/modalStyle.css";
import ModalHeader from "../../../Components/CustomComponents/ModalHeader";
import Services from "../../../services";
import { toast } from "react-toastify";
import { fetchRateOfTaxList } from "../../../store/actions/rateOfTaxAction";
import { fetchUnderSectionList } from "../../../store/actions/underSectionAction";

const EditLedger = ({
  LedgerId,
  LedgerData,
  onClose,
  setLedgerToggle,
  getLedgerDetail,
}) => {
  const [screenWidth] = UseWindowSize();
  // console.log("Edit Screen Ledger Data", LedgerData);
  const [state, setState] = useState({
    partyName: LedgerData.name,
    bankName: LedgerData.bankName,
    chequeNo: LedgerData.chequeNo,
    chequeAmount: LedgerData.chequeAmount,
    taxDeductionRate: LedgerData.taxDeductionRate,
    underSection: LedgerData.underSection,
    taxAmount: LedgerData.taxAmount,
  });

  console.log("Cheque NO", state.chequeNo);

  const [rateOfTaxList, setRateOfTax] = useState("");
  const [underSectionList, setUnderSectionList] = useState("");

  const [bankChequeList, setBankChequeList] = useState("");

  const [loading, setLoading] = useState(false);

  const [calculatedTaxAmount, setCalculatedTaxAmount] = useState("");

  useEffect(() => {
    const calculatedTax =
      (parseFloat(state.chequeAmount) * parseFloat(state.taxDeductionRate)) /
      100;
    setCalculatedTaxAmount(calculatedTax.toFixed(2)); // Format to two decimal places
    console.log("Calculated Tax");
    setState((prevState) => ({
      ...prevState,
      taxAmount: calculatedTax.toFixed(2), // Format to two decimal places
    }));
  }, [state.chequeAmount, state.taxDeductionRate]);

  const [submitError, setSubmitError] = useState({
    partyNameError: "",
    bankNameError: "",
    chequeNoError: "",
    chequeAmountError: "",
    taxDeductionRateError: "",
    underSectionError: "",
    taxAmountError: "",
  });

  const onSubmit = async () => {
    if (!isValidate()) return;
    try {
      const payload = {
        partyName: state.partyName,
        bankName: state.bankName,
        chequeNo: state.chequeNo,
        chequeAmount: state.chequeAmount,
        taxDeductionRate: state.taxDeductionRate,
        underSection: state.underSection,
        taxAmount: state.taxAmount,
      };
      console.log("Payload API", payload);
      setLoading(true);
      await Services?.Ledger?.editLedger(LedgerData._id, payload)
        .then((res) => {
          toast.success(res?.message);
          setLoading(false);
          setLedgerToggle(false);
          getLedgerDetail();
        })
        .catch((err) => {
          console.log("Edit Ledger Data Res", err);
          setLoading(false);
        });
    } catch (err) {
      console.log("Edit Ledger Screen Error", err);
      setLoading(false);
    }
  };

  const isValidate = () => {
    let schema = {
      // [SchemaKeys.Party_Name]: yup.string().required(),
      [SchemaKeys.Bank_Name]: yup.string().required(),
      [SchemaKeys.Cheque_No]: yup.string().required(),
      [SchemaKeys.Cheque_Amount]: yup.string().required(),
      [SchemaKeys.Tax_Deduction_Rate]: yup.string().required(),
      [SchemaKeys.Under_Section]: yup.string().required(),
      [SchemaKeys.Tax_Amount]: yup.string().required(),
    };
    let values = {
      // [SchemaKeys.Party_Name]: state.partyName,
      [SchemaKeys.Bank_Name]: state.bankName,
      [SchemaKeys.Cheque_No]: state.chequeNo,
      [SchemaKeys.Cheque_Amount]: state.chequeAmount,
      [SchemaKeys.Tax_Deduction_Rate]: state.taxDeductionRate,
      [SchemaKeys.Under_Section]: state.underSection,
      [SchemaKeys.Tax_Amount]: state.taxAmount,
    };
    const error = _isValidate(schema, values);
    if (error) {
      const setError = (errorType, error) => {
        setSubmitError({
          // partyNameError: errorType === "Party Name" ? error : "",
          bankNameError: errorType === "Bank Name" ? error : "",
          chequeNoError: errorType === "Cheque No" ? error : "",
          chequeAmountError: errorType === "Cheque Amount" ? error : "",
          taxDeductionRateError:
            errorType === "Tax Deduction rate" ? error : "",
          underSectionError: errorType === "Under Section" ? error : "",
          taxAmountError: errorType === "Tax Amount" ? error : "",
        });
      };
      if (error) {
        // if (error.includes("Party Name")) {
        //   setError("Party Name", error);
        // }
        if (error.includes("Bank Name")) {
          setError("Bank Name", error);
        } else if (error.includes("Cheque No")) {
          setError("Cheque No", error);
        } else if (error.includes("Cheque Amount")) {
          setError("Cheque Amount", error);
        } else if (error.includes("Tax Deduction rate")) {
          setError("Tax Deduction rate", error);
        } else if (error.includes("Under Section")) {
          setError("Under Section", error);
        } else if (error.includes("Tax Amount")) {
          setError("Tax Amount", error);
        }
      }
    } else {
      setSubmitError({
        // partyNameError: "",
        bankNameError: "",
        chequeNoError: "",
        chequeAmountError: "",
        taxDeductionRateError: "",
        underSectionError: "",
        taxAmountError: "",
      });
    }
    return error ? false : true;
  };

  const fetchChequeByBankName = async (selectedValue) => {
    // console.log("Bank Selected", selectedValue);
    try {
      await Services?.Cheque?.chequeByBankName(selectedValue || state.bankName)
        .then((res) => {
          // console.log("List Cheque", res);
          const ListChequeNo = res?.flatMap((item) => item?.chequeNo);
          setBankChequeList(ListChequeNo);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } catch (error) {
      console.log("list Cheque Error", error);
    }
  };

  useEffect(() => {
    if (state.bankName) {
      fetchChequeByBankName(state.bankName);
    } else {
      // If bankName is not present, clear the cheque number list
      setBankChequeList([]);
    }
  }, [state.bankName]);

  // Getting Rate Of Tax and Under Section from Company

  const getCompanyDetail = async (companyId) => {
    try {
      await Services.Company.companyDetail(companyId)
        .then((res) => {
          setUnderSectionList(res);
          setRateOfTax(res);
          console.log("Get Company Detail From Edit Screen ---", res);
        })
        .catch((err) => {
          console.log("Detail Error", err);
          // setInputLoading(false)
        });
    } catch {
    } finally {
      // setInputLoading(false)
      console.log("Loading Closed");
    }
  };

  const clearChequeNo = () => {
    setState((prevState) => ({
      ...prevState,
      chequeNo: "", // Clear the chequeNo state
    }));
  };

  useEffect(() => {
    getCompanyDetail(LedgerId);
  }, [LedgerId]);

  const formArray = [
    {
      id: 1,
      name: "Bank Name",
      xs: 12,
      md: 6,
      type: "text",
      isDropDown: true,
      // data:bankName,
      onchange: (v) => {
        // setState({ ...state, bankName: v.target.value });
        setSubmitError({ ...submitError, bankNameError: "" });
      },
      setValueToState: (selectedValue) => {
        setState({ ...state, bankName: selectedValue });
        // setState({ ...state, bankName: state.bankName });
        fetchChequeByBankName(selectedValue);
      },
      error: submitError.bankNameError,
      options: bankNames,
      value: state.bankName,
    },
    {
      id: 2,
      name: "Cheque No",
      xs: 12,
      md: 6,
      type: "text",
      isDropDown: true,
      onchange: (v) => {
        // setState({ ...state, chequeNo: v.target.value });
        //     const newChequeNo = v.target.value;
        // setState((prev) => ({ ...prev, chequeNo: newChequeNo }));
        setSubmitError({ ...submitError, chequeNoError: "" });
      },
      setValueToState: (selectedValue) => {
        setState({ ...state, chequeNo: selectedValue });
      },
      error: submitError.chequeNoError,
      options: bankChequeList && bankChequeList?.map((item) => item),
      value: state.chequeNo,
      dropDownHasOnChange: true,
    },
    {
      id: 3,
      name: "Cheque Amount",
      xs: 12,
      md: 6,
      type: "text",
      onchange: (v) => {
        setState({ ...state, chequeAmount: v.target.value });
        setSubmitError({ ...submitError, chequeAmountError: "" });
      },
      error: submitError.chequeAmountError,
      value: state.chequeAmount,
    },
    {
      id: 4,
      name: "Tax Deduction Rate",
      xs: 12,
      md: 6,
      // type: "number",
      isDropDown: true,
      onchange: (v) => {
        // setState({ ...state, taxDeductionRate: v });
        setSubmitError({ ...submitError, taxDeductionRateError: "" });
      },
      setValueToState: (selectedValue) => {
        setState({ ...state, taxDeductionRate: selectedValue });
      },
      error: submitError.taxDeductionRateError,
      // options: rateOfTaxList,
      // value: state.taxDeductionRate,

      options: rateOfTaxList?.rateOfTax,
      value: state.taxDeductionRate || "",
    },
    {
      id: 5,
      name: "Under Section",
      xs: 12,
      md: 6,
      // type: "number",
      // data:top100Films,
      isDropDown: true,
      onchange: (v) => {
        // setState({ ...state, underSection: v.target.value });
        setSubmitError({ ...submitError, underSectionError: "" });
      },
      setValueToState: (selectedValue) => {
        setState({ ...state, underSection: selectedValue });
      },
      error: submitError.underSectionError,
      // options: underSectionList,
      // value: state.underSection,

      options: underSectionList?.underSection,
      value: state.underSection || "",
    },
    {
      id: 6,
      name: "Tax Amount",
      xs: 12,
      md: 6,
      type: "text",
      onchange: (v) => {
        setState({ ...state, taxAmount: v.target.value });
        setSubmitError({ ...submitError, taxAmountError: "" });
      },
      error: submitError.taxAmountError,
      value: calculatedTaxAmount || state.taxAmount,
    },
  ];

  return (
    // <div style={{ height: "100vh"}}>
    <div className="wrapper" style={{ padding: 20, zIndex: 20 }}>
      <div
        className="main"
        style={{ width: screenWidth <= 768 ? "100%" : "40%" }}
      >
        {/* <DashboardPageHeader headerTitle={"Create Ledger"} /> */}
        <ModalHeader onClose={onClose} modalTitle={"Edit Ledger"} />
        <Spacer height={30} />

        {/* <div
          //  className="item"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <CustomSearchDropDown
            onChange={(v) => {
              setSubmitError({ ...submitError, partyNameError: "" });
            }}
            setValueToState={(selectedValue) => {
              setState({ ...state, partyName: selectedValue });
            }}
            options={top100Films}
            error={submitError.partyNameError}
            inputStyle={{ width: "80%" }}
            containerStyle={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
            placeholder={"Party Name"}
            value={state.partyName}
          />
        </div> */}

        <CustomText
          title={"Bank Detail"}
          titleStyle={{ paddingLeft: "8%", paddingTop: 50, fontFamily: "bold" }}
        />

        <div>
          {formArray.map((items, index) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 10,
              }}
              key={index}
            >
              {!items.isDropDown ? (
                <FormComponent
                  type={items.type}
                  bodyContainerStyle={{
                    width: "80%",
                    alignSelf: "center",
                  }}
                  containerTitleStyle={{
                    fontFamily: "medium",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  innerContainerStyle={{
                    backgroundColor: "rgba(239, 239, 239, 1)",
                  }}
                  containerStyle={{ backgroundColor: "rgba(239, 239, 239, 1)" }}
                  placeholder={items.name}
                  onChange={items.onchange}
                  error={items.error}
                  value={items.value}
                  name={items.name}
                />
              ) : (
                <CustomSearchDropDown
                  placeholder={items.name}
                  errorMessage={items.error}
                  // onSelect={items.onSelect}
                  setValueToState={items.setValueToState}
                  onChange={items.onchange}
                  options={items.options}
                  inputStyle={{ width: "80%" }}
                  containerStyle={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                  value={items.value}
                  dropDownHasOnChange={items.dropDownHasOnChange}
                  name={items.name}
                  clearChequeNo={clearChequeNo}
                />
              )}
            </div>
          ))}
        </div>

        <Spacer height={40} />
        <CustomButton
          onClick={onSubmit}
          title="Save"
          className={"container"}
          loading={loading}
          containerStyle={{
            display: "flex",
            justifyContent: "flex-end",
            width: "83.5%",
          }}
        />
        <Spacer height={20} />
      </div>
    </div>
    // </div>
  );
};

export default EditLedger;
