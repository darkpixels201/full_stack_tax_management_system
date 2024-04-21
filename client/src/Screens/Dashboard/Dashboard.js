import React, { useEffect, useState } from "react";
import DashboardCards from "../../Components/DashboardComponent/DashboardCards";
import DashboardCharts from "../../Components/DashboardComponent/DashboardCharts";
import Services from "../../services";

const Dashboard = () => {
  // const dispatch = useDispatch()
  // const user = useSelector((state) => state.userReducer.user);
  //     console.log("user Reducer ++++++++", user);

  // useEffect(()=>{
  //   dispatch(getProfileAction("Fahad"))
  // },[dispatch])


  return (
    <div>
      <DashboardCards />
      <DashboardCharts />
    </div>
  );
};

export default Dashboard;
