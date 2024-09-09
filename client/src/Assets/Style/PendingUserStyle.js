
import { colors } from "../../utils/Colors";

export const styles = {
  inputStyle: {
    border: "none",
    borderColor: "none",
    outline: "none",
    width: "100%",
    paddingLeft: 5,
    backgroundColor: colors.bgWhite,
  },
  filterBody: {
    backgroundColor: colors.white,
    borderLeft: `5px solid ${colors.black2}`,
    borderRadius: 10,
    boxShadow: "0px 0px 8px -2px rgba(0,0,0,0.12)",
    textAlign: "center",
    padding: 10,
  },
  inputContainerStyle: {
    display: "flex",
    alignItems: "center",
    height: 2,
    paddingTop:13,
    paddingBottom:13,
    paddingLeft:5,
    borderRadius: 5,
    border: "solid",
    borderWidth: 1,
    borderColor: colors.grey,
    outline: "none",
    width: 180,
  },
  tableHeader: {
    width: "60%",
    margin: "auto",
    overflow: "hidden",
    borderRadius: 2,
    boxShadow: "0px 0px 8px -2px rgba(0,0,0,0.12)",
  },
  
};
