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

const EditRateOfTax = ({ onClose, name, rateOfTaxID, fetchRateOfTaxList, toggle }) => {
  const [state, setState] = useState({
    rateOfTax: name,
  });

  // console.log("ID Rate",rateOfTaxID)

  const [submitError, setSubmitError] = useState({
    rateOfTaxError: "",
  });

  const isValidate = () => {
    let schema = {
      [SchemaKeys.Rate_Of_Tax]: yup.string().required(),
    };
    let values = {
      [SchemaKeys.Rate_Of_Tax]: state.rateOfTax,
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
      await Services.RateOfTax.updateRateOfTax(rateOfTaxID, payload)
        .then(async (res) => {
          console.log("UPDATE rate of tax Response", res);
          toast.success("Rate of Tax Updated Successfully");
          //   navigate("/dashboard/companies");
          fetchRateOfTaxList()
          onClose();
          // isLoading(false);
        })
      console.log("Payload", payload);
    } catch (err) {
      console.log("Update Rate of tax Error", err);
    }
  };

  return (
    <div className="wrapper">
      <div
        className={`main ${toggle ? "slide-fade-in" : "slide-fade-out"} `}
      >
        <ModalHeader onClose={onClose} />
        <div style={{ padding: "0 16px", width: 300 }}>
          <FormComponent
          name={"Edit Rate Of Tax"}
            value={state.rateOfTax}
            onChange={handleInputChange}
            error={submitError.rateOfTaxError}
          />
          <Spacer height={20} />
          <CustomButton
            containerStyle={{ display: "flex", justifyContent: "flex-end" }}
            title={"Save"}
            onClick={onSubmit}
          />
          <Spacer height={20} />
        </div>
      </div>
    </div>
  );
};

export default EditRateOfTax;
