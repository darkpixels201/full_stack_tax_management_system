import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaUserClock, FaClipboardCheck, FaTrophy } from "react-icons/fa";
import { colors } from "../../utils/Colors";
import CustomText from "../CustomComponents/CustomText";
import Spacer from "../CustomComponents/Spacer";
import Services from "../../services";
import Lottie from "lottie-react";
import loader from "../../Assets/json/doubleWhiteLoader.json";
import { useSelector } from "react-redux";

const DashboardCards = () => {
  const user = useSelector((state) => state?.userReducer?.user);
  const [loading, setLoading] = useState();

  // Admin State
  const [ledgerCount, setLedgerCount] = useState();
  const [companyCount, setCompanyCount] = useState();
  const [rateOfTaxCount, setRateOfTaxCount] = useState();
  const [underSectionCount, setUnderSectionCount] = useState();
  const [chequeCount, setChequeCount] = useState();
  const [approvedUserCount, setApprovedUserCount] = useState();
  const [pendingUserCount, setPendingUserCount] = useState();

  // User State
  const [companyUserCount, setCompanyUserCount] = useState();
  const [ledgerUserCount, setLedgerUserCount] = useState();
  const [chequeUserCount, setChequeUserCount] = useState();

  const padSingleDigit = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  const getAllCounts = async () => {
    setLoading(true);
    try {
      await Services?.allCounts
        ?.allCounts()
        .then((res) => {
          // Admin Count
          setCompanyCount(padSingleDigit(res?.companyCount));
          setLedgerCount(padSingleDigit(res?.ledgerCount));
          setRateOfTaxCount(padSingleDigit(res?.rateOfTaxCount));
          setUnderSectionCount(padSingleDigit(res?.UnderSectionCount));
          setChequeCount(padSingleDigit(res?.chequeCount));
          setApprovedUserCount(padSingleDigit(res?.approvedUsersCount));
          setPendingUserCount(padSingleDigit(res?.pendingUsersCount));

          // User Count
          setCompanyUserCount(padSingleDigit(res?.companyCountForUser));
          setLedgerUserCount(padSingleDigit(res?.ledgerCountForUser));
          setChequeUserCount(padSingleDigit(res?.chequeCountForUser));

          setLoading(false);
          console.log("ALL COUNTS res", res);
        })
        .catch((err) => {
          console.log("All Counts Error", err);
          setLoading(false);
        });
    } catch (error) {
      console.log("All Counts Error", error);
      setLoading(false);
    } finally {
    }
  };

  useEffect(() => {
    getAllCounts();
    console.log("All Counts UseEffect");
  }, []);

  const cards = [
    {
      id: 1,
      name: "Companies",
      icon: <FaUserClock fontSize={20} color={colors.white} />,
      color: "#6102ED",
      count: companyCount,
    },
    {
      id: 2,
      name: "Ledgers",
      icon: <FaClipboardCheck fontSize={20} color={colors.white} />,
      color: "#29C0B1",
      count: user?.user?.type === "user" ? ledgerUserCount : ledgerCount,
    },
    {
      id: 3,
      name: "Approved Users",
      icon: <FaClipboardCheck fontSize={20} color={colors.white} />,
      color: "#212437",
      count: approvedUserCount,
    },
    {
      id: 4,
      name: "Pending Users",
      icon: <FaTrophy fontSize={20} color={colors.white} />,
      color: "#2D50ED",
      count: pendingUserCount,
    },
    {
      id: 5,
      name: "Under Section",
      icon: <AiFillStar fontSize={20} color={colors.white} />,
      color: "#2D50ED",
      count: underSectionCount,
    },
    {
      id: 6,
      name: "Rate Of Tax",
      icon: <AiFillStar fontSize={20} color={colors.white} />,
      color: "#6102ED",
      count: rateOfTaxCount,
    },
    {
      id: 7,
      name: "Cheques",
      icon: <AiFillStar fontSize={20} color={colors.white} />,
      color: "#29C0B1",
      count: chequeCount,
    },
    {
      id: 8,
      name: "Banks",
      icon: <AiFillStar fontSize={20} color={colors.white} />,
      color: "#212437",
      count: "33",
    },
  ];

  if (user?.user?.type === "user") {
    cards.splice(2, 4); // Remove elements from index 2 to index 5 (inclusive)
  }

  return (
    <Box sx={{ flexGrow: 1, marginTop: 10, paddingLeft: 3, paddingRight: 3 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 8 }}
      >
        {cards?.map((items, index) => (
          <Grid
            item
            xs={12}
            sm={4}
            md={2}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              style={{
                height: 150,
                width: "95%",
                backgroundColor: items.color,
                borderRadius: 10,
                boxShadow: "0px 0px 8px -2px rgba(0,0,0,0.50)",
              }}
            >
              <div style={{ width: "auto", padding: 18, paddingTop: 20 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      opacity: 0.5,
                      backgroundColor: colors.white,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      marginLeft: 5,
                    }}
                  >
                    {items.icon}
                  </div>
                  <Spacer width={10} />
                  <CustomText
                    title={items.name}
                    titleStyle={{
                      color: colors.white,
                      fontFamily: "bold",
                      fontSize: 15,
                    }}
                  />
                </div>
                <Spacer height={30} />
                <CustomText
                  title={
                    loading ? (
                      <div
                        style={{
                          // position: "absolute",
                          // top: "50%",
                          // left: "50%",
                          // transform: "translate(-50%, -50%)",
                          marginTop: 15,
                        }}
                      >
                        <Lottie
                          animationData={loader}
                          style={{ height: 40, width: 40 }}
                        />
                      </div>
                    ) : (
                      items.count
                    )
                  }
                  titleStyle={{
                    color: colors.white,
                    fontFamily: "medium",
                    fontSize: 28,
                  }}
                />

                {/* <Spacer height={10} />
              <CustomText
                title={"Total for this month"}
                color={colors.white}
                fontSize={13}
                fontFamily={"medium"}
              /> */}
              </div>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardCards;
