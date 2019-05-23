import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  AsyncStorage,
  Text,
  Image,
  SafeAreaView
} from "react-native";
import { Colors, Images } from "../../shared/Themes";
import { BoldText, MediumText, RegularText } from "../../components/AppText/";
import styles from "./Registration.style";
import Fonts from "../../shared/Themes/Fonts";
import * as actions from "../../shared/store/actions/index";
import moment from "moment";
import IconF from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import CountryPicker from "react-native-country-picker-modal";
import validate from "../../shared/utils/validation";
import CustomInput from "../../components/CustomInput/CustomInput.component";
import DatePicker from "react-native-datepicker";
import { NavigationActions, StackActions } from "react-navigation";
import Button from "../../components/Button/Button";
console.disableYellowBox = true;
class Step1 extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.message && nextProps.message !== 200) {
      //this.showSnackBar(nextProps.message);
      alert(nextProps.message);
    } else if (nextProps.message && nextProps.message == 200) {
      this.resetTo("Step4");
    }
  }
  state = {
    cca2: "NG",
    callingCode: "",
    formIsValid: false,
    dob: "",
    controls: {
      surname: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 2
        },
        //placeholderText: "Enter Email|Phone|PIN",
        touched: false,
        focused: false
      },
      firstname: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 2
        },
        // placeholderText: "FirstName",
        touched: false,
        focused: false
      },
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        //placeholderText: "Enter Email|Phone|PIN",
        touched: false,
        focused: false
      },
      mobile: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 1
        },
        // placeholderText: "FirstName",
        touched: false,
        focused: false
      }
    }
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
  updateInputChange = (key, value, placeholderText) => {
    const updatedControls = {
      ...this.state.controls
    };
    const updatedFormElement = {
      ...updatedControls[key]
    };
    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.placeholderText = placeholderText;
    updatedFormElement.valid = validate(
      value,
      updatedFormElement.validationRules
    );

    updatedControls[key] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formIsValid: formIsValid,
      controls: updatedControls
    });
  };
  onFocus = name => {
    const updatedControls = {
      ...this.state.controls
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };
    updatedFormElement.focused = true;
    updatedControls[name] = updatedFormElement;
    this.setState({
      controls: updatedControls
    });
  };
  reverseDate(str) {
    var arr = str.split("-");
    arr.reverse();
    str = arr.join("-");
    return str;
  }
  updateDate = date => {
    var years = moment().diff(this.reverseDate(date), "years");
    console.log(years);
    console.log(this.reverseDate(date));
    this.setState({ dob: date, diffdate: years });
  };
  onBlur = name => {
    const updatedControls = {
      ...this.state.controls
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };
    updatedFormElement.focused = false;
    updatedControls[name] = updatedFormElement;
    this.setState({
      controls: updatedControls
    });
  };
  updateCountry = value => {
    console.log(value);
    this.setState({
      cca2: value.cca2
    });
  };
  saveInfo = () => {
    const formdata = {
      firstname: this.state.controls.firstname.value,
      lastname: this.state.controls.surname.value,
      dateOfBirth: this.reverseDate(this.state.dob),
      email: this.state.controls.email.value,
      phoneNumber: this.state.controls.mobile.value,
      countryCode: this.state.cca2
    };
    this.props.saveInfo(formdata);
    this.props.signUp();
  };
  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.containerdiv}>
          <View style={styles.header}>
            <Ionicons
              onPress={() => navigation.pop()}
              name="ios-arrow-round-back"
              size={50}
              style={{ padding: 5 }}
              color={Colors.blue}
            />
          </View>
          <View style={[styles.middlecontent, { marginTop: 60 }]}>
            <BoldText customstyle={styles.midhead}>Get Started</BoldText>
            <RegularText customstyle={styles.midtext}>
              Let's get to know you a bit
            </RegularText>

            <View style={styles.input}>
              <CustomInput
                placeholder="First Name"
                onFocus={() => this.onFocus("firstname")}
                onBlur={() => this.onBlur("firstname")}
                focused={this.state.controls.firstname.focused}
                value={this.state.controls.firstname.value}
                onChangeText={value =>
                  this.updateInputChange("firstname", value, "")
                }
                valid={this.state.controls.firstname.valid}
                touched={this.state.controls.firstname.touched}
                autoCapitalize="words"
              />
              <CustomInput
                placeholder="Last Name"
                onFocus={() => this.onFocus("surname")}
                onBlur={() => this.onBlur("surname")}
                focused={this.state.controls.surname.focused}
                value={this.state.controls.surname.value}
                onChangeText={value =>
                  this.updateInputChange("surname", value, "")
                }
                valid={this.state.controls.surname.valid}
                touched={this.state.controls.surname.touched}
                autoCapitalize="words"
              />
              <DatePicker
                style={styles.datePicker}
                date={this.state.dob}
                androidMode="spinner"
                mode="date"
                showIcon={false}
                confirmBtnText="OK"
                cancelBtnText="CANCEL"
                //format="YYYY-MM-DD"
                format="DD-MM-YYYY"
                //maxDate="2001-01-01"
                placeholder="Date of Birth(dd/mm/yy)"
                customStyles={{
                  dateInput: {
                    alignItems: "flex-start",
                    borderColor: "transparent"
                  },
                  dateText: {
                    color: "black",
                    fontSize: 16,
                    fontFamily: "CircularStd-Book"
                  },
                  placeholderText: {
                    fontSize: 16,
                    fontFamily: "CircularStd-Book",
                    color: "#808080"
                  }
                }}
                onDateChange={date => {
                  this.updateDate(date);
                }}
              />
              {this.state.diffdate < 18 ? (
                <View>
                  <RegularText style={[styles.errormessage]}>
                    You must be more than 18 years.
                  </RegularText>
                  <IconF
                    name="exclamation-triangle"
                    size={15}
                    color="#F34235"
                    style={{ position: "absolute", right: 5, bottom: 5 }}
                  />
                </View>
              ) : null}
              <CustomInput
                placeholder="Email Address"
                onFocus={() => this.onFocus("email")}
                onBlur={() => this.onBlur("email")}
                focused={this.state.controls.email.focused}
                value={this.state.controls.email.value}
                onChangeText={value =>
                  this.updateInputChange("email", value, "")
                }
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    paddingTop: 17,
                    paddingLeft: 8,
                    position: "absolute",
                    zIndex: 1000
                  }}
                >
                  <CountryPicker
                    onChange={value => {
                      this.updateCountry(value);
                    }}
                    cca2={this.state.cca2}
                    filterable
                    closeable
                  />
                </View>

                <CustomInput
                  customstyle={{ paddingLeft: 45 }}
                  placeholder="Phone Number"
                  onFocus={() => this.onFocus("mobile")}
                  onBlur={() => this.onBlur("mobile")}
                  focused={this.state.controls.mobile.focused}
                  value={this.state.controls.mobile.value}
                  onChangeText={value =>
                    this.updateInputChange("mobile", value, "")
                  }
                  valid={this.state.controls.mobile.valid}
                  touched={this.state.controls.mobile.touched}
                  keyboardType="phone-pad"
                />
              </View>
              <View style={{ marginBottom: 15 }}>
                <Button
                  type="style.primary"
                  onPress={() => this.saveInfo()}
                  disabled={
                    !this.state.formIsValid ||
                    !this.state.dob ||
                    this.state.diffdate < 18
                  }
                  isLoading={this.props.loading}
                >
                  NEXT
                </Button>
              </View>
            </View>
          </View>
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10
            }}
          >
            <RegularText customstyle={styles.midtext}>
              Already have an account?
            </RegularText>
            <RegularText
              onPress={() => this.props.navigation.navigate("Login")}
              customstyle={[styles.midtext, { color: Colors.blue, padding: 5 }]}
            >
              Login
            </RegularText>
          </View> */}
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

const mapStateToprops = state => {
  return {
    loading: state.uiReducer.loading,
    message: state.uiReducer.message,
    formdata: state.authReducer.formdata
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveInfo: data => dispatch(actions.saveInfo(data)),
    signUp: () => dispatch(actions.signUp())
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Step1);
