import React, { useEffect, useState } from "react";
import Services from "../../../../services";
import CustomText from "../../../../Components/CustomComponents/CustomText";
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
import { allCompaniesHeader } from "../../../../utils/DataArray";

const AllCompanies = () => {
  const navigate = useNavigate();
  const [screenWidth] = UseWindowSize();
  const [allUserCompany, setAllUserCompany] = useState();
  const [homePageLoader, setHomePageLoader] = useState(false);

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
        <Paper
          sx={{
            ...styles.tableHeader,
            width: screenWidth <= 750 ? "100%" : "60%",
          }}
        >
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
                    filteredCompanies?.map((row, index) => {
                      const getFilteredCompanies = row?.companies?.filter(
                        (company) => company.showToAdmin
                      );
                      return (
                        <React.Fragment key={row?.username || index}>
                          {getFilteredCompanies?.map((items, innerIndex) => (
                            <TableRow hover tabIndex={-1} key={innerIndex}>
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
                                  cursor: "pointer",
                                  textDecoration: "none",
                                }}
                                onMouseOver={(e) => {
                                  e.target.style.textDecoration = "underline";
                                }}
                                onMouseOut={(e) => {
                                  e.target.style.textDecoration = "none";
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
                                  cursor: "pointer",
                                  textDecoration: "none",
                                }}
                                onMouseOver={(e) => {
                                  e.target.style.textDecoration = "underline";
                                }}
                                onMouseOut={(e) => {
                                  e.target.style.textDecoration = "none";
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
                        </React.Fragment>
                      );
                    })}
                </TableBody>
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    <CustomLoader />
                  </TableCell>
                </TableRow>
              )}
              {/* )} */}
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default AllCompanies;
