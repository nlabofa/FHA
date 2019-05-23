import { StyleSheet } from "react-native";
//import themeStyle from "../../shared/theme.style";
import { Colors } from "../../shared/Themes";
export default StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 4,
    paddingVertical: 16,
    //height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  primary: {
    backgroundColor: Colors.blue
  },
  white: {
    backgroundColor: "white"
  },

  secondary: {
    backgroundColor: Colors.red
  },
  cleared: {
    backgroundColor: "#FFF"
  },
  validButton: {
    // backgroundColor: '#19B4E5',
  },
  inValidButton: {
    opacity: 0.6
  },
  inValidButtonSpecial: {
    opacity: 0.6,
    backgroundColor: "#8793AA"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "CircularStd-Bold"
  },
  blueText: {
    color: Colors.blue,
    fontSize: 16,
    fontWeight: "bold"

    //fontFamily: "HKGrotesk-Regular"
  },
  clearButtonText: {
    color: "#3E7AC1",
    fontSize: 16,
    fontWeight: "bold"
    // fontFamily: "HKGrotesk-Regular"
  },
  loadingText: {
    color: "white",
    fontSize: 16
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  activityLoader: {
    marginRight: 15
  }
});
