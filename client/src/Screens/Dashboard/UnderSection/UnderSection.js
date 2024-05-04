import React, { useEffect, useState } from "react";
import AddUnderSection from "./AddUnderSection";
import { colors } from "../../../utils/Colors";
import { rateOfTaxHeader, underSection } from "../../../utils/DataArray";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Spacer from "../../../Components/CustomComponents/Spacer";
import CustomButton from "../../../Components/CustomComponents/CustomButton";
import DashboardPageHeader from "../../../Components/DashboardComponent/DashboardPageHeader";
import CustomText from "../../../Components/CustomComponents/CustomText";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import EditUnderSection from "./EditUnderSection";
import Services from "../../../services";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { fetchUnderSectionList } from "../../../store/actions/underSectionAction";

const UnderSection = () => {
  const [addToggle, setAddToggle] = useState();
  const [editToggle, setEditToggle] = useState();
  const [selectedSection, setSelectedSection] = useState("");
  const [underSectionList, setUnderSectionList] = useState();

  const onAddClose = () => {
    setAddToggle(false);
  };

  const onEditClose = () => {
    setEditToggle(false);
  };

  const handleAddClick = () => {
    setAddToggle(true);
  };

  const handleEditClick = (row) => {
    setSelectedSection(row);
    setEditToggle(true);
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
        Services.UnderSection.deleteUnderSection(id)
          .then((res) => {
            console.log("Delete Response", res);
            toast.success("Under Section Deleted Successfully");
            fetchUnderSectionList(setUnderSectionList);
          })
          .catch((err) => {
            console.log("Delete Rate Of Tax Error", err);
          });
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  // Fetch Under Section List
  useEffect(() => {
    fetchUnderSectionList(setUnderSectionList);
  }, []);

  return (
    <div>
      {addToggle && (
        <AddUnderSection
          onClose={onAddClose}
          fetchUnderSectionList={() =>
            fetchUnderSectionList(setUnderSectionList)
          }
          toggle={addToggle}
        />
      )}
      {editToggle && (
        <EditUnderSection
          fetchUnderSectionList={() =>
            fetchUnderSectionList(setUnderSectionList)
          }
          name={selectedSection?.underSection}
          underSectionID={selectedSection._id}
          onClose={onEditClose}
          toggle={editToggle}
        />
      )}
      <DashboardPageHeader headerTitle={"Under Section"} />
      <Spacer height={40} />
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
        <CustomButton title={"Create"} onClick={handleAddClick} />
        <Spacer height={10} />
        <TableContainer sx={{ maxHeight: 580 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {rateOfTaxHeader.map((column) => (
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
              {underSectionList?.map((row, index) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={index}
                    // key={row.code}
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
                        titleStyle={{ fontFamily: "bold" }}
                        fontSize={14}
                      />
                    </TableCell>
                    <TableCell
                      sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                    >
                      <CustomText title={row?.underSection} fontSize={14} />
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
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
                            cursor: "pointer",
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
  );
};

export default UnderSection;
