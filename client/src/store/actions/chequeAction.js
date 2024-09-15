import { toast } from "react-toastify";
import Services from "../../services";


export const fetchChequeByBankName = async (setBankChequeList, selectedValue, selectedUserId, setChequeLoading ) => {
   await setChequeLoading(true)
    try {
      await Services?.Cheque?.chequeByBankName(selectedValue, selectedUserId)
        .then((res) => {
          console.log("List Cheque", res);
          const ListChequeNo = res?.flatMap((item) => item?.chequeNo);
          setBankChequeList(ListChequeNo);
          setChequeLoading(false)
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
          setChequeLoading(false)
        });
    } catch (error) {
      console.log("list Cheque Error", error);
      setChequeLoading(false)
    }
  };