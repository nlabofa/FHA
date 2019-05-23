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
import IconF from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationActions, StackActions } from "react-navigation";
import DatePicker from "react-native-datepicker";
import Button from "../../components/Button/Button";
class RecurrentDay extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.message === "200") {
      this.resetTo("Home");
    }
  }
  state = {
    day: ""
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
  updateDate = date => {
    this.setState({ day: date });
  };
  reverseDate(str) {
    var arr = str.split("-");
    arr.reverse();
    str = arr.join("-");
    return str;
  }
  saveInfo = () => {
    const data = {
      date: this.reverseDate(this.state.day)
    };
    console.log(data);
    this.props.setRecurrentDay(data);
  };
  render() {
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
            <BoldText customstyle={styles.midhead}>Monthly Recurrent </BoldText>
            <RegularText customstyle={styles.midtext}>
              Choose the day of the month you will like us to charge your card.
            </RegularText>

            <View style={styles.input}>
              <DatePicker
                style={styles.dateControl}
                date={this.state.day}
                mode="date"
                showIcon={true}
                confirmBtnText="OK"
                cancelBtnText="CANCEL"
                format="DD-MM-YYYY"
                minDate={new Date()}
                maxDate={moment(new Date(), "MM/DD/YYYY")
                  .add(1, "M")
                  .endOf("month")}
                placeholder="Choose Date"
                customStyles={{
                  dateInput: {
                    alignItems: "flex-start",
                    borderColor: "transparent"
                  },
                  dateText: {
                    color: "white",
                    fontSize: 16,
                    fontFamily: "CircularStd-Book"
                  },
                  placeholderText: {
                    fontSize: 16,
                    fontFamily: "CircularStd-Book",
                    color: "#808ecc"
                  }
                }}
                onDateChange={date => {
                  this.updateDate(date);
                }}
              />
            </View>

            <View style={{ marginTop: 30, marginBottom: 10, width: "100%" }}>
              <Button
                type="style.white"
                onPress={() => this.saveInfo()}
                disabled={!this.state.day}
                isLoading={this.props.loading}
              >
                PROCEED
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
    setRecurrentDay: data => dispatch(actions.setRecurrentDay(data)),
    clearMessage: () => dispatch(actions.clearMessage())
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(RecurrentDay);
