import React, { useEffect, useState } from "react";
import { colors } from "../../../../utils/Colors";
import { UseWindowSize } from "../../../../Components/UseWindowSize";
import CustomButton from "../../../../Components/CustomComponents/CustomButton";
import CustomText from "../../../../Components/CustomComponents/CustomText";
import { pendingUsers } from "../../../../utils/DataArray";
import Spacer from "../../../../Components/CustomComponents/Spacer";
import DashboardPageHeader from "../../../../Components/DashboardComponent/DashboardPageHeader";
import Services from "../../../../services";
import { toast } from "react-toastify";
import CustomLoader from "../../../../Components/CustomLoader";
import { styles } from "../../../../Assets/Style/PendingUserStyle";
import { AiOutlineSearch } from "react-icons/ai";

const PendingUsers = () => {
  const [screenWidth] = UseWindowSize();
  const [pendingUsersList, setPendingUsersList] = useState();
  const [pendingLoading, setPendingLoading] = useState(false);
  const [loadingMap, setLoadingMap] = useState({});
  const [homePageLoader, setHomePageLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPendingUsers = async () => {
    try {
      const response = await Services.Auth.pendingUsers();
      console.log("List Of Pending Users", response);
      setPendingUsersList(response);
      setHomePageLoader(true);

      // Initialize loading status for each user
      const initialLoadingMap = response.reduce((map, user) => {
        map[user.id] = false;
        return map;
      }, {});

      setLoadingMap(initialLoadingMap);
    } catch (error) {
      console.log("Pending User Error", error);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleDeclineClick = async (id) => {
    try {
      setLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [id]: true }));
      await Services.Auth.deletePendingUsers(id)
        .then((res) => {
          console.log("Delete Response", res);
          toast.success("User has been Declined Successfully");
          fetchPendingUsers();
          setPendingLoading(true);
        })
        .catch((err) => {
          console.log("Delete Response Error", err);
          setPendingLoading(false);
        });
    } catch (err) {
      console.log("Pending Users Error", err);
      setPendingLoading(false);
    } finally {
      setLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [id]: false }));
    }
  };

  const handleApproveClick = async (id) => {
    const payload = {
      status: "approve",
    };
    try {
      setLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [id]: true }));
      await Services.Auth.updateUserStatus(id, payload)
        .then((res) => {
          toast.success("Approved Successfully");
          fetchPendingUsers();
        })
        .catch((err) => {
          console.log("Approve Response Error", err);
        });
    } catch (err) {
      console.log("Approve Users Error", err);
    } finally {
      setLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [id]: false }));
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event?.target?.value);
  };

  const filteredPendingUsers = pendingUsersList?.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <DashboardPageHeader headerTitle={"Pending Users"} />
      <Spacer height={30} />
      <div style={{...styles.inputContainerStyle, marginLeft:60}}>
      <AiOutlineSearch />
        <input
          type="text"
          placeholder="Search Pending Users"
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.inputStyle}
        />
      </div>
      {!homePageLoader ? (
        <CustomLoader />
      ) : (
        <div style={{ paddingLeft: 40 }}>
          {filteredPendingUsers?.map((item, index) => (
            <div
              key={index}
              style={{
                ...styles.filterBody,
                width: screenWidth <= 768 ? "auto" : "60%",
                margin: screenWidth <= 768 ? "20px auto" : "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ padding: 10 }}>
                  <CustomText
                    title={item?.username}
                    titleContainerStyle={{
                      alignSelf: "center",
                      paddingRight: 5,
                    }}
                    titleStyle={{ textAlign: "left" }}
                  />

                  <CustomText
                    title={item?.email}
                    titleContainerStyle={{
                      alignSelf: "center",
                      paddingRight: 5,
                    }}
                    titleStyle={{ textAlign: "left" }}
                  />
                </div>
                <div style={{ display: "flex", padding: 10 }}>
                  <CustomButton
                    onClick={() => handleApproveClick(item.id)}
                    title={"Approve"}
                    titleStyle={{ color: colors.green, fontFamily: "medium" }}
                    innerContainerStyle={{
                      width: "auto",
                      backgroundColor: colors.bgGreen,
                    }}
                    containerStyle={{ width: "auto" }}
                    loading={loadingMap[item.id]}
                  />
                  <Spacer width={10} />
                  <CustomButton
                    onClick={() => handleDeclineClick(item.id)}
                    title={"Decline"}
                    titleStyle={{ color: colors.red, fontFamily: "medium" }}
                    innerContainerStyle={{
                      width: "auto",
                      backgroundColor: colors.bgRed,
                    }}
                    containerStyle={{ width: "auto" }}
                    // loading={pendingLoading}
                    loading={loadingMap[item.id]}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PendingUsers;
