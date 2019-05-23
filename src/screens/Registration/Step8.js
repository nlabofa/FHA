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
import Fonts from "../../shared/Themes/Fonts";
import NumberFormat from "react-number-format";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import Snackbar from "react-native-snackbar";
import Button from "../../components/Button/Button";
import { NavigationActions, StackActions } from "react-navigation";

class Step8 extends Component {
  state = {
    price: "",
    showprice: false
  };
  nextScreen = () => {
    this.setState({ isModalVisible: false }, () =>
      this.props.navigation.navigate("Home")
    );
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
  saveInfo = () => {
    this.setState({ showprice: true });
  };
  goNext = () => {
    const formdata = {
      housePrice: this.state.price.replace(/,/g, "") * 100
    };
    this.props.saveInfo(formdata);
    this.props.navigation.navigate("Step8ii");
  };
  formatAmount = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    const { navigation, mortgage } = this.props;
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
                  source={Images.lightLine}
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
                Set a Monthly Target
              </BoldText>
              <RegularText customstyle={styles.midtext}>
                Enter an estimated amount you can save monthly to calculate the
                maximmum property value you’re eligible to.
              </RegularText>

              <View style={styles.inputmortgage}>
                <RegularText customstyle={styles.bottext}>
                  * Amount shouldn’t be more than a {"\n  "} third of your
                  monthly income
                </RegularText>
                <View style={styles.mortgageinput}>
                  {/* <Image source={Images.naira} style={styles.nairaicon} /> */}
                  <Image source={Images.naira2} style={styles.nairaicon} />
                  <NumberFormat
                    value={this.state.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={amount => (
                      <TextInput
                        placeholder="50,000"
                        onBlur={() => this.saveInfo()}
                        value={amount}
                        onChangeText={value => this.setState({ price: value })}
                        style={[styles.formControl]}
                        underlineColorAndroid="transparent"
                        placeholderTextColor={Colors.blue}
                        keyboardType="number-pad"
                      />
                    )}
                  />
                  {!this.state.showprice ? (
                    <View style={{ marginTop: 30 }}>
                      <Button
                        type="style.special"
                        onPress={() => this.saveInfo()}
                        disabled={!this.state.price}
                        isLoading={this.props.loading}
                      >
                        NEXT
                      </Button>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {this.state.showprice ? (
          <View>
            <View style={styles.colordiv}>
              <RegularText customstyle={[styles.postext]}>
                Based on a monthly saving amount of{" "}
                <BoldText customstyle={[styles.postext]}>
                  NGN {this.formatAmount(this.state.price.replace(/,/g, ""))}
                </BoldText>{" "}
                ; the maximmum property value you’re eligible to as loan is:
              </RegularText>
              <View
                style={{
                  backgroundColor: "#0936EF",
                  padding: 18,
                  borderRadius: 4
                }}
              >
                <BoldText customstyle={[styles.smtext]}>
                  NGN{" "}
                  {this.formatAmount(this.state.price.replace(/,/g, "") * 100)}
                </BoldText>
              </View>
            </View>
            <TouchableOpacity onPress={this.goNext}>
              <BoldText
                customstyle={{
                  color: Colors.blue,
                  textAlign: "center",
                  fontSize: 18,
                  paddingBottom: 15
                }}
              >
                NEXT
              </BoldText>
            </TouchableOpacity>
          </View>
        ) : null}
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
    clearMessage: () => dispatch(actions.clearMessage())
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Step8);
