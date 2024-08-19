import React, { useEffect, useState } from "react";
import DashboardPageHeader from "../../../../Components/DashboardComponent/DashboardPageHeader";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Spacer from "../../../../Components/CustomComponents/Spacer";
import { RiArrowDownSLine } from "react-icons/ri";
import { UseWindowSize } from "../../../../Components/UseWindowSize";
import CustomText from "../../../../Components/CustomComponents/CustomText";
import { commonStyle } from "../../../../Assets/Style/CommonStyle";
import { colors } from "../../../../utils/Colors";
import { icons } from "../../../../Assets/Icons";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import EditChequeNo from "./EditChequeNo";
import { toast } from "react-toastify";
import Services from "../../../../services";

const ChequeList = () => {
  const [screenWidth] = UseWindowSize();
  const [chequeListToggle, setChequeListToggle] = useState(false);
  const [selectedChequeNo, setSelectedChequeNo] = useState();
  const [selectedBankName, setSelectedBankName] = useState();
  const [chequeList, setChequeList] = useState();

  console.log("selectedChequeNo", selectedChequeNo);

  const onClose = () => {
    setChequeListToggle(false);
  };

  const handleChequeEdit = (cheque, bankName) => {
    console.log("=======", bankName);
    setSelectedChequeNo(cheque);
    setSelectedBankName(bankName);
    setChequeListToggle(true);
  };

  const DeleteCheque = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this Cheque No!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: colors.primary,
        cancelButtonColor: colors.grey2,
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        Services?.Cheque?.deleteCheque(id)
          .then((res) => {
            console.log("Delete Response", res);
            toast.success("Cheque Deleted Successfully");
            fetchChequeList();
          })
          .catch((err) => {
            console.log("Delete Company Error", err);
          });
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  const fetchChequeList = async () => {
    try {
      await Services.Cheque.chequeList()
        .then((res) => {
          console.log("List Of Cheque", res);
          setChequeList(res);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } catch (error) {
      console.log("Pending User Error", error);
    }
  };

  useEffect(() => {
    fetchChequeList();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      {chequeListToggle && (
        <EditChequeNo
          name={selectedChequeNo?.chequeNo}
          fetchChequeList={fetchChequeList}
          BankName={selectedBankName}
          onClose={onClose}
          ChequeNoID={selectedChequeNo?.id}
        />
      )}
      <DashboardPageHeader headerTitle={"Cheque List"} />
      <Spacer height={50} />
      <div
        style={{
          width: screenWidth <= 768 ? "80%" : "35%",
          paddingLeft: screenWidth <= 768 ? 0 : 50,
          margin: screenWidth <= 768 ? "auto" : 0,
        }}
      >
        {chequeList?.length !== 0 ? (
          chequeList?.map((bank, index) => (
            <Accordion key={index}>
              <AccordionSummary
                sx={{ boxShadow: "0px 0px 8px -2px rgba(0,0,0,0.12)" }}
                expandIcon={<RiArrowDownSLine />}
              >
                <CustomText
                  title={bank?.bankName}
                  titleStyle={{ fontFamily: "medium" }}
                />
              </AccordionSummary>
              <Spacer height={5} />
              <div>
                <div>
                  {bank?.chequeNo?.map((cheque, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <AccordionDetails key={index}>
                        {cheque.chequeNo}
                      </AccordionDetails>

                      <div style={{ display: "flex", marginTop: 4 }}>
                        <div
                          style={commonStyle.editStyle}
                          onClick={() =>
                            handleChequeEdit(cheque, bank?.bankName)
                          }
                        >
                          <img
                            src={icons.greyEdit1}
                            style={{ height: 13, width: 13 }}
                          />
                        </div>
                        <Spacer width={10} />
                        <div
                          style={commonStyle.deleteStyle}
                          onClick={() => DeleteCheque(cheque.chequeId)}
                        >
                          <FaTrash
                            style={commonStyle.deleteCenterPointer}
                            size={15}
                            color={colors.red}
                          />
                        </div>
                        <Spacer width={10} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Accordion>
          ))
        ) : (
          <CustomText
            title={"No Cheque Added"}
            titleStyle={{ fontFamily: "medium" }}
          />
        )}
      </div>
    </div>
  );
};

export default ChequeList;
