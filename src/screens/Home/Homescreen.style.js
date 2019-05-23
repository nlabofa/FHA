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
    backgroundColor: "#f9f9f9",
    paddingHorizontal: Metrics.marginHorizontal
  },
  progressbar: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white"
  },
  headtext: {
    color: "#565F62",
    fontSize: 24,
    marginVertical: 30
  },
  savingsreminder: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: Colors.yellow,
    width: "100%",
    height: 55,
    borderRadius: 4
  },
  viewbox: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
    borderColor: "#000",
    borderWidth: 1
  },
  topfixed: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "red",
    alignItems: "center"
  },
  daysbox: {
    marginLeft: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: "#E5ECF9",
    borderRadius: 3
  },
  bigcard: {
    flexDirection: "row",
    backgroundColor: Colors.blue,
    borderRadius: 4,
    paddingHorizontal: 30,
    marginVertical: 10,
    alignItems: "center",
    position: "relative",
    //overflow: "hidden",
    justifyContent: "space-between",
    width: "100%",
    height: 100
  },
  headercard: {
    color: "white",
    opacity: 0.8
  },
  badgeview: {
    // marginTop: 30,
    backgroundColor: "transparent",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    //justifyContent: "center",
    width: "100%",
    height: 150
  },
  referralview: {
    marginVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,

    position: "relative",
    width: "100%",
    borderColor: "rgba(0, 0, 0, 0.04)",
    borderWidth: 1,
    // backgroundColor: "red",
    minHeight: 260
  },
  needle: {
    position: "absolute",
    top: 90,
    transform: [{ rotate: "-150deg" }]
    //transform: [{ rotateX: "45deg" }]
    // translate: [{ rotate: "-90deg" }]
  },

  gaugetext: {
    color: Colors.blue,
    fontSize: 35,
    position: "absolute",
    top: 170
  },
  gaugeabstext: {
    color: Colors.base,
    fontSize: 15,
    position: "absolute",
    top: 220
  },
  referralview2: {
    marginVertical: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    position: "relative",
    width: "100%",
    borderColor: "rgba(0, 0, 0, 0.04)",
    borderWidth: 2,
    // backgroundColor: "red",
    height: 200
  },
  congrathead: {
    color: "#000",
    fontSize: 19,
    textAlign: "center",
    paddingVertical: 15
  },
  congratext: {
    color: Colors.base,
    textAlign: "center",
    fontSize: 16
  },
  matchingbonus: {
    fontSize: 24,
    color: Colors.blue,
    textAlign: "center",
    paddingVertical: 12
  },
  bonusdiv: {
    opacity: 0.8,
    color: Colors.blue,
    paddingBottom: 10,
    textAlign: "center"
  },
  bottomcard: {
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    position: "relative",
    width: "100%",
    borderColor: "rgba(0, 0, 0, 0.04)",
    borderWidth: 1,
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
    borderRadius: 2,

    paddingHorizontal: 5,
    paddingVertical: 2,
    color: "white",
    fontSize: 12
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  },
  absprice: {
    color: "white",
    fontSize: 12,
    position: "absolute",
    bottom: -20,
    right: -15,
    textAlign: "right"
  },
  cardview: {
    width: 370,
    height: 220,
    backgroundColor: "transparent",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative"
  },
  headlow: {
    width: "50%",
    position: "relative",
    //backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
    // marginTop: 40
  },
  headbottomtwo: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 70
  },
  listItem: {
    //backgroundColor: "red",
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#565F62",
    borderBottomWidth: 0.2,
    paddingVertical: 20
  },
  absdate: {
    position: "absolute",
    right: 0,
    color: Colors.base
  },
  badgerow: {
    flexDirection: "row",
    //backgroundColor: "green",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  badgeknot: {
    borderRadius: 20,
    backgroundColor: "transparent",
    // paddingHorizontal: 12,
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
    fontSize: 11
  },
  pricetext2: {
    color: "#fff",
    fontSize: 16
  }
});
