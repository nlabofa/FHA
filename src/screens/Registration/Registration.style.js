import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../shared/Themes/";
export default StyleSheet.create({
  // Slide styles
  container: {
    backgroundColor: "#E5E5E5",
    flex: 1,
    position: "relative"
  },
  padbox: {
    padding: 15,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    // alignItems: "center",
    //justifyContent: "center",
    borderRadius: 7
  },
  padnum: {
    color: Colors.blue,
    fontSize: 38,
    textAlign: "center"
  },
  padmonth: {
    color: Colors.blue,
    fontSize: 18,
    textAlign: "center"
  },
  union: { position: "absolute", bottom: -170, width: "100%" },
  baloon: {
    position: "absolute",
    top: 40,
    right: 0,
    width: 60,
    height: 60
  },
  containerdiv: {
    backgroundColor: "white",
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
    marginTop: 25,
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
    marginTop: 30,
    width: "100%"
  },
  inputmortgage: {
    marginTop: 50,
    marginBottom: 20,
    width: "100%"
  },
  mortgageinput: {
    position: "relative",
    marginBottom: 30
  },
  modalView: {
    // flex: 1,
    // justifyContent: "flex-end",
    // margin: 0
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    height: "95%",
    width: "100%",
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
    top: 13,
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
    marginTop: 90,
    justifyContent: "center",
    alignItems: "center"
  },
  cameraicon: {
    marginTop: 40,
    marginBottom: 50,
    width: 70,
    height: 70
  },
  midhead: {
    color: Colors.orange,
    fontSize: 28
  },
  midtext: {
    color: Colors.base,
    paddingTop: 10
  },
  bottext: {
    color: "#27AE60",
    paddingBottom: 15
  },
  postext: {
    color: "#fff",
    lineHeight: 26,
    textAlign: "center",
    fontSize: 18,
    paddingTop: 15,
    paddingBottom: 15
  },
  smtext: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25
  },
  loadingdiv: {
    alignItems: "center",
    marginTop: 20
  },
  colordiv: {
    flex: 1,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    width: "100%",
    paddingHorizontal: 25,
    backgroundColor: Colors.blue,
    position: "absolute",
    bottom: 50,
    minHeight: 200
  },
  housebox: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FF",
    //backgroundColor: "red",
    borderRadius: 5,
    height: 210,
    width: "40%"
  },
  formControl: {
    width: "100%",
    borderColor: Colors.blue,
    borderWidth: 1,
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FF",
    textAlign: "left",
    borderRadius: 4,
    paddingLeft: 60,
    paddingVertical: 17,
    marginBottom: 15,
    fontSize: 18,
    fontFamily: "CircularStd-Book",

    color: Colors.blue,
    paddingRight: 30
  },
  formControl2: {
    width: "100%",
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FF",
    textAlign: "left",
    borderRadius: 4,
    paddingVertical: 17,
    marginBottom: 15,
    fontSize: 17,
    fontFamily: "CircularStd-Bold",

    color: "black"
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

    color: "black",
    paddingRight: 30
  },
  paginate: { flexDirection: "row", marginBottom: 20 },
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
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "transparent"
  },
  imageView: {
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 50,
    borderColor: "#e8e8e8",
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 150,
    overflow: "hidden"
  },
  errormessage: {
    color: Colors.errormessage,
    marginBottom: 10
  }
});
