import React, { useEffect, useLayoutEffect, useState } from "react";
import { useProSidebar } from "react-pro-sidebar";
import { GrMenu } from "react-icons/gr";
import CustomText from "../CustomComponents/CustomText";
import Spacer from "../CustomComponents/Spacer";
import { CgMail, CgProfile } from "react-icons/cg";
import DropDownList from "../DropDownList";
import { colors } from "../../utils/Colors";
import { UseWindowSize } from "../UseWindowSize";
import CustomSearchFilter from "../CustomComponents/CustomSearchFilter";
import { BiBell } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { icons } from "../../Assets/Icons";
import { images } from "../../Assets/Images";

const HeaderDashboard = ({ sideBar, setSideBar }) => {
  const SearchArray = [
    {
      id: 1,
      price: "$95.00",
    },
    {
      id: 2,
      price: "$95.00",
    },
    {
      id: 3,
      price: "$95.00",
    },
    {
      id: 3,
      price: "$95.00",
    },
    {
      id: 3,
      price: "$95.00",
    },
  ];
  const { toggleSidebar } = useProSidebar();
  const { collapseSidebar } = useProSidebar();

  const [screenWidth] = UseWindowSize();

  return (
    <div>
      {/* {screenWidth <= 1200 ? <div style={{height:20, width:20, backgroundColor:"red", transition: "background-color 1s",}} >Width</div> : ""} */}

      <div
        style={{
          width: "auto",
          padding: 12,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {window.innerWidth <= 990 ? (
          <div
            style={{
              // width: "100%",
              height: 66,

              backgroundColor: colors.white,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <img
              src={icons.dummyLogo}
              style={{
                width: "100%",
                height: "100%",
                alignSelf: "center",
                objectFit: "cover",
              }}
            />
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent:"center", alignItems:"center"}}>
            <GrMenu
              cursor={"pointer"}
              size={24}
              onClick={() => {
                window.innerWidth <= 990 ? toggleSidebar() : collapseSidebar();
                setSideBar(!sideBar);
                console.log("sideBar=>>>>", sideBar);
              }}
              // onClick={() => }
            />
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spacer width={20} />
          {/* {window.innerWidth <= 530 ? (
            ""
          ) : (
            <CustomSearchFilter
              borderRadius={5}
              height={2}
              outerWidth={150}
              padding={13}
              icon
              placeholder={"Type to Search"}
            />
          )} */}

          <Spacer width={15} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              width: 25,
              borderRadius: 5,
              border: "solid",
              borderWidth: 1,
              borderColor: colors.grey,
            }}
          >
            <BiBell color={colors.grey3} />
          </div>

          <Spacer width={15} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              width: 25,
              borderRadius: 5,
              border: "solid",
              borderWidth: 1,
              borderColor: colors.grey,
            }}
          >
            <FiMail color={colors.grey3} />
          </div>

          <Spacer width={20} />

          <DropDownList 
          // SearchArray={SearchArray} 
          Img={icons.profile1} />


          <Spacer width={20} />

          {window.innerWidth <= 990 ? (
            <div style={{ display: "flex" }}>
              <GrMenu
                cursor={"pointer"}
                size={24}
                onClick={() => {
                  window.innerWidth <= 990
                    ? toggleSidebar()
                    : collapseSidebar();
                  setSideBar(!sideBar);
                  console.log("sideBar=>>>>", sideBar);
                }}
                // onClick={() => }
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div style={{ height: 1, width: "100%", backgroundColor: colors.grey }} />
    </div>
  );
};

export default HeaderDashboard;
