import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { rateOfTaxHeader } from "../../../utils/DataArray";
import CustomText from "../../../Components/CustomComponents/CustomText";
import { colors } from "../../../utils/Colors";
import Spacer from "../../../Components/CustomComponents/Spacer";
import DashboardPageHeader from "../../../Components/DashboardComponent/DashboardPageHeader";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import EditRateOfTax from "./EditRateOfTax";
import CustomButton from "../../../Components/CustomComponents/CustomButton";
import AddRateOfTax from "./AddRateOfTax";
import Services from "../../../services";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
// import { fetchRateOfTaxList } from "../../../store/actions/rateOfTaxAction";

const RateOfTax = () => {
  const [toggle, setToggle] = useState(false);
  const [newToggle, setNewToggle] = useState(false);
  const [selectedRate, setSelectedRate] = useState("");
  const [rateOfTaxList, setRateOfTax] = useState("");

  const onClose = () => {
    setToggle(false);
  };

  const onNewClose = () => {
    setNewToggle(false);
  };

  const handleEditClick = (row) => {
    setSelectedRate(row);
    setToggle(true);
  };

  const handleAddNewClick = () => {
    // setSelectedRateName(row.name);
    setNewToggle(true);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: colors.primary,
        cancelButtonColor: colors.grey2,
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        Services.RateOfTax.deleteRateOfTax(id)
          .then((res) => {
            console.log("Delete Response", res);
            toast.success("Rate Of Tax Deleted Successfully");
            fetchRateOfTaxList(setRateOfTax);
          })
          .catch((err) => {
            console.log("Delete Rate Of Tax Error", err);
          });
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  const fetchRateOfTaxList = async () => {
    try {
      await Services?.RateOfTax?.getRateOfTax()
        .then((res) => {
          console.log("List rate of tax", res);
          setRateOfTax(res);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } catch (error) {
      console.log("Rate Of Tax Error", error);
    }
  };

  useEffect(() => {
    fetchRateOfTaxList();
  }, []);

  return (
    <div>
      {toggle && (
        <EditRateOfTax
          fetchRateOfTaxList={fetchRateOfTaxList}
          name={selectedRate?.taxDeductionRate}
          rateOfTaxID={selectedRate?._id}
          onClose={onClose}
          toggle={toggle}
        />
      )}
      {newToggle && (
        <AddRateOfTax
          onClose={onNewClose}
          fetchRateOfTaxList={fetchRateOfTaxList}
          toggle={newToggle}
        />
      )}
      <DashboardPageHeader headerTitle={"Rate Of Tax"} />
      <Spacer height={40} />
      {/* <CustomButton title={"Create"} containerStyle={{backgroundColor:colors.white}} /> */}
      {/* <div style={{backgroundColor:"red", width: "100%",
          margin: "auto",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0px 0px 8px -2px rgba(0,0,0,0.12)",
          width: window.innerWidth <= 659 ? "100%" : "50%",}} >  */}

      <div
        style={{
          width: "100%",
          margin: "auto",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0px 8px 8px -2px rgba(0,0,0,0.12)",
          width: window.innerWidth <= 659 ? "100%" : "50%",
        }}
      >
        <CustomButton title={"Create"} onClick={handleAddNewClick} />
        <Spacer height={10} />
        <TableContainer sx={{ maxHeight: 580 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {rateOfTaxHeader?.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    <CustomText
                      titleContainerStyle={{
                        display: "flex",
                        justifyContent: column.align,
                      }}
                      title={column.label}
                      titleStyle={{ fontFamily: "medium" }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rateOfTaxList &&
                rateOfTaxList?.map((row) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row._id}
                      // selected={selectedRows.includes(row)}
                      // onClick={() => handleRowClick(row)}
                    >
                      <TableCell
                        sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                      >
                        <CustomText
                          title={new Date(row?.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                          // title={"12-10-24"}
                          titleStyle={{ fontFamily: "bold" }}
                          fontSize={14}
                        />
                      </TableCell>
                      <TableCell
                        sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                      >
                        <CustomText
                          title={`${row?.taxDeductionRate}%`}
                          fontSize={14}
                        />
                      </TableCell>

                      <TableCell
                        sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              // backgroundColor: "rgb(225, 255, 252)",
                              // backgroundColor: colors.grey1,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              alignSelf: "center",
                              cursor: "pointer",
                              // padding:5
                            }}
                          >
                            <FaRegEdit
                              size={16}
                              onClick={() => handleEditClick(row)}
                              color={colors.grey2}
                            />
                          </div>
                          <Spacer width={25} />
                          <div
                            style={{
                              backgroundColor: "rgba(255, 51, 102, 0.05)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              alignSelf: "center",
                              cursor: "pointer",
                            }}
                            onClick={() => handleDelete(row._id)}
                          >
                            <FaTrash color={colors.red} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
    // </div>
  );
};

export default RateOfTax;
