import { toast } from "react-toastify";
import Services from "../../services";


export const fetchChequeByBankName = async (setBankChequeList,selectedValue) => {
    console.log("Bank Selected", selectedValue);
    try {
      await Services?.Cheque?.chequeByBankName(selectedValue)
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