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
    color: "#808080",
    fontSize: 17,
    lineHeight: 18,
    paddingTop: 20
  },
  userIcon: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "transparent"
  },
  headerview: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
    alignItems: "center"
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
    fontSize: 19,
    lineHeight: 24,
    color: "#0A0D1C",
    width: "70%"
  },
  inputmortgage: {
    fontSize: 16,
    color: Colors.blue,
    width: "25%"
  },
  mortgageinput: {
    position: "relative",
    marginTop: 50
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
    color: Colors.base,
    fontSize: 17,
    lineHeight: 18,
    marginTop: 30
  }
});
