import { colors } from "../../utils/Colors";

export const styles = {
  buttonStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 23,
    borderRadius: 10,
    backgroundColor: colors.purple,
    boxShadow: "2px 1px 15px -1px rgba(0,0,0,0.40)",
    cursor: "pointer",
  },
  formBodyContainerStyle:{
    paddingLeft: 50,
    paddingRight: 50,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  }
};
