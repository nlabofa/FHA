import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Text,
  Image,
  SafeAreaView
} from "react-native";
import { Colors, Images } from "../../shared/Themes";
import { BoldText, MediumText, RegularText } from "../../components/AppText/";
import styles from "./Registration.style";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import Fonts from "../../shared/Themes/Fonts";
import validate from "../../shared/utils/validation";
import Ionicons from "react-native-vector-icons/Ionicons";
import CountryPicker from "react-native-country-picker-modal";
import CustomInput from "../../components/CustomInput/CustomInput.component";
import Button from "../../components/Button/Button";
class Step2 extends Component {
  state = {
    cca2: "NG",
    callingCode: "",
    formIsValid: false,
    controls: {
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
  saveInfo = () => {
    const formdata = {
      email: this.state.controls.email.value,
      phoneNumber: this.state.controls.mobile.value,
      countryCode: this.state.cca2
    };
    this.props.saveInfo(formdata);
    this.props.navigation.navigate("Step3");
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
  updateCountry = value => {
    console.log(value);
    this.setState({
      cca2: value.cca2
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
          <View style={styles.middlecontent}>
            <BoldText customstyle={styles.midhead}>Get Started</BoldText>
            <RegularText customstyle={styles.midtext}>
              Provide an Email Address and Phone Number.
            </RegularText>

            <View style={styles.input}>
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

              <Button
                type="style.primary"
                onPress={() => this.saveInfo()}
                disabled={!this.state.formIsValid}
                //isLoading={this.state.showLoading}
              >
                NEXT
              </Button>
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

const mapStateToprops = state => {
  return {
    loading: state.uiReducer.loading,
    message: state.uiReducer.message,
    formdata: state.authReducer.formdata
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveInfo: data => dispatch(actions.saveInfo(data))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Step2);
