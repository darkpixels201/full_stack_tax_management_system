import React, { useState } from "react";
import "../../../Assets/css/modalStyle.css";
import FormComponent from "../../../Components/FormComponent";
import CustomButton from "../../../Components/CustomComponents/CustomButton";
import Spacer from "../../../Components/CustomComponents/Spacer";
import ModalHeader from "../../../Components/CustomComponents/ModalHeader";
import { SchemaKeys } from "../../../common/constants";
import { _isValidate } from "../../../utils/validation.utils";
import * as yup from "yup";
import Services from "../../../services";
import { toast } from "react-toastify";
import useEnterKeyHandler from "../../../Components/KeyHandler";

const AddRateOfTax = ({ onClose, fetchRateOfTaxList, toggle }) => {

  const [addLoading, isAddLoading] = useState()

  const [state, setState] = useState({
    rateOfTax: "",
  });

  const [submitError, setSubmitError] = useState({
    rateOfTaxError: "",
  });

  const isValidate = () => {
    let schema = {
      [SchemaKeys.Add_Rate_Of_Tax]: yup.string().required(),
    };
    let values = {
      [SchemaKeys.Add_Rate_Of_Tax]: state.rateOfTax,
    };
    const error = _isValidate(schema, values);
    if (error) {
      setSubmitError({ rateOfTaxError: error });
    } else {
      setSubmitError({ rateOfTaxError: "" });
    }
    return error ? false : true;
  };


  const handleInputChange = (e) => {
    setState({ ...state, rateOfTax: e.target.value });
    setSubmitError({ rateOfTaxError: "" });
  };

  const onSubmit = async () => {
    if (!isValidate()) return;
    try {
      const payload = {
        taxDeductionRate: state.rateOfTax,
      };
      isAddLoading(true)
      await Services.RateOfTax.addRateOfTax(payload)
        .then((response) => {
          console.log("Rate Of Tax Response",response);
            toast.success("Rate Of Tax Added Successfully");
            onClose()
            setState({rateOfTax:""})
            fetchRateOfTaxList()
            isAddLoading(false)
        })
        .catch((err) => {
          console.log("Rate Of Tax Response Error", err);
          isAddLoading(false)
          // toast.warning(err.response.data.message);
          // isLoading(false);
        });
      console.log("Payload", payload);
    } catch (err) {
      isAddLoading(false)
      console.log("Rate Of Tax Error", err);
    }
  };

  useEnterKeyHandler(onSubmit)

  return (
    <div className="wrapper">
      <div
        className={`main ${toggle ? "slide-fade-in" : "slide-fade-out"} `}
        
      >
        <ModalHeader onClose={onClose} />
        <div style={{ padding: "0 16px", width: 300 }}>
          <FormComponent
          name={"Add Rate Of Tax"}
            value={state.rateOfTax}
            onChange={handleInputChange}
            error={submitError.rateOfTaxError}
          />
          <Spacer height={20} />
          <CustomButton
            containerStyle={{ display: "flex", justifyContent: "flex-end" }}
            title={"Save"}
            onClick={onSubmit}
            loading={addLoading}
          />
          <Spacer height={20} />
        </div>
      </div>
    </div>
  );
};

export default AddRateOfTax;
