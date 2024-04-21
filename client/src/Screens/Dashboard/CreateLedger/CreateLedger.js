import React, { useEffect, useState } from "react";
import * as yup from "yup";
import CustomText from "../../../Components/CustomComponents/CustomText";
import FormComponent from "../../../Components/FormComponent";
import { SchemaKeys } from "../../../common/constants";
import { _isValidate } from "../../../utils/validation.utils";
import CustomSearchDropDown from "../../../Components/CustomComponents/CustomSearchDropDown";
import { UseWindowSize } from "../../../Components/UseWindowSize";
import { bankNames } from "../../../utils/DataArray";
import "../../../Assets/css/style.css";
import CustomButton from "../../../Components/CustomComponents/CustomButton";
import Spacer from "../../../Components/CustomComponents/Spacer";
import DashboardPageHeader from "../../../Components/DashboardComponent/DashboardPageHeader";
import Services from "../../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useEnterKeyHandler from "../../../Components/KeyHandler";
import { fetchChequeByBankName } from "../../../store/actions/chequeAction";
import { useSelector } from "react-redux";

const CreateLedger = () => {
  const navigate = useNavigate();
  const [screenWidth] = UseWindowSize();
  const [allCompanies, setAllCompanies] = useState();
  const [underSectionList, setUnderSectionList] = useState("");
  const [taxDeductionRateList, setTaxDeductionRateList] = useState("");
  const [bankChequeList, setBankChequeList] = useState("");
  const [calculatedTaxAmount, setCalculatedTaxAmount] = useState("");
  const [allUsersCompany, setAllUsersCompany] = useState("");
  const [companyLoading, setCompanyLoading] = useState("");
  const [chequeLoading, setChequeLoading] = useState("");
  const [inputLoading, setInputLoading] = useState("");
  const [companyDetail, setCompanyDetail] = useState();

  const userType = useSelector((state) => state?.userReducer?.user);

  const fetchAllCompanies = async () => {
    try {
      const response = await Services.Company.companies();
      setAllCompanies(response);
    } catch (error) {
      console.log("Pending User Error", error);
    }
  };

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  const fetchAllUsersCompanies = async () => {
    setCompanyLoading(true);
    try {
      const response = await Services.Company.allUsersAndCompanies();
      setCompanyLoading(false);
      const getAllCompanyNamesOnly =
        response?.flatMap((user) => user?.companies) || [];
      setAllUsersCompany(getAllCompanyNamesOnly);
    } catch (error) {
      setCompanyLoading(false);
      console.log("All User and Companies Error", error);
    }
  };

  useEffect(() => {
    fetchAllUsersCompanies();
  }, []);

  const [state, setState] = useState({
    companyId: "",
    partyName: "",
    bankName: "",
    chequeNo: "",
    chequeAmount: "",
    taxDeductionRate: "",
    underSection: "",
    taxAmount: "",
  });

  const [loading, isLoading] = useState(false);

  const [submitError, setSubmitError] = useState({
    partyNameError: "",
    bankNameError: "",
    chequeNoError: "",
    chequeAmountError: "",
    taxDeductionRateError: "",
    underSectionError: "",
    taxAmountError: "",
  });

  const resetState = () => {
    setState((prevState) => ({
      ...prevState,
      // bankName: "",
      // chequeNo: "",
      chequeAmount: "",
      taxDeductionRate: "",
      underSection: "",
      taxAmount: "",
    }));
  };

  useEffect(() => {
    resetState();
    console.log("Reset State UseEffect CreateLedger.js");
  }, [state.partyName]);

  const onSubmit = async () => {
    if (!isValidate()) return;
    try {
      const payload = {
        companyId: state.companyId,
        // companyName: state.partyName,
        bankName: state.bankName,
        chequeNo: state.chequeNo,
        chequeAmount: state.chequeAmount,
        taxDeductionRate: state.taxDeductionRate,
        underSection: state.underSection,
        taxAmount: state.taxAmount,
      };

      navigate("/dashboard/companies");
      isLoading(true);
      await Services.Ledger.addLedger(payload)
        .then((res) => {
          toast.success("Ledger Added Successfully");
          isLoading(true);
        })
        .catch((err) => {
          console.log("Create Ledger Error", err);
          isLoading(false);
        });
    } catch (err) {
      console.log("Login Screen Error", err);
      isLoading(false);
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    const fetchChequeByBankName = async (selectedValue) => {
      setChequeLoading(true);
      try {
        const response = await Services.Cheque.chequeByBankName(selectedValue);
        const ListChequeNo = response?.flatMap((item) => item?.chequeNo);
        setBankChequeList(ListChequeNo);
        setChequeLoading(false);
      } catch (error) {
        setChequeLoading(false);
        toast.error(error?.response?.data?.message);
      }
    };

    // Check if bankName is selected before fetching cheques
    if (state.bankName) {
      fetchChequeByBankName(state.bankName);
    } else {
      // If bankName is not selected, reset the cheque list
      setBankChequeList([]);
    }
  }, [state.bankName]);

  // fetchChequeByBankName(setBankChequeList)

  console.log("ALL STATESSSSSSS", state?.companyId);

  const isValidate = () => {
    let schema = {
      [SchemaKeys.Party_Name]: yup.string().required(),
      [SchemaKeys.Bank_Name]: yup.string().required(),
      [SchemaKeys.Cheque_No]: yup.string().required(),
      [SchemaKeys.Cheque_Amount]: yup.string().required(),
      [SchemaKeys.Tax_Deduction_Rate]: yup.string().required(),
      [SchemaKeys.Under_Section]: yup.string().required(),
      [SchemaKeys.Tax_Amount]: yup.string().required(),
    };
    let values = {
      [SchemaKeys.Party_Name]: state.partyName,
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
          partyNameError: errorType === "Party Name" ? error : "",
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
        if (error.includes("Party Name")) {
          setError("Party Name", error);
        } else if (error.includes("Bank Name")) {
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
        partyNameError: "",
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

  const getCompanyDetail = async (companyId) => {
    try {
      await Services.Company.companyDetail(companyId)
        .then((res) => {
          setCompanyDetail(res);
          setUnderSectionList(res);
          setTaxDeductionRateList(res);

          setState((prevState) => ({
            ...prevState,
            companyId: companyId,
          }));

          const initialRate = res?.rateOfTax?.[0] || "";
          setInitialRateOfTax(initialRate);

          const initialUnderSection = res?.underSection?.[0] || "";
          setInitialUnderSection(initialUnderSection);
          setInputLoading(true);

          // Set the initial rate of tax as the default value for the "Tax Deduction Rate" field
          setState((prevState) => ({
            ...prevState,
            taxDeductionRate: prevState?.taxDeductionRate || initialRate || "",
            underSection: prevState?.underSection || initialUnderSection || "",
          }));
        })
        .catch((err) => {
          console.log("Detail Error", err);
          setInputLoading(false);
        });
    } catch {
    } finally {
      setInputLoading(false);
      console.log("Loading Closed");
    }
  };

  const [initialRateOfTax, setInitialRateOfTax] = useState("");
  const [initialUnderSection, setInitialUnderSection] = useState("");

  useEffect(() => {
    const calculatedTax =
      (parseFloat(state.chequeAmount) * parseFloat(state.taxDeductionRate)) /
      100;
    setCalculatedTaxAmount(calculatedTax.toFixed(2)); // Format to two decimal places
    setState((prevState) => ({
      ...prevState,
      taxAmount: calculatedTax.toFixed(2), // Format to two decimal places
    }));
  }, [state.chequeAmount, state.taxDeductionRate, calculatedTaxAmount]);

  const clearChequeNo = () => {
    setState((prevState) => ({
      ...prevState,
      chequeNo: "", // Clear the chequeNo state
    }));
  };

  const formArray = [
    {
      id: 1,
      name: "Bank Name",
      xs: 12,
      md: 6,
      type: "text",
      isDropDown: true,
      // data:bankName,
      value: state.bankName,
      onchange: (v) => {
        // setState({ ...state, bankName: v.target.value });
        setSubmitError({ ...submitError, bankNameError: "" });
      },
      setValueToState: (selectedValue) => {
        setState({ ...state, bankName: selectedValue });
        fetchChequeByBankName(setBankChequeList, selectedValue);
      },
      error: submitError.bankNameError,
      options: bankNames,
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
        setSubmitError({ ...submitError, chequeNoError: "" });
      },
      setValueToState: (selectedValue) => {
        setState({ ...state, chequeNo: selectedValue });
      },
      error: submitError.chequeNoError,
      options: bankChequeList && bankChequeList?.map((item) => item),
      // options: bankChequeList && bankChequeList?.flatMap(item => item?.chequeNo),
      value: state.chequeNo,
      chequeLoading: chequeLoading,
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
      options: taxDeductionRateList?.rateOfTax,
      value: state.taxDeductionRate || initialRateOfTax || "",
      // value: state.taxDeductionRate || initialRateOfTax || "",
      // initialValue: rateOfTaxList[0]
    },
    {
      id: 5,
      name: "Under Section",
      xs: 12,
      md: 6,
      // type: "number",
      isDropDown: true,
      onchange: (v) => {
        // setState({ ...state, underSection: v.target.value });
        setSubmitError({ ...submitError, underSectionError: "" });
      },
      setValueToState: (selectedValue) => {
        setState({ ...state, underSection: selectedValue });
      },
      error: submitError.underSectionError,
      options: underSectionList?.underSection,
      value: state.underSection || initialUnderSection || "",
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
      readOnly: true,
    },
  ];

  useEnterKeyHandler(onSubmit);

  const [isPartyNameSelected, setIsPartyNameSelected] = useState(false);

  const handlePartyNameSelect = (isSelected) => {
    setIsPartyNameSelected(isSelected);
  };

  return (
    <div style={{ height: "100vh" }}>
      <DashboardPageHeader headerTitle={"Create Ledger"} />
      <Spacer height={30} />

      <div className="container">
        <div className="item">
          <CustomSearchDropDown
            onChange={(v) => {
              setSubmitError({ ...submitError, partyNameError: "" });
            }}
            setValueToState={(selectedValue) => {
              setState({ ...state, partyName: selectedValue });
            }}
            errorMessage={submitError.partyNameError}
            options={
              userType?.user?.type === "user"
                ? allCompanies?.companies
                : allUsersCompany && allUsersCompany?.flatMap((item) => item)
            }
            inputStyle={{ width: "80%" }}
            containerStyle={{
              display: "flex",
              justifyContent: screenWidth <= 768 ? "center" : "",
              width: "100%",
            }}
            placeholder={"Party Name"}
            getCompanyDetail={getCompanyDetail}
            value={state.partyName}
            loading={companyLoading}
          />
        </div>
      </div>

      <CustomText
        title={"Bank Detail"}
        titleStyle={{ paddingLeft: "8%", paddingTop: 80, fontFamily: "bold" }}
      />

      <div className="container">
        {formArray.map((items, index) => (
          <div className="item" key={index}>
            {!items.isDropDown ? (
              <FormComponent
                type={items.type}
                bodyContainerStyle={{
                  width: "80%",
                  alignSelf: "center",
                }}
                containerTitleStyle={{ fontFamily: "medium" }}
                innerContainerStyle={{
                  backgroundColor: "rgba(239, 239, 239, 1)",
                }}
                containerStyle={{ backgroundColor: "rgba(239, 239, 239, 1)" }}
                placeholder={items.name}
                onChange={items.onchange}
                error={items.error}
                value={items.value}
                readOnly={items.readOnly}
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
                  justifyContent: screenWidth <= 768 ? "center" : "",
                  width: "100%",
                }}
                value={items.value}
                loading={inputLoading}
                handlePartyNameSelect={handlePartyNameSelect}
                isPartyNameSelected={isPartyNameSelected}
                clearChequeNo={clearChequeNo}
                // initialValue={items.initialValue}
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
        // onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default CreateLedger;
