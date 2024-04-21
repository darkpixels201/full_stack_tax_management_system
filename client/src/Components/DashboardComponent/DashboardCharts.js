import { Box, Grid } from "@mui/material";
import React from "react";
import { FaUserClock, FaClipboardCheck, FaTrophy } from "react-icons/fa";
import { colors } from "../../utils/Colors";
import CustomText from "../CustomComponents/CustomText";
import Spacer from "../CustomComponents/Spacer";
import { BarChart, Bar, ResponsiveContainer, AreaChart, Area } from "recharts";

import "../../Assets/css/style.css";

const DashboardCharts = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 6800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const cards = [
    {
      id: 1,
      name: "Customer",
      icon: <FaUserClock fontSize={20} color={colors.white1} />,
      color: "#6102ED",
      count: "59476",
      bar: true,
    },
    {
      id: 2,
      name: "Conversion",
      icon: <FaClipboardCheck fontSize={20} color={colors.white1} />,
      color: "#29C0B1",
      count: "59476",
      stackedChart: true,
    },
    {
      id: 3,
      name: "Revenue",
      icon: <FaTrophy fontSize={20} color={colors.white1} />,
      color: "#2D50ED",
      count: "59476",
      strokeChart: true,
    },
  ];
  return (
    <Box sx={{ flexGrow: 1, marginTop: 5, paddingLeft: 3, paddingRight: 3 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {cards?.map((item, index) => (
          //   <>
          <Grid
          key={index}
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              style={{
                height: 350,
                width: "95%",
                backgroundColor: colors.white,
                boxShadow: "0px 0px 8px -2px rgba(0,0,0,0.12)",
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                // padding:-10,
                // backgroundColor:"pink"
              }}
            >
              <Box style={{ padding: 20 }}>
                <CustomText
                  title={item.name}
                  titleStyle={{
                    color: colors.textBlack,
                    fontFamily: "medium",
                    fontSize: 15,
                  }}
                />
                <Spacer height={30} />
                <CustomText
                  title={"Total customers this month"}
                  titleStyle={{ color: colors.textGrey, fontSize: 14 }}
                />
                <Spacer height={45} />
                <CustomText
                  title={
                    item.bar
                      ? "92556"
                      : item.stackedChart
                      ? "53812"
                      : item.strokeChart
                      ? "40008"
                      : ""
                  }
                  titleStyle={{
                    color: colors.black1,
                    fontFamily: "bold",
                    fontSize: 60,
                  }}
                  titleContainerStyle={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
                {/* </div> */}
              </Box>
              {/* <Spacer height={145} /> */}
              {item.bar ? (
                <ResponsiveContainer width="100%" height="30%">
                  <BarChart
                    width={10}
                    height={40}
                    data={data}
                    margin={{
                      left: 0,
                      bottom: 1,
                    }}
                    style={{
                      display: "flex",
                      overflow: "hidder",
                      // flexDirection: "column",
                      // justifyContent: "flex-end",
                      // alignItems: "flex-end",
                      // alignSelf:"flex-end",
                      // backgroundColor: "red",
                      // flexGrow:1
                    }}
                    barSize={20}
                  >
                    <Bar dataKey="uv" fill="#6303ED" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                ""
              )}

              {item.stackedChart ? (
                <ResponsiveContainer width="100%" height="30%">
                  <AreaChart
                    width={730}
                    height={250}
                    data={data}
                    margin={{
                      left: 0,
                      // bottom: 1,
                    }}
                    outerRadius={12}
                    innerRadius={12}
                    // margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <Area
                      type="monotone"
                      dataKey="uv"
                      stroke="none"
                      fill={colors.orange1}
                      style={{ borderRadius: 10, overflow: "hidden" }}
                      overflow={"hidden"}
                    />
                    <Area
                      type="monotone"
                      dataKey="pv"
                      stroke="none"
                      fill={colors.orange1}
                      style={{ borderRadius: 10 }}
                      overflow={"hidden"}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                ""
              )}

              {item.strokeChart ? (
                <ResponsiveContainer
                  width="100%"
                  height="30%"
                  className={"border-radius"}
                >
                  <AreaChart
                    width={730}
                    height={250}
                    data={data}
                    margin={{
                      left: 0,
                      bottom: 1,
                    }}
                    // margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <Area
                      type="monotone"
                      dataKey="uv"
                      stroke="#FF3266"
                      strokeWidth={3}
                      fill={colors.red}
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                ""
              )}
            </Box>
          </Grid>
          //   </>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardCharts;
