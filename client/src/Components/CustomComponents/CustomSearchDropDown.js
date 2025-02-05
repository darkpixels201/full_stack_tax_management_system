import React, { useEffect, useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "../../Assets/css/CustomSearchDrop.css";
import FormComponent from "../FormComponent";
import loader from "../../Assets/json/thickLoader.json";
import Lottie from "lottie-react";
import { RiPercentLine } from "react-icons/ri";
import { colors } from "../../utils/Colors";
import Spacer from "./Spacer";

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
  ShowPercentageIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [selectedOption, setSelectedOption] = useState(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // useEffect(() => {
  //   // Check if the partyName value is truthy (selected) and update the state
  //   const isPartyNameSelected = useMemo(() => Boolean(value), [value]);
  // }, [value]);

  // const isPartyNameSelected = useMemo(() => {
  //   return selectedOption?.value === value;
  // }, [selectedOption, value]);

  const [isActionTriggered, setIsActionTriggered] = useState(false);

  const isPartyNameSelected = useMemo(() => {
    return Boolean(value) || isActionTriggered;
  }, [value, isActionTriggered]);

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

  // Memoize the filtered options to avoid recalculating on every render
  const filteredOptions = useMemo(() => {
    return (
      options &&
      options.filter((option) => {
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
      })
    );
  }, [options, searchTerm]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Memoize the isPartyNameSelected flag
  //  const isPartyNameSelected = useMemo(() => Boolean(value), [value]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    const selectedId = option?._id || option?.companyId;

    // setValueToState && setValueToState(selectedId);
    getCompanyDetail && getCompanyDetail(selectedId);

    // Determine the display value
    let displayValue;
    displayValue =
      option?.label ||
      option?.name ||
      option?.companyName ||
      option?.underSection ||
      option?.chequeNo ||
      option?.username ||
      option;

    setSearchTerm(displayValue);

    setValueToState && setValueToState(displayValue);

    getCompanyDetail && getCompanyDetail(selectedId);

    onChange && onChange(option.value);

    // Set the flag indicating that partyName has been selected
    if (option.value === value) {
      setIsActionTriggered(true);
    } else {
      setIsActionTriggered(false);
    }
  };

  const handleClearSelection = () => {
    setSelectedOption(null);
    setSearchTerm("");
    onChange && onChange("");
    setValueToState && setValueToState("");
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

  // useEffect(() => {
  //   if (!ignoreInitialValue) {
  //     const formattedValue =
  //       value && options?.some((option) => option?.taxDeductionRate)
  //         ? `${value}%`
  //         : value || "";
  //     setSearchTerm(formattedValue);
  //   }
  // }, [value, ignoreInitialValue, options]);

  useEffect(() => {
    setSearchTerm(value || "");
    setSelectedOption(null);
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
        // value={ignoreInitialValue ? `${searchTerm}%` : searchTerm || initialValue}
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
                      setIsActionTriggered(false);
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

            {ShowPercentageIcon && (
              <div
                style={{
                  backgroundColor: colors.grey5,
                  padding: 5,
                  marginLeft: 5,
                  marginRight: -8,
                  borderRadius: 5,
                }}
              >
                <RiPercentLine style={{ padding: 5 }} />
              </div>
            )}
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
                style={{ alignItems: "center", display: "flex", fontSize:15 }}
              >
                <img src={option.logo} style={{height:35, width:35}} />
                <Spacer width={5} />
                {option?.label ||
                  option?.name ||
                  option?.companyName ||
                  option?.taxDeductionRate ||
                  option?.underSection ||
                  option?.chequeNo ||
                  option?.username ||
                  option}
                {ShowPercentageIcon && (
                  <RiPercentLine style={{ marginLeft: 3 }} />
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

// Wrap the component with React.memo
export default React.memo(CustomSearchDropDown);
