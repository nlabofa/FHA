import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  Linking,
  Image,
  SafeAreaView
} from "react-native";
import { Colors, Images } from "../../shared/Themes";
import { BoldText, MediumText, RegularText } from "../../components/AppText";
import styles from "./Payment.style";
import Fonts from "../../shared/Themes/Fonts";
import * as actions from "../../shared/store/actions/index";
import moment from "moment";
import IconF from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import validate from "../../shared/utils/validation";
import CustomInput from "../../components/CustomInput/CustomInput.component";
import DatePicker from "react-native-datepicker";
import Button from "../../components/Button/Button";
class Payment extends Component {
  // componentDidMount() {
  //   StatusBar.setHidden(false);
  // }
  componentWillReceiveProps(nextProps) {
    if (nextProps.message && nextProps.message.split(",")[0] == 203) {
      //open web URL
      const url = nextProps.message && nextProps.message.split(",")[2];
      console.log(url);
      if (url !== undefined) {
        this.openLink(url);
        setTimeout(() => {
          this.props.clearMessage();
        }, 1000);
      }
      setTimeout(() => {
        console.log("firing dre check");
        this.verifyOPenURL(
          nextProps.message.split(",")[0],
          nextProps.message.split(",")[1],
          nextProps.message.split(",")[3]
        );
      }, 2000);
    }
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;
    if (params && params.addcard) {
      this.setState({ addcard: true });
    }
  }
  state = {
    addcard: null,
    cardExpiry: "",
    cvv: "",
    cardNumber: "",
    cardPin: "",
    otp: "",
    phoneNumber: "",
    zipcode: "",
    city: "",
    address: "",
    statevalue: "",
    country: ""
  };
  openLink = url => {
    Linking.openURL(url);
  };
  verifyOPenURL = (status, reference, flwref) => {
    const content = { reference: reference, flwref: flwref };
    this.props.chargeCard(content, status);
  };
  chargeCard = () => {
    const status = this.props.message && this.props.message.split(",")[0];
    let content = {
      cardno: this.state.cardNumber.replace(/\s/g, ""),
      cvv: this.state.cvv,
      expirymonth: this.state.cardExpiry.split("/")[0],
      expiryyear: this.state.cardExpiry.split("/")[1],
      redirect_url: "https://firsthomesafrica.com"
    };
    if (status == 201) {
      content = {
        ...content,
        pin: this.state.cardPin,
        suggested_auth: "PIN"
      };
    } else if (status == 202) {
      content = {
        ...content,
        billingzip: this.state.zipcode,
        billingcity: this.state.city,
        billingaddress: this.state.address,
        billingstate: this.state.statevalue,
        billingcountry: this.state.country,
        suggested_auth: "NOAUTH_INTERNATIONAL"
      };
    } else if (status == 204) {
      content = {
        ...content,
        otp: this.state.otp,
        transaction_reference: this.props.message.split(",")[1]
      };
    }

    console.log(content);
    this.setState({ cardPin: "", otp: "", phoneNumber: "" });
    this.props.chargeCard(content, status);
  };
  saveInfo = () => {
    const formdata = {
      firstname: this.state.controls.firstname.value,
      lastname: this.state.controls.surname.value,
      dateOfBirth: this.state.dob
    };
    this.props.saveInfo(formdata);
    this.props.navigation.navigate("Step2");
  };
  handleCardNumber = number => {
    this.setState({
      cardNumber: number
        .replace(/\s?/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
    });
  };
  handleExpiryDate = text => {
    if (text.length === 2 && this.state.cardExpiry.length === 1) {
      text += "/";
    }
    this.setState({
      cardExpiry: text
    });
  };

  handleCVV = text => {
    this.setState({
      cvv: text
    });
  };
  saveInput = (label, value) => {
    if (label == "cardPin") {
      this.setState({ cardPin: value });
    } else if (label == "otp") {
      this.setState({ otp: value });
    } else if (label == "phoneNumber") {
      this.setState({ phoneNumber: value });
    } else if (label == "zipcode") {
      this.setState({ zipcode: value });
    } else if (label == "city") {
      this.setState({ city: value });
    } else if (label == "address") {
      this.setState({ address: value });
    } else if (label == "statevalue") {
      this.setState({ statevalue: value });
    } else if (label == "country") {
      this.setState({ country: value });
    }
  };
  render() {
    const { addcard } = this.state;
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
            <BoldText customstyle={styles.midhead}>
              {addcard !== null ? "Add New Card" : "Setup Payment."}
            </BoldText>
            <RegularText customstyle={styles.midtext}>
              Add your payment details to begin saving.
            </RegularText>

            <View style={styles.input}>
              <TextInput
                placeholder="Card Number"
                value={this.state.cardNumber}
                onChangeText={this.handleCardNumber}
                style={[styles.formControl]}
                underlineColorAndroid="transparent"
                placeholderTextColor="#808ecc"
                keyboardType="numeric"
                textContentType="creditCardNumber"
              />
            </View>
            <View style={styles.input}>
              <TextInput
                placeholder="Expiry Date"
                value={this.state.cardExpiry}
                onChangeText={this.handleExpiryDate}
                style={[styles.formControlShort]}
                underlineColorAndroid="transparent"
                placeholderTextColor="#808ecc"
                keyboardType="numeric"
                maxLength={5}
              />
              <TextInput
                placeholder="CVV"
                value={this.state.cvv}
                onChangeText={this.handleCVV}
                style={[styles.formControlShort]}
                underlineColorAndroid="transparent"
                placeholderTextColor="#808ecc"
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
            {this.props.message && this.props.message.split(",")[0] == 201 ? (
              <View style={{ width: "100%", marginTop: 20 }}>
                <TextInput
                  placeholder="Enter Your Card Pin"
                  value={this.state.cardPin}
                  onChangeText={val => this.saveInput("cardPin", val)}
                  style={[styles.formControl]}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808ecc"
                  keyboardType="numeric"
                  secureTextEntry
                />
              </View>
            ) : this.props.message &&
              this.props.message.split(",")[0] == 202 ? (
              <View style={{ width: "100%", marginTop: 20 }}>
                <TextInput
                  style={[styles.formControl, { marginBottom: 20 }]}
                  underlineColorAndroid="transparent"
                  placeholder="Enter Zip Code"
                  onChangeText={val => this.saveInput("zipcode", val)}
                  keyboardType="numeric"
                  placeholderTextColor="#808ecc"
                  value={this.state.zipcode}
                />
                <TextInput
                  style={[styles.formControl, { marginBottom: 20 }]}
                  underlineColorAndroid="transparent"
                  placeholder="Enter Your City"
                  onChangeText={val => this.saveInput("city", val)}
                  placeholderTextColor="#808ecc"
                  value={this.state.city}
                />
                <TextInput
                  style={[styles.formControl, { marginBottom: 20 }]}
                  underlineColorAndroid="transparent"
                  placeholder="Enter Your Address"
                  onChangeText={val => this.saveInput("address", val)}
                  placeholderTextColor="#808ecc"
                  value={this.state.address}
                />
                <TextInput
                  style={[styles.formControl, { marginBottom: 20 }]}
                  underlineColorAndroid="transparent"
                  placeholder="Enter Your State"
                  onChangeText={val => this.saveInput("statevalue", val)}
                  placeholderTextColor="#808ecc"
                  value={this.state.statevalue}
                />
                <TextInput
                  style={[styles.formControl, { marginBottom: 20 }]}
                  underlineColorAndroid="transparent"
                  placeholder="Enter Your Country"
                  onChangeText={val => this.saveInput("country", val)}
                  placeholderTextColor="#808ecc"
                  value={this.state.country}
                />
              </View>
            ) : this.props.message &&
              this.props.message.split(",")[0] == 204 ? (
              <View style={{ width: "100%", marginTop: 20 }}>
                <TextInput
                  style={styles.formControl}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="rgba(0, 0, 0, 0.5)"
                  placeholder="Enter OTP "
                  onChangeText={val => this.saveInput("otp", val)}
                  keyboardType="numeric"
                  placeholderTextColor={"rgba(255,255,255,.6)"}
                  value={this.state.otp}
                  secureTextEntry={false}
                />
              </View>
            ) : null}
            <View style={{ marginTop: 30, marginBottom: 10, width: "100%" }}>
              <Button
                type="style.white"
                onPress={() => this.chargeCard()}
                disabled={
                  !this.state.cardNumber ||
                  !this.state.cvv ||
                  !this.state.cardExpiry
                }
                isLoading={this.props.loading}
              >
                {addcard !== null ? "Add Card" : "Add and start Saving"}
              </Button>
            </View>
          </View>
        </ScrollView>
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
    chargeCard: (data, status) => dispatch(actions.chargeCard(data, status))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Payment);
