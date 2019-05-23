import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Text,
  Image,
  StyleSheet,
  SafeAreaView
} from "react-native";
import { Colors, Images } from "../../shared/Themes";
import { BoldText, MediumText, RegularText } from "../../components/AppText";
import styles from "./Registration.style";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Snackbar from "react-native-snackbar";
import Button from "../../components/Button/Button";
import { NavigationActions, StackActions } from "react-navigation";
import RNPickerSelect from "react-native-picker-select";

const loanterm = [
  {
    label: "1-year",
    value: "1"
  },
  {
    label: "2-year",
    value: "2"
  },
  {
    label: "3-year",
    value: "3"
  },
  {
    label: "4-year",
    value: "4"
  },
  {
    label: "5-year",
    value: "5"
  },
  {
    label: "6-year",
    value: "6"
  },
  {
    label: "7-year",
    value: "7"
  },
  {
    label: "8-year",
    value: "8"
  },
  {
    label: "9-year",
    value: "9"
  },
  {
    label: "10-year",
    value: "10"
  },
  {
    label: "11-year",
    value: "11"
  },
  {
    label: "12-year",
    value: "12"
  },
  {
    label: "13-year",
    value: "13"
  },
  {
    label: "14-year",
    value: "14"
  },
  {
    label: "15-year",
    value: "15"
  }
];
class Step8ii extends Component {
  state = {
    loan: undefined
  };
  updateValue = value => {
    this.setState(
      {
        loan: value
      },
      () => this.sendData()
    );
  };
  sendData = () => {
    const formdata = {
      loanTerm: this.state.loan
    };
    this.props.saveInfo(formdata);
    this.props.calculateMortgage();
  };
  resetTo = route => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: route,
          params: {}
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };
  nextScreen = () => {
    this.props.navigation.navigate("Step8iii");
  };
  formatAmount = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    const { navigation, mortgage } = this.props;
    const placeholderloan = {
      label: "Loan Repayment Tenure",
      value: null,
      color: "#565F62"
    };
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: "#fff" }]}>
        <ScrollView style={styles.containerdiv}>
          <View>
            <View style={styles.header}>
              <Ionicons
                onPress={() => navigation.pop()}
                name="ios-arrow-round-back"
                size={50}
                style={{ padding: 5 }}
                color={Colors.blue}
              />
            </View>
            <View style={styles.middlecontent}>
              <View style={styles.paginate}>
                <Image
                  source={Images.activeLine}
                  style={{ marginRight: 15 }}
                  resizeMode="contain"
                />
                <Image
                  source={Images.activeLine}
                  style={{ marginRight: 15 }}
                  resizeMode="contain"
                />
                <Image
                  source={Images.lightLine}
                  style={{ marginRight: 15 }}
                  resizeMode="contain"
                />
              </View>
              <BoldText customstyle={styles.midhead}>
                Calculate Repayments
              </BoldText>
              <RegularText customstyle={styles.midtext}>
                Select the number of years you’d like to repay the loan amount
                for, this would be used to set your monthly contribution amount
                for 15 months.
              </RegularText>

              <View style={styles.inputmortgage}>
                <RegularText customstyle={styles.bottext}>
                  * maximmum number of years for repayment is 15 {"\n  "} years,
                  interest rate is set at 15%
                </RegularText>
                <View style={styles.mortgageinput}>
                  <RNPickerSelect
                    placeholder={placeholderloan}
                    items={loanterm}
                    onValueChange={value => {
                      this.updateValue(value);
                    }}
                    style={{
                      ...pickerSelectStyles,
                      iconContainer: {
                        top: 18,
                        right: 12
                      }
                    }}
                    value={this.state.loan}
                    placeholderTextColor={Colors.blue}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: "yellow" }}
                    Icon={() => {
                      return (
                        <MaterialCommunityIcons
                          name="chevron-down"
                          size={30}
                          color={Colors.blue}
                        />
                      );
                    }}
                  />
                  {!this.props.mortgage && !this.props.loading ? (
                    <View style={{ marginTop: 20 }}>
                      <Button
                        type="style.special"
                        onPress={() => this.sendData()}
                        disabled={!this.state.loan}
                        //isLoading={this.props.loading}
                      >
                        NEXT
                      </Button>
                    </View>
                  ) : null}
                </View>
                {this.props.loading ? (
                  <View style={styles.loadingdiv}>
                    <ActivityIndicator size="large" color={Colors.blue} />
                    <RegularText
                      customstyle={[
                        styles.midtext,
                        { marginBottom: 80, marginTop: 20 }
                      ]}
                    >
                      calculating your repayment amount
                    </RegularText>
                    <View style={{ width: "100%", flex: 1 }}>
                      <Button
                        type="style.special"
                        //onPress={() => this.saveInfo()}
                        disabled={true}
                        //isLoading={this.props.loading}
                      >
                        CONTINUE
                      </Button>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </ScrollView>
        {this.props.mortgage ? (
          <View>
            <View style={styles.colordiv}>
              <RegularText customstyle={[styles.postext]}>
                Based on a repayment tenor of{" "}
                <BoldText customstyle={[styles.postext]}>
                  {this.state.loan + " Years"}
                </BoldText>{" "}
                , your monthly repayment and subsequent contribution amount is:
              </RegularText>
              <View
                style={{
                  backgroundColor: "#0936EF",
                  padding: 18,
                  borderRadius: 4
                }}
              >
                <BoldText customstyle={[styles.smtext]}>
                  {"NGN " +
                    this.formatAmount(
                      mortgage && mortgage.estimatedMonthlyPament
                    )}
                </BoldText>
              </View>
            </View>
            <TouchableOpacity onPress={this.nextScreen}>
              <BoldText
                customstyle={{
                  color: Colors.blue,
                  textAlign: "center",
                  fontSize: 18,
                  paddingBottom: 15
                }}
              >
                CONTINUE
              </BoldText>
            </TouchableOpacity>
          </View>
        ) : null}
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
    borderColor: Colors.blue,
    color: Colors.blue,
    borderWidth: 1,
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 17
  },
  inputAndroid: {
    marginBottom: 20,
    fontSize: 16,
    fontFamily: "CircularStd-Book",
    borderRadius: 8,
    borderColor: Colors.blue,
    borderWidth: 1,
    color: Colors.blue,
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 17
  }
});
const mapStateToprops = state => {
  return {
    loading: state.uiReducer.loading,
    message: state.uiReducer.message,
    mortgage: state.authReducer.mortgage,
    formdata: state.authReducer.formdata
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveInfo: data => dispatch(actions.saveInfo(data)),
    clearMessage: () => dispatch(actions.clearMessage()),
    calculateMortgage: () => dispatch(actions.calculateMortgage())
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Step8ii);
