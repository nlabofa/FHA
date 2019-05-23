import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../shared/Themes";
export default StyleSheet.create({
  // Slide styles
  container: {
    backgroundColor: "#E5E5E5",
    flex: 1,
    position: "relative"
  },
  containerdiv: {
    backgroundColor: "#fff",
    paddingHorizontal: Metrics.marginHorizontal
  },
  headtext: {
    color: "#000",
    fontSize: 24,
    marginVertical: 30
  },
  userIcon: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "transparent"
  },
  headerview: {
    flexDirection: "row",
    alignItems: "center"
    //backgroundColor: "red"
  },
  hr: {
    borderColor: "#f2f2f2",
    borderWidth: 1,
    marginTop: 20
  },
  absimg: {
    position: "absolute",
    right: 10,
    zIndex: 100000000
  },
  listItem: {
    //backgroundColor: "red",
    paddingVertical: 23,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1
  },
  pointIcon: {
    width: 40,
    marginLeft: 10,
    height: 40
  },
  editIcon: {
    position: "absolute",
    right: 5,
    zIndex: 10000000
  },
  imageView: {
    flexDirection: "row",
    borderColor: "#e8e8e8",
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 150,
    overflow: "hidden"
  },
  inputmortgage: {
    marginTop: 50,
    width: "100%"
  },
  mortgageinput: {
    position: "relative",
    marginBottom: 30,
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
