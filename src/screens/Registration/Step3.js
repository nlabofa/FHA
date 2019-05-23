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
import { connect } from "react-redux";
import validate from "../../shared/utils/validation";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomInput from "../../components/CustomInput/CustomInput.component";
import Button from "../../components/Button/Button";
import { NavigationActions, StackActions } from "react-navigation";
class Step3 extends Component {
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.message && nextProps.message !== 200) {
  //     //this.showSnackBar(nextProps.message);
  //     alert(nextProps.message);
  //   } else if (nextProps.message && nextProps.message == 200) {
  //     this.resetTo("Step5");
  //   }
  //}
  state = {
    formIsValid: false,
    controls: {
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        //placeholderText: "Enter Email|Phone|PIN",
        touched: false,
        focused: false
      },
      confirmpassword: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
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
  saveInfo = () => {
    const formdata = {
      password: this.state.controls.password.value,
      confirmPassword: this.state.controls.confirmpassword.value
    };
    //this.props.saveInfo(formdata);
    this.props.addPassword(formdata);
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
              Create a Secure Password.
            </RegularText>

            <View style={styles.input}>
              <View style={{ position: "relative", marginBottom: 20 }}>
                <CustomInput
                  placeholder="Create Password"
                  onFocus={() => this.onFocus("password")}
                  onBlur={() => this.onBlur("password")}
                  focused={this.state.controls.password.focused}
                  value={this.state.controls.password.value}
                  onChangeText={value =>
                    this.updateInputChange("password", value, "")
                  }
                  valid={this.state.controls.password.valid}
                  touched={this.state.controls.password.touched}
                  secureTextEntry
                />
                <RegularText
                  customstyle={{
                    position: "absolute",
                    fontSize: 10,
                    bottom: 0
                  }}
                >
                  Password must not be less than 6 characters
                </RegularText>
              </View>

              <CustomInput
                placeholder="Re-enter password"
                onFocus={() => this.onFocus("confirmpassword")}
                onBlur={() => this.onBlur("confirmpassword")}
                focused={this.state.controls.confirmpassword.focused}
                value={this.state.controls.confirmpassword.value}
                onChangeText={value =>
                  this.updateInputChange("confirmpassword", value, "")
                }
                valid={
                  this.state.controls.confirmpassword.valid &&
                  this.state.controls.password.value ==
                    this.state.controls.confirmpassword.value
                }
                touched={this.state.controls.confirmpassword.touched}
                secureTextEntry
              />
              {this.state.controls.confirmpassword.touched &&
              this.state.controls.password.value !==
                this.state.controls.confirmpassword.value ? (
                <View>
                  <RegularText style={[styles.errormessage]}>
                    Password does not match
                  </RegularText>
                  <Icon
                    name="exclamation-triangle"
                    size={15}
                    color={Colors.errormessage}
                    style={{ position: "absolute", right: 5, bottom: 5 }}
                  />
                </View>
              ) : null}
              <Button
                type="style.primary"
                onPress={() => this.saveInfo()}
                disabled={!this.state.formIsValid}
                isLoading={this.props.loading}
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
    saveInfo: data => dispatch(actions.saveInfo(data)),
    clearMessage: () => dispatch(actions.clearMessage()),
    addPassword: data => dispatch(actions.addPassword(data))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Step3);
