import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Image,
  SafeAreaView
} from "react-native";
import { Colors, Images } from "../../shared/Themes";
import {
  BoldText,
  MediumText,
  RegularText,
  SemiBoldText
} from "../../components/AppText";
import { NavigationActions, StackActions } from "react-navigation";
import styles from "./SaveNowScreen.style";
import NumberFormat from "react-number-format";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RNPickerSelect from "react-native-picker-select";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../../components/Button/Button";

class PayNow extends Component {
  state = {
    price: "",
    formatdata: [],
    equity: "",
    reference: ""
  };
  componentDidMount = () => {
    let formatdata = [];
    this.props.cardlist &&
      this.props.cardlist.map((value, index) => {
        return formatdata.push({
          value: value._id,
          label: "**** **** **** " + value.last4Digits
        });
      });
    this.setState({ formatdata });
  };
  saveInfo = () => {
    const { usercontribution } = this.props;
    const FormData = {
      cardID: this.state.equity,
      amount: usercontribution.withdrawal.withdrawalAmount,
      reference: usercontribution.withdrawal.reference
    };
    //console.log(FormData);
    this.props.makePaymentNow(FormData);
  };
  resetTo = route => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: route,
          params: {
            cardadded: true
          }
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };
  render() {
    const { usercontribution } = this.props;
    const placeholderequity = {
      label: "Select payment method",
      value: null,
      color: "#565F62"
    };
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerdiv}>
          <Ionicons
            onPress={() => this.props.navigation.pop()}
            name="ios-arrow-round-back"
            size={50}
            style={{ padding: 5 }}
            color="white"
          />
          <BoldText customstyle={{ fontSize: 24, color: "white" }}>
            Pay Now.
          </BoldText>
          <RegularText
            customstyle={{ fontSize: 14, color: "white", paddingVertical: 10 }}
          >
            Pay back your outstanding withdrawal.
          </RegularText>
        </View>
        {this.props.itemloading ? (
          <View style={styles.progressbar}>
            <ActivityIndicator size="large" color={Colors.blue} />
          </View>
        ) : (
          <ScrollView style={styles.containerdiv}>
            {/* <RegularText
              customstyle={{
                color: Colors.base,
                fontSize: 16,
                paddingTop: 20
              }}
            >
              Points gained :
            </RegularText>
            <BoldText customstyle={{ color: Colors.orange, fontSize: 80 }}>
              0
            </BoldText> */}
            <RegularText
              customstyle={{
                color: Colors.base,
                fontSize: 16,
                paddingTop: 10
              }}
            >
              Total amount you're paying back
            </RegularText>
            <View style={styles.mortgageinput}>
              <Image source={Images.naira2} style={styles.nairaicon} />
              <NumberFormat
                value={usercontribution.withdrawal.withdrawalAmount}
                displayType={"text"}
                thousandSeparator={true}
                renderText={amount => (
                  <TextInput
                    editable={false}
                    //placeholder="100"
                    value={amount}
                    // onChangeText={value => this.setState({ price: value })}
                    style={[styles.formControl]}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#e0e1e6"
                    keyboardType="number-pad"
                  />
                )}
              />
            </View>
            <RNPickerSelect
              placeholder={placeholderequity}
              items={this.state.formatdata}
              onValueChange={value => {
                this.setState({
                  equity: value
                });
              }}
              style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 4,
                  right: 12
                }
              }}
              value={this.state.equity}
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

            <View style={{ marginBottom: 30 }}>
              <Button
                type="style.primary"
                onPress={() => this.saveInfo()}
                disabled={!this.state.equity}
                isLoading={this.props.loading}
              >
                PAY
              </Button>
            </View>
          </ScrollView>
        )}
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
    color: "#565F62",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#F8F9FF",
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 17
  },
  inputAndroid: {
    marginBottom: 20,
    fontSize: 16,
    fontFamily: "CircularStd-Book",
    borderRadius: 8,
    color: "#565F62",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#F8F9FF",
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 17
  }
});
const mapStateToprops = state => {
  return {
    loading: state.uiReducer.loading,
    itemloading: state.uiReducer.itemloading,
    message: state.uiReducer.message,
    userinfo: state.authReducer.userinfo,
    usercontribution: state.authReducer.usercontribution,
    cardlist: state.paymentReducer.cardlist
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserCards: () => dispatch(actions.getUserCards()),
    makePaymentNow: data => dispatch(actions.makePaymentNow(data))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(PayNow);
