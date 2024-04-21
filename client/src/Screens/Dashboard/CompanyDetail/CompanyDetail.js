import React, { useEffect, useState } from "react";
import DashboardPageHeader from "../../../Components/DashboardComponent/DashboardPageHeader";
import Spacer from "../../../Components/CustomComponents/Spacer";
import Services from "../../../services";
import { useNavigate, useParams } from "react-router-dom";
import "../../../Assets/css/style.css";
import CustomText from "../../../Components/CustomComponents/CustomText";
import { colors } from "../../../utils/Colors";
import { styles } from "../../../Assets/Style/CompnayDetailStyle";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import EditCompanyDetail from "./EditCompanyDetail";
import { commonStyle } from "../../../Assets/Style/CommonStyle";
import { icons } from "../../../Assets/Icons";

const CompanyDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [companyDetail, setCompanyDetail] = useState();
  const [editToggle, setEditToggle] = useState(false);
  const onClose = () => {
    setEditToggle(false);
  };

  const handleEditClick = () => {
    setEditToggle(true);
  };

  const getCompanyDetail = async () => {
    try {
      await Services.Company.companyDetail(id)
        .then((res) => {
          setCompanyDetail(res);
          console.log("Company Detail res", res);
        })
        .catch((err) => {
          console.log("Detail Error", err);
        });
    } catch {}
  };

  useEffect(() => {
    getCompanyDetail();
  }, []);

  const deleteCompany = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this company!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: colors.primary,
        cancelButtonColor: colors.grey2,
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        Services.Company.deleteCompany(id)
          .then((res) => {
            console.log("Delete Response", res);
            toast.success("Company Deleted Successfully");
            navigate("/dashboard/companies");
          })
          .catch((err) => {
            console.log("Delete Company Error", err);
          });
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  console.log("LEDGER FROM DETAIL COMPANY",companyDetail?.accessToDeleteLedger)

  return (
    <div>
      {editToggle && (
        <EditCompanyDetail
          editToggle={editToggle}
          getCompanyDetail={getCompanyDetail}
          companyId={id}
          companyDetail={companyDetail}
          setEditToggle={setEditToggle}
          onClose={onClose}
        />
      )}
      <DashboardPageHeader
        headerTitle={"Company Detail"}
        showEdit
        showDelete
        DeleteOnClick={() => deleteCompany()}
        editOnClick={handleEditClick}
      />
      <Spacer height={30} />

      <div className="container">
        <div style={{ padding: 10 }}>
          <div style={styles.flexStart}>
            <CustomText titleStyle={styles.textStyle} title={"Company Name"} />
          </div>
          <div style={styles.companyName}>
            <CustomText title={companyDetail?.companyName} />
          </div>
        </div>

        <div style={{ padding: 10 }}>
          <div style={styles.flexStart}>
            <CustomText titleStyle={styles.textStyle} title={"Address"} />
          </div>
          <div style={styles.companyName}>
            <CustomText title={companyDetail?.address} />
          </div>
        </div>

        <div style={{ padding: 10 }}>
          <div style={styles.flexStart}>
            <CustomText
              titleStyle={styles.textStyle}
              title={"Nature Of Work"}
            />
          </div>
          <div style={styles.companyName}>
            <CustomText title={companyDetail?.natureOfWork} />
          </div>
        </div>

        <div style={{ padding: 10 }}>
          <div style={styles.flexStart}>
            <CustomText titleStyle={styles.textStyle} title={"Rate Of Tax"} />
          </div>
          <div style={styles.companyName}>
            {/* <CustomText title={companyDetail?.rateOfTax} /> */}

            <div style={{ ...commonStyle.tagBodyStyle }}>
              {companyDetail?.rateOfTax?.map((option, index) => (
                <>
                  <Spacer width={10} />
                  <div
                  key={index}
                    style={{
                      ...commonStyle.tagInnerStyle,
                      backgroundColor: colors.white,
                      marginTop: 2,
                    }}
                  >
                    <CustomText title={option} titleStyle={{ fontSize: 11 }} />
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: 10 }}>
          <div style={styles.flexStart}>
            <CustomText titleStyle={styles.textStyle} title={"Under Section"} />
          </div>
          <div style={styles.companyName}>
            <div style={{ ...commonStyle.tagBodyStyle }}>
              {companyDetail?.underSection?.map((option, index) => (
                <>
                  <Spacer width={10} />
                  <div
                  key={index}
                    style={{
                      ...commonStyle.tagInnerStyle,
                      backgroundColor: colors.white,
                      marginTop: 2,
                    }}
                  >
                    <CustomText title={option} titleStyle={{ fontSize: 11 }} />
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: 10 }}>
          <div style={styles.flexStart}>
            <CustomText titleStyle={styles.textStyle} title={"NTN"} />
          </div>
          <div style={styles.companyName}>
            <CustomText title={companyDetail?.ntn} />
          </div>
        </div>

        <div style={{ padding: 10 }}>
          <div style={styles.flexStart}>
            <CustomText
              titleStyle={styles.textStyle}
              title={"Access To Delete Ledger"}
            />
          </div>
          <div style={styles.companyName}>
            <img
              src={
                companyDetail?.accessToDeleteLedger === true
                  ? icons.approved
                  : icons.rejected
              }
              style={{ height: 30, width: 30, alignSelf: "center" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
