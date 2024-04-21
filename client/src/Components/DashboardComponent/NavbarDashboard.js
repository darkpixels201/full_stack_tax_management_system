import React, { useEffect, useState } from "react";
import { Sidebar, Menu, SubMenu } from "react-pro-sidebar";
import "../../Assets/css/style.css";
import { BiUser } from "react-icons/bi";
import NavbarMap from "./NavbarMap";
import { colors } from "../../utils/Colors";
import Spacer from "../CustomComponents/Spacer";
import { BsShieldShaded } from "react-icons/bs";
import { useSelector } from "react-redux";
import CustomText from "../CustomComponents/CustomText";
import { icons } from "../../Assets/Icons";

const NavbarDashboard = ({ sideBar, setSideBar }) => {
  const user = useSelector((state) => state.userReducer.user);
  const [menu, setMenu] = useState([
    {
      id: 1,
      menuItem: {
        name: "Dashboard",
        path: "/dashboard",
        icon: <img src={icons.dashboard} style={{height:18, width:18}} />,
        // icon: <BsShieldShaded size={17} />,
      },
    },
    {
      id: 2,
      menuItem: {
        name: "Company",
        icon: <img src={icons.company} style={{height:18, width:18}} />,
      },
      subMenu: [
        { id: 1, name: "Add Company", path: "/dashboard/addcompany" },
        { id: 2, name: "My Company", path: "/dashboard/companies" },
        { id: 3, name: "All Companies", path: "/dashboard/allCompanies" },
      ],
    },
    {
      id: 3,
      menuItem: {
        name: "Create Ledger",
        path: "/dashboard/createledger",
        icon: <img src={icons.ledger} style={{height:18, width:18}} />,
      },
    },

    {
      id: 4,
      menuItem: {
        name: "Users",
        icon: <img src={icons.user} style={{height:18, width:18}} />,
      },
      subMenu: [
        { id: 1, name: "Pending Users", path: "/dashboard/pendingusers" },
        { id: 2, name: "Approved Users", path: "/dashboard/approvedusers" },
      ],
    },
    {
      id: 5,
      menuItem: {
        name: "Cheque",
        icon: <img src={icons.cheque} style={{height:18, width:18}} />,
      },
      subMenu: [
        { id: 1, name: "Cheque List", path: "/dashboard/chequelist" },
        { id: 2, name: "Add Cheque", path: "/dashboard/addcheque" },
      ],
    },
    {
      id: 6,
      menuItem: {
        name: "Under Section",
        path: "/dashboard/undersection",
        icon: <img src={icons.underSection} style={{height:18, width:18}} />,
      },
    },
    {
      id: 7,
      menuItem: {
        name: "Rate Of Tax",
        path: "/dashboard/rateoftax",
        icon: <img src={icons.rateOfTax} style={{height:18, width:18}} />,
      },
    },
  ]);

  useEffect(() => {
    if (user && user?.user?.type === "user") {
      const modifiedMenu = menu
        .filter(
          (item) => ![4, 6, 7].includes(item.id) // Remove "Company", "Users", "Under Section", "Rate Of Tax"
        )
        .map((item) => {
          if (item.id === 2) {
            // If menu item is "Company", remove specific sub menu items
            return {
              ...item,
              subMenu: item.subMenu.filter(
                (subItem) => subItem.id !== 1 && subItem.id !== 3 // Remove "Add Company" and "All Companies"
              ),
            };
          }
          return item;
        });
      setMenu(modifiedMenu);
    }
    console.log("DashBoard NavBar UseEffect");
  }, [user]);

  const boxStyle = {
    cursor: "pointer",
    padding: sideBar ? 15 : 0,
  };

  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <Sidebar
        style={{
          height: "100%",
          minHeight: "100vh",
          borderRightWidth: 1,
          border: "block",
          borderRightColor: colors.grey,
          backgroundColor: colors.white,
        }}
        backgroundColor={colors.bgWhite}
        breakPoint={window.innerWidth <= 990 ? "always" : null}
        defaultCollapsed={SubMenu ? false : true}
      >
        <>
          <CustomText
            titleContainerStyle={{
              width: "100%",
              height: 66,
              display: "flex",
              justifyContent: "center",
            }}
            titleStyle={{ fontFamily: "bold", fontSize: 22 }}
            title={"FACTS"}
          />

          <Spacer height={40} />
          <Menu style={boxStyle}>
            {menu?.map((item, index) => (
              <NavbarMap
                activeTab={activeTab}
                onTabClick={handleTabClick}
                key={index}
                item={item}
              />
            ))}
          </Menu>
        </>
      </Sidebar>
    </div>
  );
};

export default NavbarDashboard;
