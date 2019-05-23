import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  // Slide styles
  slide: {
    position: "relative",
    flex: 1, // Take up all screen
    //justifyContent: "center",
    alignItems: "center" // Center horizontally
  },
  topArea: {
    marginTop: "30%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "red"
  },
  button: {
    width: "90%",
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 15,
    padding: 20,
    //height: 50,
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  subhead: {
    color: "white",
    fontSize: 20,
    marginVertical: 20
  },
  bottomArea: {
    position: "absolute",
    bottom: -150,
    width: "100%"
    //backgroundColor: "red"
  },
  bottomArea1: {
    paddingHorizontal: 20,
    height: "40%",
    width: "100%"
  },
  onboardStyle: {
    width: "100%",
    height: Dimensions.get("window").width < 351 ? 250 : 300
  },
  onboardStyle2: {
    width: 300,
    height: Dimensions.get("window").width < 351 ? 250 : 300
  },
  LogoStyle: {
    width: 50,
    height: 50
  },
  // Header styles
  header: {
    color: "#63DA84",
    fontSize: 30,
    marginVertical: 15
  },
  text: {
    color: "black",
    fontSize: 20
  }
});
