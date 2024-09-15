import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "../../Assets/css/CustomSearchDrop.css";
import FormComponent from "../FormComponent";
import loader from "../../Assets/json/thickLoader.json";
import Lottie from "lottie-react";

const CustomSearchDropDown = ({
  placeholder,
  errorMessage,
  onSelect,
  options,
  onChange,
  containerStyle,
  inputStyle,
  dropDownStyle,
  arrowStyle,
  setValueToState,
  value,
  dropDownHasOnChange,
  getCompanyDetail,
  initialValue,
  loading,
  name,
  clearChequeNo,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [selectedOption, setSelectedOption] = useState(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Check if the partyName value is truthy (selected) and update the state
    setIsPartyNameSelected(Boolean(value));
  }, [value]);

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

  const filteredOptions =
    options &&
    options?.filter((option) => {
      const optionLabel =
        option?.label ||
        option?.name ||
        option?.companyName ||
        option?.taxDeductionRate ||
        option?.underSection ||
        option?.chequeNo ||
        option?.username ||
        option;
      return String(optionLabel)
        .toLowerCase()
        .includes(String(searchTerm).toLowerCase());
    });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [isPartyNameSelected, setIsPartyNameSelected] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    const selectedId = option?._id || option?.companyId;

    // setValueToState && setValueToState(selectedId);
    getCompanyDetail && getCompanyDetail(selectedId);

    setSearchTerm(
      option?.label ||
        option?.name ||
        option?.companyName ||
        option?.taxDeductionRate ||
        option?.underSection ||
        option?.chequeNo ||
        option?.username ||
        option
    );

    // console.log("OPTIONSS_________",option)

    setValueToState &&
      setValueToState(
        option?.label ||
          option?.name ||
          option?.companyName ||
          option?.taxDeductionRate ||
          option?.underSection ||
          option?.chequeNo ||
          option?.username ||
          option
      );

    onChange && onChange(option.value);

    // Set the flag indicating that partyName has been selected
    if (option.value === value) {
      setIsPartyNameSelected(true);
    } else {
      setIsPartyNameSelected(false);
    }
  };

  const handleClearSelection = () => {
    setSelectedOption(null);
    setSearchTerm("");

    onChange && onChange("");

    setValueToState && setValueToState("");

    console.log("inputRef.current.id", inputRef.current.placeholder);
    if (inputRef.current && inputRef.current.placeholder === "Bank Name") {
      clearChequeNo && clearChequeNo("");
    }

    inputRef.current && inputRef.current.focus(); // Focus on the input field
  };

  const handleSearchChange = (event) => {
    if (!selectedOption) {
      setSearchTerm(event.target.value);
      setIsOpen(true);
      dropDownHasOnChange && setValueToState(event.target.value);
    }
  };

  useEffect(() => {
    setSearchTerm(value || "");
    // setSelectedOption(null);
  }, [value]);

  return (
    <div
      className="custom-dropdown"
      style={{
        ...containerStyle,
      }}
      ref={dropdownRef}
      onClick={toggleDropdown}
    >
      <FormComponent
        bodyContainerStyle={{
          width: "80%",
          alignSelf: "center",
          ...inputStyle,
        }}
        containerTitleStyle={{ fontFamily: "medium" }}
        innerContainerStyle={{
          backgroundColor: "rgba(239, 239, 239, 1)",
        }}
        name={name}
        containerStyle={{ backgroundColor: "rgba(239, 239, 239, 1)" }}
        type="text"
        placeholder={placeholder}
        error={errorMessage}
        value={searchTerm || initialValue}
        onChange={handleSearchChange}
        readOnly={isPartyNameSelected}
        renderRightItem={() => (
          <>
            {selectedOption ? (
              <>
                {selectedOption && (
                  <RxCross2 fontSize={18} onClick={handleClearSelection} />
                )}
              </>
            ) : (
              <>
                {isPartyNameSelected && (
                  <RxCross2
                    fontSize={18}
                    onClick={() => {
                      setIsPartyNameSelected(false);
                      handleClearSelection();
                    }}
                  />
                )}
              </>
            )}

            {loading ? (
              <Lottie
                animationData={loader}
                style={{ height: 40, width: 40 }}
              />
            ) : (
              ""
            )}
            <div
              style={{ ...arrowStyle }}
              className={`dropdown-arrow ${isOpen ? "open" : ""}`}
            >
              &#9660;
            </div>
          </>
        )}
        inputRef={inputRef}
      />
      {/* </div> */}
      {isOpen && (
        <div className="dropdown-options" style={{ ...dropDownStyle }}>
          {filteredOptions &&
            filteredOptions?.map((option, index) => (
              <div
                key={index}
                // key={option.value}
                className="dropdown-option"
                onClick={() => handleOptionSelect(option)}
              >
                {option?.label ||
                  option?.name ||
                  option?.companyName ||
                  option?.taxDeductionRate ||
                  option?.underSection ||
                  option?.chequeNo ||
                  option?.username ||
                  option}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CustomSearchDropDown;
