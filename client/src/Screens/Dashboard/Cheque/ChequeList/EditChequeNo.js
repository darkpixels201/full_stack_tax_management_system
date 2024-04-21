import React, { useState } from "react";
import "../../../../Assets/css/modalStyle.css";
import FormComponent from "../../../../Components/FormComponent";
import CustomButton from "../../../../Components/CustomComponents/CustomButton";
import Spacer from "../../../../Components/CustomComponents/Spacer";
import ModalHeader from "../../../../Components/CustomComponents/ModalHeader";
import { SchemaKeys } from "../../../../common/constants";
import { _isValidate } from "../../../../utils/validation.utils";
import * as yup from "yup";
import Services from "../../../../services";
import useEnterKeyHandler from "../../../../Components/KeyHandler";
import { toast } from "react-toastify";

const EditChequeNo = ({ onClose, name, ChequeNoID, BankName, fetchChequeList }) => {

  const [EditChequeNoLoading, setChequeNoLoading] = useState()

  const [state, setState] = useState({
    chequeNo: name,
    bankName: BankName
  });


  const [submitError, setSubmitError] = useState({
    chequeNoError: "",
  });

  const isValidate = () => {
    let schema = {
      [SchemaKeys.Edit_Cheque_No]: yup.string().required(),
    };
    let values = {
      [SchemaKeys.Edit_Cheque_No]: state.chequeNo,
    };
    const error = _isValidate(schema, values);
    if (error) {
      setSubmitError({ chequeNoError: error });
    } else {
      setSubmitError({ chequeNoError: "" });
    }
    return error ? false : true;
  };


  const handleInputChange = (e) => {
    setState({ ...state, chequeNo: e.target.value });
    setSubmitError({ chequeNoError: "" });
  };

  const onSubmit = async ()  => {
    if (!isValidate()) return;
    setChequeNoLoading(true)
    try {
      const payload = {
        bankName: state.bankName,
        checkNo: state.chequeNo,
      };
      await Services?.Cheque?.updateCheque(ChequeNoID, payload)
      .then(async (res) => {
        toast.success("Cheque Updated Successfully");
        fetchChequeList()
        onClose();
        setChequeNoLoading(false);
      })
      console.log("Payload", payload);
    } catch (err) {
      console.log("Login Screen Error", err);
      setChequeNoLoading(false)
    }
  };

  useEnterKeyHandler(onSubmit)

  return (
    <div className="wrapper">
      <div
        className="main"
      >
        <ModalHeader onClose={onClose} />
        <div style={{ padding: "0 16px", width: 300 }}>
          <FormComponent
          name={"Edit Cheque No"}
            value={state.chequeNo}
            onChange={handleInputChange}
            error={submitError.chequeNoError}
          />
          <Spacer height={20} />
          <CustomButton
            containerStyle={{ display: "flex", justifyContent: "flex-end" }}
            title={"Save"}
            onClick={onSubmit}
            loading={EditChequeNoLoading}
          />
          <Spacer height={20} />
        </div>
      </div>
    </div>
  );
};

export default EditChequeNo;
