import React, { useEffect, useState } from "react";
import { colors } from "../../../../utils/Colors";
import { UseWindowSize } from "../../../../Components/UseWindowSize";
import CustomText from "../../../../Components/CustomComponents/CustomText";
import Spacer from "../../../../Components/CustomComponents/Spacer";
import { FaTrash } from "react-icons/fa";
import DashboardPageHeader from "../../../../Components/DashboardComponent/DashboardPageHeader";
import Services from "../../../../services";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AiOutlineSearch } from "react-icons/ai";
import { styles } from "../../../../Assets/Style/PendingUserStyle";
import "../../../../Assets/css/toggleSwitch.css";
import Lottie from "lottie-react";
import loader from "../../../../Assets/json/thickLoader.json";
import CustomLoader from "../../../../Components/CustomLoader";

const ApprovedUsers = () => {
  const [screenWidth] = UseWindowSize();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeUser, setActiveUser] = useState();
  const [toggleLoadingMap, setToggleLoadingMap] = useState({});
  const [homePageLoader, setHomePageLoader] = useState(false);

  const toggleSwitch = async (index) => {
    try {
      const updatedState = {
        ...activeUser,
        [index]: activeUser[index] === "active" ? "in-active" : "active",
      };
      // Set loading state for the specific toggle
      setToggleLoadingMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [index]: true,
      }));
      const payload = {
        accountStatus: updatedState[index],
      };

      try {
        await Services.Auth.updateAccountStatus(index, payload)
          .then((res) => {
            console.log("Account Status Response", res);
            toast.success("User Status Changed Successfully");
          })
          .catch((err) => {
            console.log("Error Account Status", err);
            toast.error(err?.message);
          });
      } catch (err) {
        console.log("Try Catch Error", err);
        setToggleLoadingMap((prevLoadingMap) => ({
          ...prevLoadingMap,
          [index]: false,
        }));
      } finally {
        // Reset loading state for the specific toggle
        setToggleLoadingMap((prevLoadingMap) => ({
          ...prevLoadingMap,
          [index]: false,
        }));
      }
      setActiveUser(updatedState);
    } catch (error) {
      console.error("Toggle Switch Error", error);
      toast.error("Error changing user status");
      setToggleLoadingMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [index]: false,
      }));
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure you want to Delete this User?",
        // text: "You will not be able to recover this company!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: colors.primary,
        cancelButtonColor: colors.grey2,
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        await Services.Auth.deleteApprovedUsers(id)
          .then((res) => {
            console.log("Delete Response", res);
            toast.success("User has been Deleted Successfully");
            fetchApprovedUsers();
            // setPendingLoading(true);
          })
          .catch((err) => {
            console.log("Delete Response Error", err);
            // setPendingLoading(false);
          });
      }
    } catch (err) {
      console.log("Pending Users Error", err);
      // setPendingLoading(false);
    } finally {
      // setLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [id]: false }));
    }
  };

  const [approvedUsersList, setApprovedUsersList] = useState();

  const fetchApprovedUsers = async () => {
    try {
      const response = await Services?.Auth?.approvedUsers();
      console.log("List Of Approved Users", response);
      setApprovedUsersList(response);
      setHomePageLoader(true);

      // Set the initial activeUser state based on accountStatus
      const initialActiveUserState = Object.fromEntries(
        response.map((user) => [user.id, user.accountStatus])
      );

      setActiveUser(initialActiveUserState);
    } catch (error) {
      console.log("Pending User Error", error);
    }
  };

  useEffect(() => {
    fetchApprovedUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event?.target?.value);
  };

  const filteredApprovedUsers = approvedUsersList?.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <DashboardPageHeader headerTitle={"Approved Users"} />
      <Spacer height={30} />
      <div style={{ ...styles.inputContainerStyle, marginLeft: 60 }}>
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
          {filteredApprovedUsers?.map((item, index) => (
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
                <div
                  style={{ display: "flex", padding: 10, alignSelf: "center" }}
                >
                  <CustomText
                    titleContainerStyle={{
                      alignSelf: "center",
                      backgroundColor:
                        activeUser[item?.id] === "active"
                          ? colors.bgGreen
                          : colors.bgRed,
                      padding: 4,
                      borderRadius: 5,
                    }}
                    titleStyle={{
                      fontFamily: "medium",
                      fontSize: 13,
                      color:
                        activeUser[item?.id] === "active"
                          ? colors.green
                          : colors.red,
                    }}
                    title={
                      activeUser[item?.id] === "active" ? "active" : "In-active"
                    }
                  />
                  <Spacer width={10} />
                  {toggleLoadingMap[item?.id] && (
                    <Lottie
                      animationData={loader}
                      style={{ height: 40, width: 40 }}
                    />
                  )}
                  <div style={{ alignSelf: "center" }}>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={activeUser[item?.id] === "active"}
                        onChange={() => toggleSwitch(item?.id)}
                        // value={item?.accountStatus}
                        disabled={toggleLoadingMap[item?.id]}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <Spacer width={10} />
                  <FaTrash
                    style={{ alignSelf: "center", cursor: "pointer" }}
                    size={18}
                    color={colors.red}
                    onClick={() => handleDeleteClick(item.id)}
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

export default ApprovedUsers;
