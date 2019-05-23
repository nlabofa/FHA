import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../shared/Themes/";
export default StyleSheet.create({
  // Slide styles
  container: {
    backgroundColor: "#E5E5E5",
    flex: 1,
    position: "relative"
  },
  containerdiv: {
    flex: 1,
    position: "relative",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: Metrics.marginHorizontal
  },
  headtext: {
    color: "#000",
    fontSize: 24,
    marginTop: 30
  },
  bigcard: {
    backgroundColor: "#720F98",
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
    width: 280,
    marginRight: 15,
    height: 155
  },
  rowdiv: {
    flexDirection: "row",
    position: "relative",
    width: "100%",
    marginVertical: 20,
    justifyContent: "space-around",
    alignItems: "center"
  },
  absimg: {
    position: "absolute",
    zIndex: -100000000,
    opacity: 0.1,
    left: 0,
    width: 100,
    height: 100
  },
  cardhead: {
    color: "#FFF",
    fontSize: 16,
    paddingVertical: 12
  }
});
