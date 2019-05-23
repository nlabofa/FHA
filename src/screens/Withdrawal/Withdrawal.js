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
    label: "Deferred Withdrawal",
    value: "delayed"
  }
];
class Withdrawal extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.message == "verify account success") {
      this.showModal();
    }
    if (nextProps.accountname) {
      this.setState({ accountname: nextProps.accountname });
    }
  }
  componentDidMount() {
    this.props.getBankList();
  }
  state = {
    accountname: "",
    price: "",
    equity: "",
    bankcode: "",
    bvn: "",
    dob: "",
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
    this.setState({ dob: date });
  };
  saveInfo = () => {
    this.props.clearMessage();
    const formdata = {
      amount: this.state.price.replace(/,/g, ""),
      accountNumber: this.state.accountNo,
      bankcode: this.state.bankcode,
      type: this.state.equity,
      bvn: this.state.bvn,
      returnDate: this.state.dob
    };
    console.log(formdata);
    this.props.makeWithdrawal(formdata);
  };
  verifyAccount = () => {
    if (this.state.bvn.length < 11) {
      alert("Please ensure you entered a valid BVN!");
      return;
    } else if (this.state.accountNo.length < 10) {
      alert("Please ensure you entered a valid Account Number!");
      return;
    } else {
      const formdata = {
        accountNumber: this.state.accountNo,
        bankcode: this.state.bankcode
      };
      this.props.verifyAccount(formdata);
    }
  };
  calculateInterest = amount => {
    const interest = (10 / 100) * amount;
    const format = interest + amount;
    return isNaN(format) ? 0 : format;
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
            <Image
              source={Images.bulb}
              resizeMode="contain"
              style={{ marginTop: 10 }}
            />
            <RegularText customstyle={styles.midtext}>
              You can withdraw up to 5% of your monthly equity which will be
              repayed before the end of the month with 10% interest on the
              amount withdrawn.
            </RegularText>
            <View
              style={{
                width: "100%",
                marginTop: 10,
                position: "relative"
              }}
            >
              {this.props.itemloading ? (
                <BoldText
                  customstyle={{
                    color: "#fff",
                    width: "100%",
                    fontSize: 16,
                    paddingBottom: 20,
                    textAlign: "center"
                  }}
                >
                  Fetching Bank List...
                </BoldText>
              ) : (
                <RNPickerSelect
                  placeholder={banklist}
                  items={this.props.banklist}
                  onValueChange={value => {
                    this.setState({
                      bankcode: value
                    });
                  }}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 15,
                      right: 12
                    }
                  }}
                  placeholderTextColor="#fff"
                  value={this.state.bankcode}
                  useNativeAndroidPickerStyle={false}
                  textInputProps={{ underlineColor: "yellow" }}
                  Icon={() => {
                    return (
                      <MaterialCommunityIcons
                        name="chevron-down"
                        size={30}
                        color="#fff"
                      />
                    );
                  }}
                />
              )}

              <RNPickerSelect
                placeholder={placeholderequity}
                items={itemsdata}
                onValueChange={value => {
                  this.setState({
                    equity: value
                  });
                }}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 15,
                    right: 12
                  }
                }}
                placeholderTextColor="#fff"
                value={this.state.equity}
                useNativeAndroidPickerStyle={false}
                textInputProps={{ underlineColor: "yellow" }}
                Icon={() => {
                  return (
                    <MaterialCommunityIcons
                      name="chevron-down"
                      size={30}
                      color="#fff"
                    />
                  );
                }}
              />
            </View>
            <TextInput
              placeholder="Enter Account Number"
              value={this.state.accountNo}
              onChangeText={value => this.setState({ accountNo: value })}
              style={[styles.formControl]}
              underlineColorAndroid="transparent"
              placeholderTextColor="#fff"
              keyboardType="number-pad"
            />
            <View style={styles.input}>
              <TextInput
                placeholder="Enter Your BVN"
                value={this.state.bvn}
                onChangeText={value => this.setState({ bvn: value })}
                style={[styles.formControl]}
                underlineColorAndroid="transparent"
                placeholderTextColor="#fff"
                keyboardType="number-pad"
              />
            </View>

            {/* {this.state.verifyingaccount ? (
              <BoldText
                customstyle={{
                  color: "#fff",
                  width: "100%",
                  fontSize: 16,
                  marginTop: 10,
                  marginBottom: 10,
                  textAlign: "center"
                }}
              >
                Verifying Your Account Number...
              </BoldText>
            ) : null} */}

            <View style={styles.input}>
              {/* <Image source={Images.naira} style={styles.nairaicon} /> */}

              <NumberFormat
                value={this.state.price}
                displayType={"text"}
                thousandSeparator={true}
                renderText={amount => (
                  <TextInput
                    placeholder="Enter Amount"
                    value={amount}
                    onChangeText={value => this.setState({ price: value })}
                    style={[styles.formControl2]}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#fff"
                    keyboardType="number-pad"
                  />
                )}
              />
            </View>
            <View style={styles.input}>
              <Image
                source={Images.calendar}
                resizeMode="contain"
                style={{
                  position: "absolute",
                  right: 15,
                  top: 15,
                  zIndex: 1000000000
                }}
              />
              <DatePicker
                style={styles.dateControl}
                date={this.state.dob}
                mode="date"
                showIcon={false}
                minDate={new Date()}
                maxDate={moment().endOf("month")}
                confirmBtnText="OK"
                cancelBtnText="CANCEL"
                format="YYYY-MM-DD"
                placeholder="Select a repayment date"
                customStyles={{
                  dateInput: {
                    alignItems: "flex-start",
                    borderColor: "transparent"
                  },
                  dateText: {
                    color: "white",
                    fontSize: 16,
                    fontFamily: "CircularStd-Book"
                  },
                  placeholderText: {
                    fontSize: 16,
                    fontFamily: "CircularStd-Book",
                    color: "#fff"
                  }
                }}
                onDateChange={date => {
                  this.updateDate(date);
                }}
              />
            </View>
            <View style={{ width: "100%", marginTop: 30 }}>
              <RegularText
                customstyle={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: 17
                }}
              >
                You'd be paying back
              </RegularText>
              <BoldText
                customstyle={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: 25
                }}
              >
                {"\u20A6"}{" "}
                {this.formatAmount(
                  this.calculateInterest(
                    parseInt(this.state.price.replace(/,/g, ""))
                  )
                )}
              </BoldText>
            </View>
            <View style={{ marginTop: 30, marginBottom: 10, width: "100%" }}>
              <Button
                type="style.white"
                onPress={() => this.verifyAccount()}
                // disabled={
                //   !this.state.accountname ||
                //   !this.state.price ||
                //   !this.state.equity ||
                //   !this.state.accountNo ||
                //   !this.state.bankcode
                // }
                isLoading={this.props.loading}
              >
                CONFIRM
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
)(Withdrawal);
