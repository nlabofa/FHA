import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../shared/Themes";
export default StyleSheet.create({
  // Slide styles
  container: {
    backgroundColor: "#E5E5E5",
    flex: 1,
    position: "relative"
  },
  union: { position: "absolute", bottom: -170, width: "100%" },
  baloon: {
    position: "absolute",
    bottom: 50,
    right: 120,
    width: 90,
    height: 90
  },
  containerdiv: {
    backgroundColor: Colors.blue,
    paddingHorizontal: Metrics.marginHorizontal
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    // backgroundColor: "red",
    marginTop: 10
  },
  box: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  boxrow: {
    marginTop: "10%",
    width: "100%",
    //backgroundColor: "red",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  stepicon: { width: 39, height: 26, marginTop: 19 },
  profileicon: { width: 163, height: 164, marginTop: 19 },
  closeIcon: { width: 55, height: 55 },
  progressbar: { width: 200, height: 6 },
  input: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  inputmortgage: {
    marginTop: 50,
    width: "100%"
  },
  mortgageinput: {
    position: "relative",
    marginBottom: 30
  },
  modalView: {
    justifyContent: "flex-end",
    margin: 0
  },
  modalContent: {
    height: "90%",
    backgroundColor: "#fff",
    padding: 22,
    //justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  nairaicon: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 10000000000000,
    width: 40,
    height: 40
  },
  infoicon: {
    zIndex: 10000000000000,
    width: 10,
    marginLeft: 10,
    height: 10
  },
  editicon: {
    position: "absolute",
    top: -25,
    right: 0,
    zIndex: 10000000000000,
    width: 40,
    height: 20
  },
  middlecontent: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  middlecontentcenter: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  cameraicon: {
    marginTop: 90,
    width: 70,
    height: 70
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
  housebox: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FF",
    //backgroundColor: "red",
    borderRadius: 5,
    height: 210,
    width: "47%"
  },
  formControl: {
    width: "100%",
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0936EF",
    textAlign: "left",
    borderRadius: 4,
    paddingVertical: 17,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: "CircularStd-Book",
    color: "white"
  },
  formControl2: {
    width: "100%",
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0936EF",
    textAlign: "left",
    color: "#fff",
    borderRadius: 4,
    //paddingLeft: 70,
    paddingVertical: 17,
    paddingHorizontal: 20,
    //marginBottom: 15,
    fontSize: 16,
    fontFamily: "CircularStd-Book",
    paddingRight: 30
  },
  activitybar: {
    justifyContent: "center",

    alignItems: "center"
  },
  dateControl: {
    width: "100%",
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0936EF",
    borderRadius: 4,
    paddingVertical: 13,
    paddingHorizontal: 20
  },
  formControlShort: {
    width: "48%",
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D409E",
    textAlign: "left",
    borderRadius: 4,
    paddingVertical: 17,
    paddingHorizontal: 20,

    fontSize: 16,
    fontFamily: "CircularStd-Book",
    color: "white"
  },
  listitem: {
    //backgroundColor: "red",
    marginVertical: 30,
    paddingHorizontal: 10
  },
  hr: {
    borderBottomColor: "#4483F8",
    borderBottomWidth: 1,
    minWidth: "100%",
    marginBottom: 20
    //  width: "95%"
  },
  disabledform: {
    width: "100%",
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FF",
    textAlign: "left",
    borderRadius: 4,
    color: "#565F62",
    paddingLeft: 20,
    paddingVertical: 17,
    marginBottom: 15,
    fontSize: 14,
    fontFamily: "CircularStd-Book",

    color: "white",
    paddingRight: 30
  },
  rowdiv: {
    flexDirection: "row",
    alignItems: "center"
  },
  activehouse: {
    borderColor: Colors.blue,
    borderWidth: 1
  },
  houseIcon: {
    width: 100,
    height: 70
  },
  houseduplex: {
    width: 100,
    height: 110
  },
  pushnot: {
    marginTop: Metrics.size20,
    justifyContent: "center",
    alignItems: "center"
  },
  regcontent: {
    marginTop: Metrics.size50,
    justifyContent: "center",
    alignItems: "center"
  },
  datePicker: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FF",
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15
  },
  userIcon: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "transparent"
  },
  imageView: {
    flexDirection: "row",
    marginTop: 50,
    marginBottom: 50,
    marginBottom: 20,
    borderColor: "#e8e8e8",
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 150,
    overflow: "hidden"
  },
  errormessage: {
    color: Colors.errormessage,
    marginBottom: 10
  }
});
