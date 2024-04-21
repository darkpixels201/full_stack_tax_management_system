import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HeaderDashboard from "../Components/DashboardComponent/HeaderDashboard";
import NavbarDashboard from "../Components/DashboardComponent/NavbarDashboard";
import Dashboard from "../Screens/Dashboard/Dashboard";
import AddCompany from "../Screens/Dashboard/AddCompany/AddCompany";
import CreateLedger from "../Screens/Dashboard/CreateLedger/CreateLedger";
import Companies from "../Screens/Dashboard/Companies/Companies";
import Ledger from "../Screens/Dashboard/Ledger/Ledger";
import PendingUsers from "../Screens/Dashboard/Users/PendingUsers/PendingUsers";
import ApprovedUsers from "../Screens/Dashboard/Users/ApprovedUsers/ApprovedUsers";
import ChequeList from "../Screens/Dashboard/Cheque/ChequeList/ChequeList";
import AddCheque from "../Screens/Dashboard/Cheque/AddCheque/AddCheque";
import RateOfTaxList from "../Screens/Dashboard/RateOfTax/RateOfTax";
import UnderSection from "../Screens/Dashboard/UnderSection/UnderSection";
import RateOfTax from "../Screens/Dashboard/RateOfTax/RateOfTax";
import ProtectedRoutes from "./ProtectedRoutes";
import AddRateOfTax from "../Screens/Dashboard/RateOfTax/AddRateOfTax";
import CompanyDetail from "../Screens/Dashboard/CompanyDetail/CompanyDetail";
import AllCompanies from "../Screens/Dashboard/Company/AllCompanies/AllCompanies";
import AnimatedContainer from "../Components/AnimatedContainer";

const DashboardRoutes = () => {
  const [sideBar, setSideBar] = useState(true);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <NavbarDashboard sideBar={sideBar} setSideBar={setSideBar} />
        <div style={{ width: "100%" }}>
          <HeaderDashboard sideBar={sideBar} setSideBar={setSideBar} />
          {/* <BreadCrumbs /> */}
          {/* <Route path="" element={<ProtectedRoutes element={Dashboard} />} /> */}
          <Routes>

            <Route
              path=""
              element={
                <ProtectedRoutes
                  Component={() => (
                    <AnimatedContainer>
                      <Dashboard />
                    </AnimatedContainer>
                  )}
                />
              }
            />

            <Route
              path="addcompany"
              element={
                <ProtectedRoutes
                  Component={() => (
                    <AnimatedContainer>
                      <AddCompany />
                    </AnimatedContainer>
                  )}
                />
              }
            />

            <Route
              path="companies"
              element={
                <ProtectedRoutes
                  Component={() => (
                    <AnimatedContainer>
                      <Companies />
                    </AnimatedContainer>
                  )}
                />
              }
            />

            <Route
              path="companies/:id"
              element={
                <ProtectedRoutes
                  Component={() => (
                    <AnimatedContainer>
                      <Ledger />
                    </AnimatedContainer>
                  )}
                />
              }
            />

            <Route
              path="allCompanies"
              element={
                <ProtectedRoutes
                  Component={() => (
                    <AnimatedContainer>
                      <AllCompanies />
                    </AnimatedContainer>
                  )}
                />
              }
            />

            <Route
              path="createledger"
              element={
                <ProtectedRoutes
                  Component={() => (
                    <AnimatedContainer>
                      <CreateLedger />
                    </AnimatedContainer>
                  )}
                />
              }
            />

            <Route
              path="pendingusers"
              element={
                <ProtectedRoutes
                  Component={() => (
                    <AnimatedContainer>
                      <PendingUsers />
                    </AnimatedContainer>
                  )}
                />
              }
            />

            <Route
              path="approvedusers"
              element={
                <ProtectedRoutes
                  Component={() => (
                    <AnimatedContainer>
                      <ApprovedUsers />
                    </AnimatedContainer>
                  )}
                />
              }
            />

            <Route
              path="chequelist"
              element={
                <ProtectedRoutes
                  Component={() => (
                    <AnimatedContainer>
                      <ChequeList />
                    </AnimatedContainer>
                  )}
                />
              }
            />

            <Route
              path="addcheque"
              element={
                <ProtectedRoutes
                  Component={() => (
                    <AnimatedContainer>
                      <AddCheque />
                    </AnimatedContainer>
                  )}
                />
              }
            />

            <Route
              path="undersection"
              element={
                <ProtectedRoutes
                  Component={() => (
                    <AnimatedContainer>
                      <UnderSection />
                    </AnimatedContainer>
                  )}
                />
              }
            />

            <Route
              path="rateoftax"
              element={
                <ProtectedRoutes
                  Component={() => (
                    <AnimatedContainer>
                      <RateOfTax />
                    </AnimatedContainer>
                  )}
                />
              }
            />

            <Route
              path="addrateoftax"
              element={
                <ProtectedRoutes
                  Component={() => (
                    <AnimatedContainer>
                      <AddRateOfTax />
                    </AnimatedContainer>
                  )}
                />
              }
            />

            <Route
              path="companydetail/:id"
              element={
                <ProtectedRoutes
                  Component={() => (
                    <AnimatedContainer>
                      <CompanyDetail />
                    </AnimatedContainer>
                  )}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardRoutes;
