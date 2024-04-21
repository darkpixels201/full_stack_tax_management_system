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

const EditUnderSection = ({
  onClose,
  name,
  underSectionID,
  fetchUnderSectionList,
  toggle
}) => {
  const [state, setState] = useState({
    underSection: name,
  });

  const [submitError, setSubmitError] = useState({
    underSectionError: "",
  });

  const isValidate = () => {
    let schema = {
      [SchemaKeys.Under_Section]: yup.string().required(),
    };
    let values = {
      [SchemaKeys.Under_Section]: state.underSection,
    };
    const error = _isValidate(schema, values);
    if (error) {
      setSubmitError({ underSectionError: error });
    } else {
      setSubmitError({ underSectionError: "" });
    }
    return error ? false : true;
  };

  const handleInputChange = (e) => {
    setState({ ...state, underSection: e.target.value });
    setSubmitError({ underSectionError: "" });
  };

  const onSubmit = async () => {
    if (!isValidate()) return;
    try {
      const payload = {
        underSection: state.underSection,
      };
      await Services.UnderSection.updateUnderSection(
        underSectionID,
        payload
      ).then(async (res) => {
        console.log("UPDATE Under Section Response", res);
        toast.success("Under Section Updated Successfully");
        //   navigate("/dashboard/companies");
        fetchUnderSectionList();
        onClose();
        // isLoading(false);
      });
      console.log("Payload", payload);
    } catch (err) {
      console.log("Under Section Error", err);
    }
  };

  return (
    <div className="wrapper">
      <div className={`main ${toggle ? "slide-fade-in" : "slide-fade-out"} `}>
        <ModalHeader onClose={onClose} />
        <div style={{ padding: "0 16px", width: 300 }}>
          <FormComponent
            name={"Edit Under Section"}
            value={state.underSection}
            onChange={handleInputChange}
            error={submitError.underSectionError}
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

export default EditUnderSection;
