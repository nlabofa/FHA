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
    backgroundColor: "#f9f9f9",
    paddingHorizontal: Metrics.marginHorizontal
  },
  headtext: {
    color: "#000",
    fontSize: 24,
    marginTop: 30
  },
  bigcard: {
    backgroundColor: Colors.blue,
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
    //justifyContent: "center",
    width: 330,
    marginRight: 15,
    height: 200
  },
  badgeview: {
    // marginTop: 20,
    backgroundColor: "#27AE60",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    //justifyContent: "center",
    width: "100%",
    marginRight: 15,
    height: 150
  },
  congrathead: {
    color: "#fff",
    fontSize: 19,
    textAlign: "center",
    paddingTop: 50,
    paddingBottom: 20
  },
  congratext: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16
  },
  matchingbonus: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    paddingVertical: 12
  },
  absimg: {
    zIndex: -100000,
    position: "absolute",
    left: -15,
    top: -8
  },
  button: {
    marginTop: 40,
    width: "75%",
    borderRadius: 4,
    padding: 14,
    backgroundColor: "#fff",
    //height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 35
  },
  button2: {
    marginTop: 30,
    marginBottom: 20,
    width: "100%",
    // borderRadius: 4,
    paddingVertical: 17,
    backgroundColor: Colors.blue,
    //height: 50,
    justifyContent: "center",
    alignItems: "center"
    // marginHorizontal: 35
  },
  referralview: {
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: Colors.blue,
    borderRadius: 10,
    paddingHorizontal: 15,
    position: "relative",
    width: "100%",
    borderColor: "rgba(0, 0, 0, 0.04)",
    borderWidth: 2,
    // backgroundColor: "red",
    height: 180
  },
  emptycard: {
    marginVertical: 10,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    paddingHorizontal: 15,
    position: "relative",
    width: "100%",
    height: 230
  },
  cardhead: {
    color: Colors.base,
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 12
  },
  hr: {
    borderColor: "#e5e5e5",
    borderWidth: 1
  },
  emptyimg: {
    width: 120,
    height: 87
  },
  bottomcard: {
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    position: "relative",
    width: "100%",
    borderColor: "rgba(0, 0, 0, 0.04)",
    borderWidth: 2,
    minHeight: 200
  },
  bottomhead: { flexDirection: "row", justifyContent: "space-between" },
  input: {
    flexDirection: "row",
    marginTop: 15
  },
  referbutton: {
    width: "25%",
    height: "76%",
    backgroundColor: Colors.blue,
    borderTopRightRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 6
  },
  label: {
    backgroundColor: Colors.base,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 4,
    padding: 5,
    color: "white",
    fontSize: 11
  },
  activetablabel: {
    backgroundColor: Colors.orange
  },
  headcard: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "red"
  },
  tabtext: { fontSize: 17, color: Colors.base },
  activetab: {
    borderBottomColor: Colors.orange,
    borderBottomWidth: 2
  },
  activetabtext: {
    color: Colors.orange
  },
  headabs: {
    position: "absolute",
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 5,
    backgroundColor: Colors.deepblue
  },
  headbottom: {
    flexDirection: "row",
    width: "90%",
    // backgroundColor: "red",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 70
  },
  listItem: {
    //backgroundColor: "red",
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    paddingVertical: 20
  },
  absdate: {
    position: "absolute",
    right: 0,
    color: Colors.base
  },
  badgerow: {
    flexDirection: "row",
    width: "90%",
    // backgroundColor: "red",
    // justifyContent: "space-between",
    alignItems: "center"
  },
  badgeknot: {
    borderRadius: 20,
    backgroundColor: "#298f51",
    paddingHorizontal: 12,
    paddingVertical: 5
  },
  horizontal: {
    flex: 1
  },
  smallknot: {
    borderRadius: 20,
    backgroundColor: Colors.deepblue,
    paddingHorizontal: 20,
    paddingVertical: 7
  },
  knottext: {
    color: "#fff"
  },
  pricetext: {
    color: "#fff",
    fontSize: 16,
    paddingLeft: 10
  }
});
