import React, { useEffect, useRef, useState } from "react";
import CustomCheckbox from "./CustomCheckbox";
import "../../Assets/css/CustomSearchDrop.css";
import FormComponent from "../FormComponent";
import { RxCross2 } from "react-icons/rx";
import CustomText from "./CustomText";
import { colors } from "../../utils/Colors";
import Spacer from "./Spacer";

const CustomTagCheckBox = ({
  options,
  arrowStyle,
  placeholder,
  errorMessage,
  setValueToState,
  value,
  name
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    // Set initial values if provided
    if (Array.isArray(value) && value.length > 0) {
      setSelectedOptions(value);
      console.log("UseEffect Of a Value CustomTagCheckBox.js")
      // setValueToState(value);
    }
  }, [value]);

  //   const handleCheckboxChange = (option) => {
  //     setSelectedOptions((prevSelectedOptions) => {
  //       if (prevSelectedOptions.includes(option)) {
  //         return prevSelectedOptions.filter((item) => item !== option);
  //       } else {
  //         return [...prevSelectedOptions, option];
  //       }
  //     });
  //   };

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedSelectedOptions = prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter((item) => item !== option)
        : [...prevSelectedOptions, option];

      //     // console.log("updatedSelectedOptions",updatedSelectedOptions?.label)
      //     const labels = updatedSelectedOptions?.map((selectedOption) => selectedOption?.label);
      //   // Call setValueToState with the updated selectedOptions
      //   setValueToState(labels);

      // Extract only labels from the options
      const labels = updatedSelectedOptions.map(
        (selectedOption) =>
          selectedOption.label ||
          selectedOption.taxDeductionRate ||
          selectedOption?.underSection ||
          selectedOption
      );

      // Call setValueToState with the updated labels
      setValueToState(labels);

      return updatedSelectedOptions;
    });
  };

  const filteredOptions = Array.isArray(options)
    ? options.filter((option) => {
        const optionLabel =
          option?.label ||
          option?.name ||
          option?.companyName ||
          option?.taxDeductionRate ||
          option?.underSection ||
          option?.chequeNo ||
          option;
        // option?.underSection;
        return optionLabel?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      })
    : [];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Prevent closing the dropdown when clicking inside the options
  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  const handleRemoveOption = (option, e) => {
    e.stopPropagation();

    // setSelectedOptions((prevSelectedOptions) =>
    //   prevSelectedOptions.filter((item) => item !== option)
    // );

    setSelectedOptions((prevSelectedOptions) => {
      const updatedSelectedOptions = prevSelectedOptions.filter(
        (item) => item !== option
      );

      // Extract only labels from the options
      const labels = updatedSelectedOptions.map(
        (selectedOption) =>
          selectedOption.label ||
          selectedOption.taxDeductionRate ||
          selectedOption?.underSection ||
          selectedOption
      );

      console.log("set Value TO STATE", updatedSelectedOptions);
      // Call setValueToState with the updated labels
      setValueToState(labels.length > 0 ? labels : "");

      return updatedSelectedOptions;
    });
  };


  // Handle the case where searchTerm is empty to show all options
const allOptions = Array.isArray(options) ? options : [];
const optionsToShow = searchTerm ? filteredOptions : allOptions;

  return (
    <div className="custom-dropdown" onClick={toggleDropdown} ref={dropdownRef}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FormComponent
          bodyContainerStyle={{
            width: "80%",
            alignSelf: "center",
            //   ...inputStyle,
          }}
          containerTitleStyle={{ fontFamily: "medium" }}
          innerContainerStyle={{
            backgroundColor: "rgba(239, 239, 239, 1)",
          }}
          containerStyle={{ backgroundColor: "rgba(239, 239, 239, 1)" }}
          // type="text"
          placeholder={placeholder}
          error={errorMessage}
          value={searchTerm}
          name={name}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          renderRightItem={() => (
            <>
              <div
                //   style={{ ...arrowStyle }}
                className={`dropdown-arrow ${isOpen ? "open" : ""}`}
              >
                &#9660;
              </div>
            </>
          )}
        />

        {isOpen && (
          <div className="dropdown-options" onClick={handleDropdownClick}>
            {optionsToShow.map((option) => (
              <CustomCheckbox
                key={
                  option?.label ||
                  option?.taxDeductionRate ||
                  option?.underSection ||
                  option
                }
                label={
                  option?.label ||
                  option?.taxDeductionRate ||
                  option?.underSection ||
                  option
                }
                isChecked={selectedOptions?.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginRight: 10,
        }}
      >
        {selectedOptions.map((option) => (
          <>
            <Spacer width={10} />
            <div
              style={{
                padding: 8,
                backgroundColor: colors.grey4,
                display: "flex",
                borderRadius: 20,
                marginTop: 10,
              }}
            >
              <RxCross2
                style={{ alignSelf: "center", cursor: "pointer" }}
                fontSize={18}
                onClick={(e) => handleRemoveOption(option, e)}
              />
              <CustomText
                title={
                  option?.label ||
                  option?.taxDeductionRate ||
                  option?.underSection ||
                  option
                }
                titleStyle={{ fontSize: 11 }}
              />
            </div>
          </>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default CustomTagCheckBox;
