import { StyleSheet } from "react-native";
import { Colors } from "../../shared/Themes/";
export default StyleSheet.create({
  formControl: {
    width: "100%",
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FF",
    textAlign: "left",
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 17,
    marginBottom: 15,
    fontFamily: "CircularStd-Book",
    fontSize: 16,
    color: "#000"
  },
  inValid: {
    borderColor: "#C51162"
  },
  focused: {
    borderColor: Colors.blue,
    borderWidth: 1
  },
  notfocused: {
    backgroundColor: "#F8F9FF"
  }
});
