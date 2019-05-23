import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView
} from "react-native";
import { Colors, Images } from "../../shared/Themes";
import { BoldText, MediumText, RegularText } from "../../components/AppText";
import styles from "./Registration.style";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import Snackbar from "react-native-snackbar";
import Button from "../../components/Button/Button";
import { NavigationActions, StackActions } from "react-navigation";

class Step8iii extends Component {
  componentWillReceiveProps(nextProps) {}

  nextScreen = () => {
    this.props.navigation.navigate("Home");
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
                  source={Images.activeLine}
                  style={{ marginRight: 15 }}
                  resizeMode="contain"
                />
                <Image
                  source={Images.activeLine}
                  style={{ marginRight: 15 }}
                  resizeMode="contain"
                />
              </View>
              <BoldText customstyle={styles.midhead}>Review Plan</BoldText>
              <RegularText customstyle={styles.midtext}>
                Review the details of your target plan before accepting, you can
                recalculate your plan at anytime.
              </RegularText>
            </View>
            <View style={styles.modalContent}>
              <View style={styles.box}>
                <View style={styles.rowdiv}>
                  <RegularText customstyle={{ fontSize: 14, color: "#808080" }}>
                    MONTHLY CONTRIBUTION
                  </RegularText>
                </View>

                <BoldText customstyle={{ fontSize: 35, color: Colors.blue }}>
                  {"\u20A6 " +
                    this.formatAmount(
                      mortgage && mortgage.estimatedMonthlyPament
                    )}
                </BoldText>
              </View>
              <View style={styles.box}>
                <View style={styles.rowdiv}>
                  <RegularText customstyle={{ fontSize: 14, color: "#808080" }}>
                    ESTIMATED CONTRIBUTION PERIOD
                  </RegularText>
                </View>
                <BoldText customstyle={{ fontSize: 35, color: Colors.green }}>
                  {mortgage && mortgage.savingsDuration + " Months"}
                </BoldText>
              </View>

              <View style={styles.box}>
                <View style={styles.rowdiv}>
                  <RegularText customstyle={{ fontSize: 14, color: "#808080" }}>
                    TOTAL CONTRIBUTION
                  </RegularText>
                </View>
                <BoldText customstyle={{ fontSize: 35, color: Colors.blue }}>
                  {"\u20A6 " +
                    this.formatAmount(
                      mortgage && mortgage.totalEquityContribution
                    )}
                </BoldText>
              </View>
              <View style={styles.box}>
                <View style={styles.rowdiv}>
                  <RegularText customstyle={{ fontSize: 14, color: "#808080" }}>
                    ESTIMATED MATURITY DATE
                  </RegularText>
                </View>
                <BoldText customstyle={{ fontSize: 35, color: Colors.green }}>
                  {mortgage && mortgage.maturityDate}
                </BoldText>
              </View>
              <View style={styles.box}>
                <View style={styles.rowdiv}>
                  <RegularText customstyle={{ fontSize: 14, color: "#808080" }}>
                    TOTAL LOAN AMOUNT
                  </RegularText>
                </View>
                <BoldText customstyle={{ fontSize: 35, color: Colors.blue }}>
                  {"\u20A6 " +
                    this.formatAmount(mortgage && mortgage.loanAmount)}
                </BoldText>
              </View>
              <View style={styles.box}>
                <View style={styles.rowdiv}>
                  <RegularText customstyle={{ fontSize: 14, color: "#808080" }}>
                    MAXIMUM EQUITY PERIOD
                  </RegularText>
                </View>
                <BoldText customstyle={{ fontSize: 35, color: Colors.green }}>
                  {mortgage && mortgage.loanTerm + " Years"}
                </BoldText>
              </View>
              <View
                style={{
                  width: "100%",
                  marginVertical: 20
                }}
              >
                <Button
                  type="style.primary"
                  onPress={this.nextScreen}
                  //disabled={!this.state.formIsValid}
                  //isLoading={this.state.showLoading}
                >
                  AGREE & CONTINUE
                </Button>
              </View>
              <TouchableOpacity onPress={() => navigation.pop()}>
                <BoldText
                  customstyle={{
                    color: Colors.orange,
                    textAlign: "center",
                    fontSize: 16,
                    paddingBottom: 15
                  }}
                >
                  RECALCULATE
                </BoldText>
              </TouchableOpacity>
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
    mortgage: state.authReducer.mortgage,
    formdata: state.authReducer.formdata
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveInfo: data => dispatch(actions.saveInfo(data)),
    clearMessage: () => dispatch(actions.clearMessage()),
    calculateMortgage: () => dispatch(actions.calculateMortgage())
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Step8iii);
