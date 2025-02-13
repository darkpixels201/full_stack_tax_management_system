import React, { useState } from "react";
import * as yup from "yup";
import DashboardPageHeader from "../../../../Components/DashboardComponent/DashboardPageHeader";
import CustomSearchDropDown from "../../../../Components/CustomComponents/CustomSearchDropDown";
import { bankName, bankNames, top100Films } from "../../../../utils/DataArray";
import { UseWindowSize } from "../../../../Components/UseWindowSize";
import FormComponent from "../../../../Components/FormComponent";
import { SchemaKeys } from "../../../../common/constants";
import { _isValidate } from "../../../../utils/validation.utils";
import CustomButton from "../../../../Components/CustomComponents/CustomButton";
import "../../../../Assets/css/style.css";
import Spacer from "../../../../Components/CustomComponents/Spacer";
import Services from "../../../../services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useEnterKeyHandler from "../../../../Components/KeyHandler";
import { icons } from "../../../../Assets/Icons";
import { convertImageUrlToFile } from "../../../../utils/common.utils";
import { styles } from "../../../../Assets/Style/AddCompanyStyle";

const AddCheque = () => {
  const navigate = useNavigate();
  const [screenWidth] = UseWindowSize();
  const [loading, isLoading] = useState();

  const [state, setState] = useState({
    bankName: "",
    chequeNo: "",
    chequeImage: "",
  });

  console.log("STATETET", state);

  const [submitError, setSubmitError] = useState({
    bankNameError: "",
    chequeNoError: "",
  });

  const onSubmit = async () => {
    if (!isValidate()) return;
    try {
      const formData = new FormData();
      formData.append("bankName", state.bankName);
      formData.append("checkNo", state.chequeNo);

      if (state.chequeImage instanceof File) {
        formData.append("chequeImage", state.chequeImage);
      } else if (typeof state.chequeImage === "string") {
        const file = await convertImageUrlToFile(state.chequeImage);
        if (file) {
          formData.append("chequeImage", file);
        }
      }

      isLoading(true);
      await Services?.Cheque?.addCheque(formData)
        .then((res) => {
          console.log("Cheque Response ---", res);
          toast.success("Cheque Added Successfully");
          navigate("/dashboard/chequelist");
        })
        .catch((err) => {
          console.log("Add Cheque Error", err);
          // toast.warn(err?.response?.data?.message)
          isLoading(false);
        });
      console.log("Payload", formData);
    } catch (err) {
      console.log("Add Cheque Screen Error", err);
      isLoading(false);
    }
  };

  useEnterKeyHandler(onSubmit);

  const isValidate = () => {
    let schema = {
      [SchemaKeys.Bank_Name]: yup.string().required(),
      [SchemaKeys.Cheque_No]: yup.string().required(),
    };
    let values = {
      [SchemaKeys.Bank_Name]: state.bankName,
      [SchemaKeys.Cheque_No]: state.chequeNo,
    };
    const error = _isValidate(schema, values);
    if (error) {
      const setError = (errorType, error) => {
        setSubmitError({
          bankNameError: errorType === "Bank Name" ? error : "",
          chequeNoError: errorType === "Cheque No" ? error : "",
        });
      };
      if (error) {
        if (error.includes("Bank Name")) {
          setError("Bank Name", error);
        } else if (error.includes("Cheque No")) {
          setError("Cheque No", error);
        }
      }
    } else {
      setSubmitError({
        bankNameError: "",
        chequeNoError: "",
      });
    }
    return error ? false : true;
  };

  return (
    <div style={{ height: "100vh" }}>
      <DashboardPageHeader headerTitle={"Add Cheque"} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 30,
        }}
      >
        <CustomSearchDropDown
          onChange={(v) => {
            setSubmitError({ ...submitError, bankNameError: "" });
          }}
          setValueToState={(selectedValue, selectedImage) => {
            setState({
              ...state,
              bankName: selectedValue,  // Store the selected bank name
              chequeImage: selectedImage, // Store the selected bank image
            });
          }}
          dropDownStyle={{ width: screenWidth <= 768 ? "auto" : "40%" }}
          options={bankNames}
          value={state.bankName}
          errorMessage={submitError.bankNameError}
          inputStyle={{ width: screenWidth <= 768 ? "100%" : "40%" }}
          containerStyle={{
            // display: "flex",
            width: "auto",
          }}
          placeholder={"Select Bank"}
        />
        <Spacer height={10} />
        <FormComponent
          bodyContainerStyle={{
            width: screenWidth <= 768 ? "100%" : "40%",
          }}
          containerTitleStyle={{ fontFamily: "medium" }}
          innerContainerStyle={{
            backgroundColor: "rgba(239, 239, 239, 1)",
          }}
          value={state.chequeNo}
          containerStyle={{ backgroundColor: "rgba(239, 239, 239, 1)" }}
          placeholder={"Cheque No"}
          onChange={(v) => {
            setState({ ...state, chequeNo: v.target.value });
            setSubmitError({ ...submitError, chequeNoError: "" });
          }}
          error={submitError.chequeNoError}
          type={"number"}
        />
        <Spacer height={20} />
        <CustomButton
          onClick={onSubmit}
          title="Save"
          className={"container"}
          // loading={loading}
          containerStyle={{
            display: "flex",
            justifyContent: "flex-end",
            width: screenWidth <= 768 ? "100%" : "40%",
          }}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AddCheque;
