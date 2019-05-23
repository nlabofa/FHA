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
import Fonts from "../../shared/Themes/Fonts";
import Snackbar from "react-native-snackbar";
import * as actions from "../../shared/store/actions/index";
import validate from "../../shared/utils/validation";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomInput from "../../components/CustomInput/CustomInput.component";
import Button from "../../components/Button/Button";
class Step4 extends Component {
  componentWillReceiveProps(nextProps) {
    // if (nextProps.message) {
    //   this.showSnackBar(nextProps.message);
    // }
  }
  state = {
    formIsValid: false,
    controls: {
      otp: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 4
        },
        // placeholderText: "FirstName",
        touched: false,
        focused: false
      }
    }
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
  sendOtp = () => {
    const formdata = {
      otp: this.state.controls.otp.value
    };
    this.props.verifyOtp(formdata);
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
          <View style={[styles.middlecontent, { marginTop: 70 }]}>
            <BoldText customstyle={styles.midhead}>
              Authenticate Account.
            </BoldText>
            <RegularText customstyle={styles.midtext}>
              Enter the activation code sent to your email address or phone
              Number to authenticate your account.
            </RegularText>

            <View style={styles.input}>
              <CustomInput
                placeholder="Enter Code"
                onFocus={() => this.onFocus("otp")}
                onBlur={() => this.onBlur("otp")}
                focused={this.state.controls.otp.focused}
                value={this.state.controls.otp.value}
                onChangeText={value => this.updateInputChange("otp", value, "")}
                valid={this.state.controls.otp.valid}
                touched={this.state.controls.otp.touched}
                secureTextEntry
              />
              <View
                style={{
                  marginBottom: 50,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <RegularText
                  customstyle={[
                    styles.midtext,
                    {
                      width: "65%",
                      textAlign: "center"
                    }
                  ]}
                >
                  By signing up you agree to our terms of use and privacy
                  policy.
                </RegularText>
              </View>

              <Button
                type="style.primary"
                onPress={() => this.sendOtp()}
                disabled={!this.state.formIsValid}
                isLoading={this.props.loading}
              >
                SIGN UP
              </Button>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <RegularText customstyle={[styles.midtext]}>
                  Didin't get OTP?
                </RegularText>
                <RegularText
                  onPress={() => this.props.resendOtp()}
                  customstyle={[
                    styles.midtext,
                    { color: Colors.blue, paddingHorizontal: 5 }
                  ]}
                >
                  {this.props.itemloading ? "Resending.." : "Click here"}
                </RegularText>
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

const mapStateToprops = state => {
  return {
    loading: state.uiReducer.loading,
    itemloading: state.uiReducer.itemloading,
    message: state.uiReducer.message,
    formdata: state.authReducer.formdata
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearMessage: () => dispatch(actions.clearMessage()),
    verifyOtp: formdata => dispatch(actions.verifyOtp(formdata)),
    resendOtp: () => dispatch(actions.resendOtp())
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Step4);
