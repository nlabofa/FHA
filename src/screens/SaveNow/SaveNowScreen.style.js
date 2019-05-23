import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../shared/Themes";
export default StyleSheet.create({
  // Slide styles
  container: {
    backgroundColor: "#fff",
    flex: 1,
    position: "relative"
  },
  containerdiv: {
    backgroundColor: "#fff",
    marginTop: 50,
    paddingHorizontal: Metrics.marginHorizontal
  },
  headtext: {
    color: "#000",
    fontSize: 24,
    marginVertical: 30
  },
  inputmortgage: {
    marginTop: 50,
    width: "100%"
  },
  mortgageinput: {
    position: "relative",
    marginBottom: 10,
    marginTop: 15
  },
  formControl: {
    width: "100%",
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FF",
    textAlign: "left",
    borderRadius: 4,
    paddingLeft: 60,
    borderColor: Colors.blue,
    borderWidth: 1,
    paddingVertical: 17,
    marginBottom: 15,
    fontSize: 24,
    fontFamily: "CircularStd-Bold",

    color: "black",
    paddingRight: 30
  },
  headerdiv: {
    backgroundColor: Colors.blue,
    height: 150,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  progressbar: {
    justifyContent: "center",
    marginTop: 30,
    alignItems: "center",
    flex: 1,
    backgroundColor: "white"
  },
  nairaicon: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 10000000000000,
    width: 40,
    height: 40
  },
  input: {
    flexDirection: "row",
    marginTop: 15
  },

  headcard: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "red"
  }
});
