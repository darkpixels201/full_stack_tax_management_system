import { toast } from "react-toastify";
import Services from "../../services";


export const fetchUnderSectionList = async (setUnderSectionList) => {
  try {
    await Services?.UnderSection.getUnderSection()
      .then((res) => {
        // console.log("List Under Section", res);
        setUnderSectionList(res);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  } catch (error) {
    console.log("Rate Of Tax Error", error);
  }
};