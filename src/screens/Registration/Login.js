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
import { BoldText, MediumText, RegularText } from "../../components/AppText";
import styles from "./Registration.style";
import Fonts from "../../shared/Themes/Fonts";
import * as actions from "../../shared/store/actions/index";
import moment from "moment";
import { NavigationActions, StackActions } from "react-navigation";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import validate from "../../shared/utils/validation";
import CustomInput from "../../components/CustomInput/CustomInput.component";
import Snackbar from "react-native-snackbar";
import Button from "../../components/Button/Button";
class Login extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.message && nextProps.message.split(",")[0] == 401) {
      this.resetTo("Step4");
    } else if (nextProps.message && nextProps.message.split(",")[0] == 400) {
      this.showSnackBar(nextProps.message.split(",")[1]);
    }
    if (nextProps.userinfo && nextProps.userinfo.hasMadeFirstPayment == true) {
      this.props.navigation.navigate("Home");
    }
    if (nextProps.userinfo && nextProps.userinfo.hasMadeFirstPayment == false) {
      this.resetTo("Step6");
    }
  }
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
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
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
  updateDate = date => {
    var years = moment().diff(date, "years");
    console.log(years);
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
  saveInfo = () => {
    const formdata = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.signIn(formdata);
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
          <View style={[styles.middlecontent]}>
            <BoldText customstyle={styles.midhead}>Welcome Back!</BoldText>
            <RegularText customstyle={styles.midtext}>
              Login to your account.
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
              <View style={{ position: "relative" }}>
                <CustomInput
                  placeholder="Password"
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
                  autoCapitalize="none"
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
              <View style={{ marginTop: 30 }}>
                <Button
                  type="style.primary"
                  onPress={() => this.saveInfo()}
                  disabled={!this.state.formIsValid}
                  isLoading={this.props.loading}
                >
                  LOGIN
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

const mapStateToprops = state => {
  return {
    loading: state.uiReducer.loading,
    message: state.uiReducer.message,
    formdata: state.authReducer.formdata,
    userinfo: state.authReducer.userinfo
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signIn: data => dispatch(actions.signIn(data)),
    clearMessage: () => dispatch(actions.clearMessage())
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Login);
