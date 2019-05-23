import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView
} from "react-native";
import { Colors, Images } from "../../shared/Themes";
import { BoldText, MediumText, RegularText } from "../../components/AppText";
import styles from "./Withdrawal.style";
import RNPickerSelect from "react-native-picker-select";
import Snackbar from "react-native-snackbar";
import NumberFormat from "react-number-format";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../../components/Button/Button";
const itemsdata = [
  {
    label: "Instant Withdrawal",
    value: "instant"
  },
  {
    label: "Delayed Withdrawal",
    value: "delayed"
  }
];
class ConfirmWithdrawal extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.message == "verify account success") {
      this.showModal();
    }
    if (nextProps.accountname) {
      this.setState({ accountname: nextProps.accountname });
    }
  }
  state = {
    accountname: "",
    price: "",
    equity: "",
    bankcode: "",
    accountNo: ""
  };
  showModal = () => {
    Alert.alert(
      "Confirm!",
      `Your Account Name is ${this.state.accountname} with Account Number ${
        this.state.accountNo
      }, and you want to make a withdrawal of NGN ${this.formatAmount(
        this.state.price.replace(/,/g, "")
      )}`,
      [
        {
          text: "Confirm",
          onPress: () => this.saveInfo()
        },
        {
          text: "Cancel",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ]
    );
  };
  showSnackBar = message => {
    // Snackbar.show({
    //   title: "Hello world",
    //   duration: Snackbar.LENGTH_SHORT
    // });
    Snackbar.show({
      title: message,
      duration: Snackbar.LENGTH_INDEFINITE,
      action: {
        title: "Close",
        color: "green",
        onPress: () => {
          this.props.clearMessage();
        }
      }
    });
  };
  updateDate = date => {
    this.setState({ day: date });
  };
  saveInfo = () => {
    this.props.clearMessage();
    const formdata = {
      amount: this.state.price.replace(/,/g, ""),
      accountNumber: this.state.accountNo,
      bankcode: this.state.bankcode,
      type: this.state.equity
    };
    console.log(formdata);
    this.props.makeWithdrawal(formdata);
  };
  verifyAccount = () => {
    const formdata = {
      accountNumber: this.state.accountNo,
      bankcode: this.state.bankcode
    };

    this.props.verifyAccount(formdata);
  };
  formatAmount = num => {
    const n = String(num),
      p = n.indexOf(".");
    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) =>
      p < 0 || i < p ? `${m},` : m
    );
  };
  render() {
    const placeholderequity = {
      label: "Select withdrawal method",
      value: null,
      color: "#808ecc"
    };
    const banklist = {
      label: "Select Bank",
      value: null,
      color: "#808ecc"
    };

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.containerdiv}>
          <View style={styles.header}>
            <Ionicons
              onPress={() => this.props.navigation.pop()}
              name="ios-arrow-round-back"
              size={50}
              style={{ padding: 5 }}
              color="white"
            />
          </View>
          <View style={styles.middlecontent}>
            <BoldText customstyle={styles.midhead}>Withdraw Funds</BoldText>

            <RegularText customstyle={styles.midtext}>
              You have a pending withdrawal.
            </RegularText>
            <View style={styles.listitem}>
              <View style={styles.hr}>
                <RegularText customstyle={{ color: "#fff", fontSize: 15 }}>
                  AMOUNT REQUESTED
                </RegularText>
                <BoldText
                  customstyle={{
                    color: "#fff",
                    fontSize: 26,
                    paddingTop: 15,
                    paddingBottom: 10
                  }}
                >
                  {"\u20A6"}
                  35,0000
                </BoldText>
              </View>
              <View style={styles.hr}>
                <RegularText customstyle={{ color: "#fff", fontSize: 15 }}>
                  AMOUNT TO REPAY
                </RegularText>
                <BoldText
                  customstyle={{
                    color: "#fff",
                    fontSize: 26,
                    paddingTop: 15,
                    paddingBottom: 10
                  }}
                >
                  {"\u20A6"}
                  35,0000
                </BoldText>
              </View>
              <View style={styles.hr}>
                <RegularText customstyle={{ color: "#fff", fontSize: 15 }}>
                  WITHDRAWAL DATE
                </RegularText>
                <BoldText
                  customstyle={{
                    color: "#fff",
                    fontSize: 20,
                    paddingTop: 15,
                    paddingBottom: 10
                  }}
                >
                  03/04/19
                </BoldText>
              </View>
              <View style={styles.hr}>
                <RegularText customstyle={{ color: "#fff", fontSize: 15 }}>
                  REPAYMENT DATE
                </RegularText>
                <BoldText
                  customstyle={{
                    color: "#fff",
                    fontSize: 20,
                    paddingTop: 15,
                    paddingBottom: 10
                  }}
                >
                  03/04/19
                </BoldText>
              </View>
            </View>
            <View style={{ marginTop: 0, marginBottom: 20, width: "100%" }}>
              <Button
                type="style.white"
                //onPress={() => this.verifyAccount()}
                // disabled={
                //   !this.state.accountname ||
                //   !this.state.price ||
                //   !this.state.equity ||
                //   !this.state.accountNo ||
                //   !this.state.bankcode
                // }
                isLoading={this.props.loading}
              >
                CANCEL WITHDRAWAL
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginBottom: 20,
    fontSize: 16,
    fontFamily: "CircularStd-Book",
    borderRadius: 8,
    color: "white",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#0936EF",
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 17
  },
  inputAndroid: {
    marginBottom: 20,
    fontSize: 16,
    fontFamily: "CircularStd-Book",
    borderRadius: 8,
    color: "white",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#0936EF",
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 17
  }
});
const mapStateToprops = state => {
  return {
    loading: state.uiReducer.loading,
    accountname: state.paymentReducer.accountname,
    itemloading: state.uiReducer.itemloading,
    banklist: state.paymentReducer.banklist,
    message: state.uiReducer.message,
    formdata: state.authReducer.formdata
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getBankList: () => dispatch(actions.getBankList()),
    makeWithdrawal: data => dispatch(actions.makeWithdrawal(data)),
    verifyAccount: (formdata, verifydata) =>
      dispatch(actions.verifyAccount(formdata, verifydata)),
    clearMessage: () => dispatch(actions.clearMessage())
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(ConfirmWithdrawal);
