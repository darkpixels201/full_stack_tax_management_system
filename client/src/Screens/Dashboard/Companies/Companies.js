import React, { useEffect, useState } from "react";
import { colors } from "../../../utils/Colors";
import { UseWindowSize } from "../../../Components/UseWindowSize";
import CustomText from "../../../Components/CustomComponents/CustomText";
import { companyList } from "../../../utils/DataArray";
import { useNavigate } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import DashboardPageHeader from "../../../Components/DashboardComponent/DashboardPageHeader";
import Spacer from "../../../Components/CustomComponents/Spacer";
import Services from "../../../services";
import { toast } from "react-toastify";
import CustomLoader from "../../../Components/CustomLoader";
import CustomizeCheckbox from "../../../Components/CustomComponents/CustomizeCheckbox";
import loader from "../../../Assets/json/thickLoader.json";
import Lottie from "lottie-web";

const Companies = () => {
  const [screenWidth] = UseWindowSize();
  const navigate = useNavigate();
  const handleClick = (item) => {
    navigate(`/dashboard/companies/${item._id}`, { state: item });
    console.log("COMPNAY DATA", item);
  };
  const [homePageLoader, setHomePageLoader] = useState(false);
  const [allCompanies, setAllCompanies] = useState();

  const fetchAllCompanies = async () => {
    try {
      const response = await Services?.Company?.myCompanies();
      console.log("MY COMPANY ONLY", response);
      // const getCompanies = await response?.map((item)=>item?.companies)
      // console.log("GETEEETETTE",getCompanies)
      setAllCompanies(response);
      // setAllCompanies(response?.companies);
      setHomePageLoader(true);
    } catch (error) {
      console.log("Companies Error", error);
      setHomePageLoader(false)
    }
  };

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  const handleCompanyDetail = (item) => {
    navigate(`/dashboard/companydetail/${item._id}`);
  };

  // const updateCompany = async (id, showToAdmin) => {
  //   console.log("Compnay ID",id)
  //   console.log("showToAdmin",showToAdmin)
  //   try {
  //     const payload = {
  //       showToAdmin: showToAdmin
  //     }
  //     console.log("Payload",payload)
  //     // Services.Company.updateCompany(payload).then((res) => {

  //     // }).catch((err => {

  //     // }))

  //   } catch {

  //   }
  // }

  const [checkboxState, setCheckboxState] = useState({});

  // Local state to manage loading state for each company
  const [loadingState, setLoadingState] = useState({});

  // Function to set loading state for a specific company
  const setCompanyLoadingState = (companyId, loading) => {
    setLoadingState((prevLoadingState) => ({
      ...prevLoadingState,
      [companyId]: loading,
    }));
  };

  useEffect(() => {
    // Initialize checkbox state based on allCompanies data
    const initialCheckboxState = {};
    allCompanies?.forEach((item) => {
      initialCheckboxState[item._id] = item.showToAdmin;
    });
    setCheckboxState(initialCheckboxState);
  }, [allCompanies]);

  const updateCompany = async (id, showToAdmin) => {
    try {
      setCompanyLoadingState(id, true);
      const updatedShowToAdmin = !showToAdmin;
      const payload = {
        showToAdmin: updatedShowToAdmin,
      };

      Services.Company.showToAdminStatus(id, payload)
        .then((res) => {
          console.log("Success Response", res);
          toast.success(res?.message);
          setCheckboxState((prevState) => ({
            ...prevState,
            [id]: updatedShowToAdmin,
          }));
          setCompanyLoadingState(id, false);
        })
        .catch((err) => {
          console.log("Show to Admin Error", err);
          toast.error(err);
          setCompanyLoadingState(id, false);
        });
    } catch (error) {
      console.error("Error updating company:", error);
      setCompanyLoadingState(id, false);
    }
  };

  return (
    <>
      <DashboardPageHeader headerTitle={"Company"} />
      <Spacer height={30} />
      {homePageLoader ? (
        <div style={{ paddingLeft: 40 }}>
          {allCompanies?.map((item, index) => (
            <div
              key={index}
              style={{
                width: screenWidth <= 768 ? "auto" : "60%",
                backgroundColor: colors.white,
                borderLeft: `5px solid ${colors.black2}`,
                borderRadius: 10,
                boxShadow: "0px 0px 8px -2px rgba(0,0,0,0.12)",
                margin: screenWidth <= 768 ? "20px auto" : "20px",
                textAlign: "center",
                padding: 20,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <CustomText
                  onClick={() => handleCompanyDetail(item)}
                  title={item.companyName}
                  // title={item._id}
                  titleContainerStyle={{
                    alignSelf: "center",
                    paddingRight: 5,
                    cursor: "pointer",
                  }}
                  titleStyle={{ textAlign: "left" }}
                />
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex" }}>
                    {/* <Checkbox
                    // checked={item.showToAdmin}
                    // onChange={(e) => updateCompany(item._id, e.target.checked)}
                    checked={checkboxState[item._id]}
                    onChange={() => updateCompany(item._id, checkboxState[item._id])}
                  /> */}
                    {/* <input
                      type="checkbox"
                      checked={checkboxState[item._id]}
                      onChange={() =>
                        updateCompany(item._id, checkboxState[item._id])
                      }
                    /> */}
                    {loadingState[item?._id] &&
                    <div style={{marginBottom:10}} >
                      <CustomLoader height={30} width={30} />
                    </div>
                     }
                    <CustomizeCheckbox
                      key={item?._id}
                      id={`terms-checkbox-${item?._id}`}
                      checked={checkboxState[item?._id]}
                      onChange={() =>
                        updateCompany(item?._id, checkboxState[item?._id])
                      }
                    />
                    <CustomText
                      title={"Show To Admin"}
                      titleStyle={{ fontSize: 12, fontFamily: "medium" }}
                    />
                  </div>
                  <Spacer width={20} />
                  <CustomText
                    onClick={() => handleClick(item)}
                    title={"View Ledger"}
                    titleContainerStyle={{ cursor: "pointer" }}
                    titleStyle={{
                      fontFamily: "medium",
                      textDecoration: "underline",
                    }}
                    rightIcon={<RiArrowRightSLine size={18} fontWeight={900} />}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CustomLoader />
      )}
    </>
  );
};

export default Companies;
