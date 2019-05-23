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
import Button from "../../components/Button/Button";

class SaveNow extends Component {
  state = {
    price: "",
    formatdata: [],
    equity: ""
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.message == "contribution success") {
      this.resetTo("Home");
    }
  }
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
    const FormData = {
      cardID: this.state.equity,
      amount: this.state.price.replace(/,/g, "")
    };
    this.props.makeVoluntaryContribution(FormData);
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
    const placeholderequity = {
      label: "Select payment method",
      value: null,
      color: "#565F62"
    };
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerdiv}>
          <BoldText customstyle={{ fontSize: 24, color: "white" }}>
            Save Now.
          </BoldText>
          <RegularText
            customstyle={{ fontSize: 14, color: "white", paddingVertical: 10 }}
          >
            Make an instant equity or voluntary contribution.
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
              How much do you want to contribute?
            </RegularText>
            <View style={styles.mortgageinput}>
              <Image source={Images.naira2} style={styles.nairaicon} />
              <NumberFormat
                value={this.state.price}
                displayType={"text"}
                thousandSeparator={true}
                renderText={amount => (
                  <TextInput
                    placeholder="75,000"
                    value={amount}
                    onChangeText={value => this.setState({ price: value })}
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
                disabled={!this.state.price || !this.state.equity}
                isLoading={this.props.loading}
              >
                SAVE NOW
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
    cardlist: state.paymentReducer.cardlist
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserCards: () => dispatch(actions.getUserCards()),
    makeVoluntaryContribution: data =>
      dispatch(actions.makeVoluntaryContribution(data))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(SaveNow);
