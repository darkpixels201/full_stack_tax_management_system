import { toast } from "react-toastify";
import Services from "../../services";


export const fetchRateOfTaxList = async (setRateOfTax) => {
    try {
      await Services?.RateOfTax?.getRateOfTax()
        .then((res) => {
          console.log("List rate of tax Action", res);
          setRateOfTax(res);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } catch (error) {
      console.log("Rate Of Tax Error", error);
    }
  };