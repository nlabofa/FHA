import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  Image,
  StyleSheet,
  SafeAreaView
} from "react-native";
import { Colors, Images } from "../../shared/Themes";
import { BoldText, MediumText, RegularText } from "../../components/AppText";
import styles from "./Registration.style";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import Button from "../../components/Button/Button";
import RNPickerSelect from "react-native-picker-select";
import colors from "../../shared/Themes/Colors";
const sports = [
  {
    label: "1 Bedroom",
    value: "1 Bedroom"
  },
  {
    label: "2 Bedroom",
    value: "2 Bedroom"
  },
  {
    label: "3 Bedroom",
    value: "3 Bedroom"
  }
];
const stateData = [
  { value: "Abia", label: "Abia" },
  { value: "Adamawa", label: "Adamawa" },
  { value: "Akwa Ibom", label: "Akwa Ibom" },
  { value: "Bauchi", label: "Bauchi" },
  { value: "Bayelsa", label: "Bayelsa" },
  { value: "Benue", label: "Benue" },
  { value: "Borno", label: "Borno" },
  { value: "Cross River", label: "Cross River" },
  { value: "Delta", label: "Delta" },
  { value: "Ebonyi", label: "Ebonyi" },
  { value: "Enugu", label: "Enugu" },
  { value: "Edo", label: "Edo" },
  { value: "Ekiti", label: "Ekiti" },
  { value: "FCT", label: "FCT - Abuja" },
  { value: "Gombe", label: "Gombe" },
  { value: "Imo", label: "Imo" },
  { value: "Jigawa", label: "Jigawa" },
  { value: "Kaduna", label: "Kaduna" },
  { value: "Kano", label: "Kano" },
  { value: "Katsina", label: "Katsina" },
  { value: "Kebbi", label: "Kebbi" },
  { value: "Kogi", label: "Kogi" },
  { value: "Kwara", label: "Kwara" },
  { value: "Lagos", label: "Lagos" },
  { value: "Nasarawa", label: "Nasarawa" },
  { value: "Niger", label: "Niger" },
  { value: "Ogun", label: "Ogun" },
  { value: "Ondo", label: "Ondo" },
  { value: "Osun", label: "Osun" },
  { value: "Oyo", label: "Oyo" },
  { value: "Plateau", label: "Plateau" },
  { value: "Rivers", label: "Rivers" },
  { value: "Sokoto", label: "Sokoto" },
  { value: "Taraba", label: "Taraba" },
  { value: "Yobe", label: "Yobe" },
  { value: "Zamfara", label: "Zamfara" }
];
class Step6 extends Component {
  state = {
    housetype: "",
    statevalue: "",
    location: ""
  };
  selectHouse = value => {
    this.setState({ housetype: value });
  };
  onSelectedStateChange = selectedItems => {
    console.log(selectedItems);
    this.setState({ statevalue: selectedItems }, () =>
      this.props.getLga(this.state.statevalue)
    );
  };
  saveInfo = () => {
    const formdata = {
      houseType: this.state.housetype,
      location: this.state.location,
      state: this.state.statevalue
    };
    this.props.clearInfo();
    this.props.saveInfo(formdata);
    this.props.navigation.navigate("Step8");
  };
  render() {
    const { navigation } = this.props;
    const placeholder = {
      label: "Select House type",
      value: null,
      color: "#565F62"
    };
    const placeholderstate = {
      label: "Select State",
      value: null,
      color: "#565F62"
    };
    const placeholderlocation = {
      label: "Select Location",
      value: null,
      color: "#565F62"
    };
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.containerdiv}>
          {/* <View style={styles.header}>
            <Ionicons
              onPress={() => navigation.pop()}
              name="ios-arrow-round-back"
              size={50}
              style={{ padding: 5 }}
              color={Colors.blue}
            />
          </View> */}
          <View style={[styles.middlecontent, { marginTop: 60 }]}>
            <BoldText customstyle={styles.midhead}>
              Select House & Location
            </BoldText>
            <RegularText customstyle={styles.midtext}>
              Select a preferred house type and a location, you can change this
              anytime.
            </RegularText>
            <View style={styles.input}>
              <RNPickerSelect
                placeholder={placeholder}
                items={sports}
                onValueChange={value => {
                  this.setState({
                    housetype: value
                  });
                }}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 18,
                    right: 12
                  }
                }}
                value={this.state.housetype}
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
              <RNPickerSelect
                placeholder={placeholderstate}
                items={stateData}
                onValueChange={value => {
                  this.onSelectedStateChange(value);
                }}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 18,
                    right: 12
                  }
                }}
                value={this.state.statevalue}
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
              {this.props.itemloading ? (
                <ActivityIndicator size="large" />
              ) : (
                <RNPickerSelect
                  placeholder={placeholderlocation}
                  items={this.props.lga}
                  onValueChange={value => {
                    this.setState({ location: value });
                  }}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 18,
                      right: 12
                    }
                  }}
                  value={this.state.location}
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
              )}

              <View style={{ marginBottom: 10 }}>
                <Button
                  type="style.primary"
                  onPress={() => this.saveInfo()}
                  disabled={!this.state.housetype}
                  //isLoading={this.state.showLoading}
                >
                  ACCEPT
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
        <Image
          source={Images.balloon}
          resizeMode="cover"
          style={styles.baloon}
        />
      </SafeAreaView>
    );
  }
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginBottom: 30,
    fontSize: 16,
    fontFamily: "CircularStd-Book",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#F8F9FF",
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 17
  },
  inputAndroid: {
    marginBottom: 30,
    fontSize: 16,
    fontFamily: "CircularStd-Book",
    borderRadius: 8,
    color: "black",
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
    message: state.uiReducer.message,
    lga: state.authReducer.lga,
    itemloading: state.uiReducer.itemloading,
    formdata: state.authReducer.formdata
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveInfo: data => dispatch(actions.saveInfo(data)),
    getLga: state => dispatch(actions.getLga(state)),
    clearInfo: () => dispatch(actions.clearInfo()),
    clearMessage: () => dispatch(actions.clearMessage())
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Step6);
