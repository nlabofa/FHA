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
    backgroundColor: "#f9f9f9"
  },
  containerdiv2: {
    backgroundColor: "#fff",
    position: "relative",
    flex: 1,
    paddingHorizontal: Metrics.marginHorizontal
  },
  cardrow: {
    width: "90%",
    flexDirection: "row",
    backgroundColor: Colors.blue,
    borderRadius: 5,
    padding: 20
  },
  carddiv: {
    width: "100%",
    justifyContent: "center",
    marginTop: 20,
    position: "relative"
  },
  headtext: {
    color: "#000",
    fontSize: 24,
    marginVertical: 30
  },
  middlecontent: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    // backgroundColor: "red",
    marginTop: 10
  },
  midhead: {
    color: "white",
    fontSize: 28
  },
  midtext: {
    color: "white",
    paddingTop: 10,
    paddingBottom: 25
  },
  progressbar: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white"
  },
  headerdiv: {
    backgroundColor: Colors.blue,
    height: 150,
    justifyContent: "center",
    paddingHorizontal: 20
  },

  bottomcard: {
    // marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    position: "relative",
    width: "100%",
    borderColor: "rgba(0, 0, 0, 0.04)",
    borderWidth: 1,
    minHeight: 100
  },
  bottomhead: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    width: "100%",
    paddingHorizontal: 15
  },
  input: {
    flexDirection: "row",
    marginTop: 15
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
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "red"
  },
  tabtext: { fontSize: 14, color: Colors.base },
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
  listItem2: {
    //backgroundColor: "red",
    marginVertical: 15,
    //flexDirection: "row",
    //alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 18
  },
  hr: {
    borderColor: "#E8E2ED",
    marginTop: 20,
    marginBottom: 40,
    borderWidth: 0.8,
    width: "95%"
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
    backgroundColor: "#db5743",
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
