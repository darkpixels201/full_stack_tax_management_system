import React, { useEffect, useState } from "react";
import Services from "../../../../services";
import CustomText from "../../../../Components/CustomComponents/CustomText";
import { RiArrowRightSLine } from "react-icons/ri";
import { colors } from "../../../../utils/Colors";
import { UseWindowSize } from "../../../../Components/UseWindowSize";
import Spacer from "../../../../Components/CustomComponents/Spacer";
import { useNavigate } from "react-router-dom";
import { icons } from "../../../../Assets/Icons";
import CustomLoader from "../../../../Components/CustomLoader";
import { styles } from "../../../../Assets/Style/PendingUserStyle";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { allCompaniesHeader, LedgerHeader } from "../../../../utils/DataArray";

const AllCompanies = () => {
  const navigate = useNavigate();
  const [screenWidth] = UseWindowSize();
  const [allUserCompany, setAllUserCompany] = useState();
  const [homePageLoader, setHomePageLoader] = useState(false);

  console.log("All User and Company", allUserCompany);

  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllUsersAndCompany = async () => {
    try {
      const response = await Services.Company.allUsersAndCompanies();
      console.log("All Users and list Companies", response);
      setAllUserCompany(response);
      setHomePageLoader(true);
    } catch (error) {
      console.log("All User and Companies Error", error);
    }
  };

  useEffect(() => {
    fetchAllUsersAndCompany();
  }, []);

  const handleCompanyDetail = (item) => {
    navigate(`/dashboard/companydetail/${item?.companyId}`);
  };

  const handleClick = (item) => {
    navigate(`/dashboard/companies/${item.companyId}`, { state: item });
    console.log("COMPNAY DATA ALLLLLL ", item);
  };

  useEffect(() => {
    // Filter companies based on search query
    const filtered = allUserCompany?.map((user) => ({
      ...user,
      companies: user?.companies?.filter(
        (company) =>
          company?.companyName
            ?.toLowerCase()
            ?.includes(searchQuery?.toLowerCase()) ||
          user?.username?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      ),
    }));
    setFilteredCompanies(filtered);
  }, [searchQuery, allUserCompany]);

  return (
    <div>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex" }}>
          <CustomText
            title={"Have Access to Delete Ledger"}
            titleStyle={{ fontFamily: "bold" }}
          />
          <img src={icons.approved} style={{ height: 20, width: 20 }} />
        </div>
        <Spacer height={15} />
        <div style={{ display: "flex" }}>
          <CustomText
            title={"Don't Have Access to Delete Ledger"}
            titleStyle={{ fontFamily: "bold" }}
          />
          <img src={icons.rejected} style={{ height: 20, width: 20 }} />
        </div>
      </div>

      <div style={{ ...styles.inputContainerStyle, marginLeft: 25 }}>
        <AiOutlineSearch />
        <input
          type="text"
          placeholder="Search companies"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.inputStyle}
        />
      </div>
      <div style={{ paddingLeft: 30, paddingRight: 30 }}>
        <Paper sx={{...styles.tableHeader, width:  screenWidth <= 750 ? "100%" :"60%",}}>
          <TableContainer
            sx={{ maxHeight: 580 }}
            // sx={{width:"auto" }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {allCompaniesHeader?.map((column) => (
                    <TableCell
                      key={column?.id}
                      align={column?.align}
                      sx={{ minWidth: column.minWidth }}
                    >
                      <CustomText
                        title={column?.label}
                        titleStyle={{ fontFamily: "medium" }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {homePageLoader ? (
                <TableBody>
                  {filteredCompanies &&
                    filteredCompanies?.map((row) => {
                      const getFilteredCompanies = row?.companies?.filter(
                        (company) => company.showToAdmin
                      );
                      return (
                        <>
                          {getFilteredCompanies?.map((items, innerIndex) => (
                            <TableRow
                              hover
                              tabIndex={-1}
                              key={innerIndex}
                            >
                              <TableCell
                                sx={{
                                  borderColor: colors.grey,
                                  borderWidth: 0.5,
                                }}
                              >
                                <CustomText
                                  title={row?.username}
                                  fontSize={14}
                                />
                              </TableCell>

                              <TableCell
                                sx={{
                                  borderColor: colors.grey,
                                  borderWidth: 0.5,
                                  cursor:"pointer",
                                  textDecoration: 'none',
                                }}
                                onMouseOver={(e) => {
                                  e.target.style.textDecoration = 'underline';
                                }}
                                onMouseOut={(e) => {
                                  e.target.style.textDecoration = 'none';
                                }}
                              >
                                <CustomText
                                onClick={() => handleCompanyDetail(items)}
                                  title={items?.companyName}
                                  fontSize={14}
                                />
                              </TableCell>

                              <TableCell
                                sx={{
                                  borderColor: colors.grey,
                                  borderWidth: 0.5,
                                  paddingLeft: 4,
                                }}
                              >
                                <img
                                  src={
                                    items.accessToDeleteLedger === true
                                      ? icons.approved
                                      : icons.rejected
                                  }
                                  style={{ height: 20, width: 20 }}
                                />
                              </TableCell>

                              <TableCell
                                sx={{
                                  borderColor: colors.grey,
                                  borderWidth: 0.5,
                                  cursor:"pointer",
                                  textDecoration:"none"
                                }}
                                onMouseOver={(e) => {
                                  e.target.style.textDecoration = 'underline';
                                }}
                                onMouseOut={(e) => {
                                  e.target.style.textDecoration = 'none';
                                }}
                              >
                                <CustomText
                                  title={"View Ledger"}
                                  fontSize={14}
                                  onClick={() => handleClick(items)}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      );
                    })}
                </TableBody>
              ) : (
                <CustomLoader
                  customLoaderStyle={{
                    position: "absolute",
                    top: "50%",
                    left: "60%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
              {/* )} */}
            </Table>
          </TableContainer>
        </Paper>
      </div>
      {/* {homePageLoader ? (
        <>
          {filteredCompanies?.map((item, outerIndex) => {
            const filteredCompanies = item?.companies?.filter(
              (company) => company.showToAdmin
            );
            console.log("FILTERED COMPANIES", filteredCompanies);

            if (filteredCompanies.length === 0) {
              // Skip rendering if no companies to show
              return null;
            }

            return (
              <>
                <div
                  key={outerIndex}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Spacer height={30} />
                    {filteredCompanies.length > 0 && (
                      <div style={{ display: "flex" }}>
                        <CustomText
                          title={"User Name"}
                          titleStyle={{ fontFamily: "medium" }}
                        />
                        <CustomText
                          title={item?.username}
                          titleStyle={{ fontFamily: "bold" }}
                          titleContainerStyle={{ textAlign: "left" }}
                        />
                      </div>
                    )}

                    {filteredCompanies?.map((items, innerIndex) => (
                      <div
                        key={`${outerIndex}-${innerIndex}`}
                        style={{
                          width: screenWidth <= 768 ? "80%" : "100%",
                          backgroundColor: colors.white,
                          borderLeft: `5px solid ${colors.black2}`,
                          borderRadius: 10,
                          boxShadow: "0px 0px 8px -2px rgba(0,0,0,0.12)",
                          margin: screenWidth <= 768 ? "20px auto" : "20px",
                          textAlign: "center",
                          padding: 15,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <img
                              src={
                                items.accessToDeleteLedger === true
                                  ? icons.approved
                                  : icons.rejected
                              }
                              style={{ height: 20, width: 20 }}
                            />
                            <CustomText
                              onClick={() => handleCompanyDetail(items)}
                              // onClick={console.log("Company name Pressed")}
                              title={items?.companyName}
                              titleContainerStyle={{
                                alignSelf: "center",
                                paddingRight: 5,
                                cursor: "pointer",
                              }}
                              titleStyle={{ textAlign: "left" }}
                            />
                          </div>

                          <div style={{ display: "flex" }}>
                            <Spacer width={20} />
                            <CustomText
                              onClick={() => handleClick(items)}
                              title={"View Ledger"}
                              titleContainerStyle={{ cursor: "pointer" }}
                              titleStyle={{
                                fontFamily: "medium",
                                textDecoration: "underline",
                              }}
                              rightIcon={
                                <RiArrowRightSLine size={18} fontWeight={900} />
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            );
          })}
        </>
      ) : (
        <CustomLoader />
      )} */}
    </div>
  );
};

export default AllCompanies;
