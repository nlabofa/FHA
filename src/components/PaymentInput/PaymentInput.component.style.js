import { StyleSheet } from "react-native";
import { Colors } from "../../shared/Themes";
export default StyleSheet.create({
  formControl: {
    width: "100%",
    backgroundColor: Colors.gray,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    //textAlign: "center",
    //borderWidth: 1,
    //borderColor: '#F3F3F3',
    paddingHorizontal: 15,
    paddingTop: 15,
    marginBottom: 15,
    height: 70,
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 9,
    color: "#29324C"
  },
  inValid: {
    borderColor: "#C51162"
  }
});
