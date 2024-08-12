import { toast } from "react-toastify";
import Services from "../../services";


export const fetchChequeByBankName = async (setBankChequeList,selectedValue, selectedUserId) => {
    console.log("Bank Selected", selectedValue);
    console.log("selectedUserId", selectedUserId);
    try {
      await Services?.Cheque?.chequeByBankName(selectedValue, selectedUserId)
        .then((res) => {
          console.log("List Cheque", res);
          const ListChequeNo = res?.flatMap((item) => item?.chequeNo);
          setBankChequeList(ListChequeNo);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } catch (error) {
      console.log("list Cheque Error", error);
    }
  };