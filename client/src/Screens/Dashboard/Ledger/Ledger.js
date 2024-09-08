import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { LedgerData, LedgerHeader } from "../../../utils/DataArray";
import { colors } from "../../../utils/Colors";
import CustomText from "../../../Components/CustomComponents/CustomText";
import Spacer from "../../../Components/CustomComponents/Spacer";
import { styles } from "./LedgerStyle";
import CustomSearchFilter from "../../../Components/CustomComponents/CustomSearchFilter";
import DashboardPageHeader from "../../../Components/DashboardComponent/DashboardPageHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../Assets/css/calendarStyle.css";
import { icons } from "../../../Assets/Icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa";
import { commonStyle } from "../../../Assets/Style/CommonStyle";
import EditLedger from "./EditLedger";
import Services from "../../../services";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loader from "../../../Assets/json/tax_animation.json";
import { useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";

const Ledger = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const data = location?.state;
  const NTN = data?.ntn;
  const user = useSelector((state) => state?.userReducer?.user);

  const [ledgerDetail, setLedgerDetail] = useState("");
  const [ledgerLoading, setLedgerLoading] = useState(false);

  console.log("iiidddddd", data?._id);

  useEffect(() => {
    getLedgerDetail();
  }, []);

  const getLedgerDetail = async () => {
    setLedgerLoading(true); // Set ledgerLoading to false when data is successfully fetched
    try {
      await Services?.Ledger?.LedgerById(data?._id || data?.companyId)
        // await Services?.Ledger?.LedgerById(data?.companyId)
        .then((res) => {
          setLedgerDetail(res);
          setFilteredLedgerData(res);
          setLedgerLoading(false); // Set ledgerLoading to false when data is successfully fetched
          console.log("Company LEDGER +++++++++++++++ res", res);
        })
        .catch((err) => {
          console.log("Ledger Detail Error", err);
          setLedgerLoading(false);
        });
    } catch (error) {
      console.log("Detail Error", error);
      setLedgerLoading(false);
    } finally {
      // You may also remove this line, as it is redundant
      // setLedgerLoading(false);
    }
  };

  const [filteredLedgerData, setFilteredLedgerData] = useState(
    ledgerDetail && ledgerDetail
  );
  console.log("FILTER LEDGER DATA", filteredLedgerData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [calendarView, setCalendarView] = useState(false);

  // EXCEL EXPORT
  const exportToExcel = () => {
    if (selectedRows.length === 0) {
      toast.warning(
        "Please select at least one row to export the Excel sheet."
      );
      return;
    }

    const selectedRowsData = filteredLedgerData.filter((row) =>
      selectedRows.includes(row)
    );

    // Remove undesired fields from each row
    const customizeSelectedRowsData = selectedRowsData.map((row) => {
      const { accessToDeleteLedger, __v, createdBy, ...rowWithoutAccess } = row;
      return rowWithoutAccess;
    });

    const ws = XLSX.utils.json_to_sheet(customizeSelectedRowsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, `${data.companyName}.xlsx`);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event?.target?.value?.toLowerCase();

    const filteredData = ledgerDetail.filter(
      (user) =>
        user?.chequeNo?.toLowerCase().includes(searchTerm) ||
        user?.bankName?.toLowerCase().includes(searchTerm) ||
        user?.chequeAmount?.toString().toLowerCase().includes(searchTerm) ||
        user?.taxAmount?.toString().toLowerCase().includes(searchTerm) ||
        user?.taxDeductionRate?.toString().toLowerCase().includes(searchTerm) ||
        user?.underSection?.toString().toLowerCase().includes(searchTerm)
    );

    setFilteredLedgerData(filteredData);
  };

  const handleRowClick = (row) => {
    const isSelected = selectedRows.includes(row);
    if (isSelected) {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((selectedRow) => selectedRow !== row)
      );
    } else {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, row]);
    }
  };

  const handleSelectAllClick = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...filteredLedgerData]);
    }
    setSelectAll(!selectAll);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    filterDataByDate(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    filterDataByDate(startDate, date);
  };

  const filterDataByDate = (start, end) => {
    const filteredByDate = ledgerDetail?.filter((row) => {
      const rowDate = new Date(row.date);
      return (!start || rowDate >= start) && (!end || rowDate <= end);
    });
    setFilteredLedgerData(filteredByDate);
  };

  const toggleCalendarView = () => {
    setCalendarView(!calendarView);
  };

  const [ledgerToggle, setLedgerToggle] = useState();
  const onClose = () => {
    setLedgerToggle(false);
  };

  const [selectedRowData, setSelectedRowData] = useState(null);
  const handleLedgerEditClick = (rowData) => {
    setSelectedRowData(rowData);
    setLedgerToggle(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure you want to Delete this Row?",
        // text: "You will not be able to recover this company!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: colors.primary,
        cancelButtonColor: colors.grey2,
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        await Services?.Ledger?.deleteLedger(id)
          .then((res) => {
            console.log("Delete Response", res);
            toast.success("Ledger Deleted Successfully");
            getLedgerDetail();
            // setPendingLoading(true);
          })
          .catch((err) => {
            console.log("Delete Ledger Response Error", err);
            // setPendingLoading(false);
          });
      }
    } catch (err) {
      console.log("Delete Ledger Error", err);
      // setPendingLoading(false);
    } finally {
      // setLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [id]: false }));
    }
  };

  return (
    <>
      {ledgerToggle && (
        <EditLedger
          LedgerId={id}
          LedgerData={selectedRowData}
          onClose={onClose}
          setLedgerToggle={setLedgerToggle}
          getLedgerDetail={getLedgerDetail}
        />
      )}

      <DashboardPageHeader headerTitle={"Ledger"} />
      <Spacer height={30} />
      <div style={{ paddingLeft: 30, paddingRight: 30 }}>
        <Paper sx={styles.tableHeader}>
          <div style={styles.spaceBetween}>
            <div>
              <CustomText
                title={data?.name}
                titleStyle={{ fontFamily: "bold" }}
              />
            </div>

            <div style={{ display: "flex", zIndex: 10 }}>
              {calendarView ? (
                <>
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    // dateFormat={"dd MM yyyy"}
                    isClearable={true}
                    showMonthDropdown
                    showYearDropdown
                    className="CalendarDesign"
                    calendarClassName="CalendarBodyDesign"
                    onClickOutside={() => setCalendarView(false)}
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="End Date"
                    isClearable={true}
                    showYearDropdown
                    className="CalendarDesign"
                    calendarClassName="CalendarBodyDesign"
                    onClickOutside={() => setCalendarView(false)}
                  />
                </>
              ) : null}

              <div
                style={{ ...styles.iconHover }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = colors.grey1)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <img
                  src={icons.schedule}
                  style={styles.iconStyle}
                  onClick={toggleCalendarView}
                />
              </div>
              <Spacer width={15} />
              <div
                style={{ ...styles.iconHover }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = colors.grey1)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <img
                  src={icons.excel}
                  style={styles.iconStyle}
                  onClick={exportToExcel}
                />
              </div>
              <Spacer width={20} />
              {/* <CustomSearchFilter
                borderRadius={5}
                height={2}
                outerWidth={150}
                padding={13}
                icon
                onChange={handleSearchChange}
                data={LedgerData}
                placeholder={"Type to Search"}
                isLoading
              /> */}
              <div style={{ ...styles.inputContainerStyle, marginLeft: 60 }}>
                <AiOutlineSearch />
                <input
                  type="text"
                  placeholder="Search Pending Users"
                  // value={ledgerDetail}
                  onChange={handleSearchChange}
                  style={styles.inputStyle}
                />
              </div>
            </div>
          </div>
          <TableContainer
            sx={{ maxHeight: 580 }}
            // sx={{width:"auto" }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectAll}
                      onChange={handleSelectAllClick}
                      indeterminate={
                        selectAll &&
                        selectedRows.length < filteredLedgerData.length
                      }
                    />
                  </TableCell>
                  {LedgerHeader?.map((column) => (
                    <TableCell key={column?.id} align={column?.align}>
                      <CustomText
                        title={column?.label}
                        titleStyle={{ fontFamily: "medium" }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {ledgerLoading ? (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "60%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Lottie
                    animationData={loader}
                    style={{ height: 150, width: 150 }}
                  />
                </div>
              ) : (
                <TableBody>
                  {filteredLedgerData &&
                    filteredLedgerData?.map((row) => {
                      // filteredLedgerData?.ledgers?.map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row?._id}
                          selected={selectedRows.includes(row)}
                        >
                          <TableCell
                            padding="checkbox"
                            onClick={() => handleRowClick(row)}
                          >
                            <Checkbox checked={selectedRows?.includes(row)} />
                          </TableCell>
                          <TableCell
                            sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                          >
                            <CustomText
                              // title={row.date}
                              title={new Date(row?.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                              titleStyle={{ fontFamily: "bold" }}
                              fontSize={14}
                            />
                          </TableCell>
                          <TableCell
                            sx={{ borderColor: colors.grey, borderWidth: 0.5, }}
                          >
                            <CustomText
                              // title={row?.companyName}
                              title={data?.companyName}
                              fontSize={14}
                            />
                          </TableCell>
                          <TableCell
                            sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                          >
                            <CustomText title={NTN} fontSize={14} />
                          </TableCell>
                          <TableCell
                            sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                          >
                            <CustomText
                              title={row?.underSection}
                              fontSize={14}
                            />
                          </TableCell>

                          <TableCell
                            sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                          >
                            <CustomText
                              title={row?.chequeAmount}
                              fontSize={14}
                            />
                          </TableCell>

                          <TableCell
                            sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                          >
                            <CustomText title={row?.taxAmount} fontSize={14} />
                          </TableCell>

                          <TableCell
                            sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                          >
                            <CustomText
                              title={`${row?.taxDeductionRate}\%`}
                              fontSize={14}
                            />
                          </TableCell>
                          <TableCell
                            sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                          >
                            <CustomText title={row?.bankName} fontSize={14} />
                          </TableCell>
                          <TableCell
                            sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                          >
                            <CustomText title={row?.chequeNo} fontSize={14} />
                          </TableCell>

                          <TableCell
                            sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                          >
                            <div style={{ display: "flex" }}>
                              <div
                                style={commonStyle.editStyle}
                                // onClick={editOnClick}
                                onClick={() => handleLedgerEditClick(row)}
                              >
                                <img
                                  src={icons.greyEdit1}
                                  style={{ height: 13, width: 13 }}
                                />
                              </div>
                              <Spacer width={5} />
                              {data?.accessToDeleteLedger === true ||
                              user?.user?.type === "admin" ? (
                                <div
                                  style={commonStyle.deleteStyle}
                                  // onClick={DeleteOnClick}
                                >
                                  <FaTrash
                                    style={commonStyle.deleteCenterPointer}
                                    size={15}
                                    color={colors.red}
                                    onClick={() => handleDeleteClick(row._id)}
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
};

export default Ledger;
