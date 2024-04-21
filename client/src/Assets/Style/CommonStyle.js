import { colors } from "../../utils/Colors";

export const commonStyle = {
  editStyle: {
    backgroundColor: "#e6e7eb",
    height: 24,
    width: 24,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  deleteStyle:{
    backgroundColor: colors.bgRed,
    height: 26,
    width: 26,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteCenterPointer:{
    alignSelf: "center", cursor: "pointer" 
  },

  // Tag Styles
  tagBodyStyle: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginRight: 10,
  },
  tagInnerStyle: {
    padding: 8,
    backgroundColor: colors.grey4,
    display: "flex",
    borderRadius: 20,
    marginTop: 10,
  }
};
