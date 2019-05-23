import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Text,
  Image,
  SafeAreaView
} from "react-native";
import { Colors, Images } from "../../shared/Themes";
import {
  BoldText,
  MediumText,
  RegularText,
  SemiBoldText
} from "../../components/AppText/";
import styles from "./Homescreen.style";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import moment from "moment";
import CustomInput from "../../components/CustomInput/CustomInput.component";
import Button from "../../components/Button/Button";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Ionicons from "react-native-vector-icons/Ionicons";

const HOUSE_DATE = 15;

class HomeScreen extends Component {
  state = {
    activetab: "deposit",
    referralemail: "",
    points: null,
    total: null,
    count_down_date: 100
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.usercontribution &&
      this.props.usercontribution.equityContribution
    ) {
      this.setState({
        points: Math.floor(this.props.usercontribution.equityContribution.paid),
        total: Math.floor(this.props.usercontribution.equityContribution.total)
      });
    }
  }
  toggleTab = value => {
    this.setState({ activetab: value });
  };
  componentDidMount() {
    this.props.getUserInfo();
    this.props.getUserContributions();
    this.props.getContractualDetails();
    this.props.getUserCards();
    this.props.getUserDeposits();
    this.props.getUserWithdrawals();
  }
  capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  updateDate = date => {
    var eventdate = moment(date, "YYYY-MM-DD");
    var todaysdate = moment();
    var monthsequiv = eventdate.diff(todaysdate, "months");
    var daysequiv = eventdate.diff(todaysdate, "days");
    return monthsequiv + "Mth : " + (daysequiv % 7) + "D";
    //return eventdate.diff(todaysdate, "months");

    // var currDay = moment();
    // var birthday = moment(date);
    // console.log(currDay + " " + birthday);
    // var diff = moment.duration(birthday.diff(currDay));
    // return diff.months() + "Mth : " + (diff.days() % 7) + "D";
  };
  returnDays = date => {
    var eventdate = moment(date, "YYYY-MM-DD");
    var todaysdate = moment();
    var daysequiv = eventdate.diff(todaysdate, "days");
    return daysequiv + " days";
  };
  determineGauge = point => {
    if (point == 0) {
      return <Image source={Images.gauge0} resizeMode="contain" />;
    } else if (point > 0 && point <= 1600) {
      return <Image source={Images.gauge20} resizeMode="contain" />;
    } else if (point > 1600 && point <= 3200) {
      return <Image source={Images.gauge40} resizeMode="contain" />;
    } else if (point > 3200 && point <= 4800) {
      return <Image source={Images.gauge60} resizeMode="contain" />;
    } else if (point > 4800 && point <= 6400) {
      return <Image source={Images.gauge80} resizeMode="contain" />;
    } else if (point > 6400 && point <= 7999) {
      return <Image source={Images.gauge85} resizeMode="contain" />;
    } else if (point == 8000) {
      return <Image source={Images.gauge90} resizeMode="contain" />;
    } else if (point > 8000 && point <= 9600) {
      return <Image source={Images.gauge100} resizeMode="contain" />;
    } else if (point > 9600 && point <= 1120) {
      return <Image source={Images.gauge120} resizeMode="contain" />;
    } else if (point > 1120 && point <= 1280) {
      return <Image source={Images.gauge140} resizeMode="contain" />;
    } else if (point > 1280 && point <= 1440) {
      return <Image source={Images.gauge160} resizeMode="contain" />;
    } else if (point > 1440 && point <= 1600) {
      return <Image source={Images.gauge180} resizeMode="contain" />;
    }
  };
  sendReferral = () => {
    if (this.state.referralemail.includes(",")) {
      let formdata = { emails: this.state.referralemail.split(",") };
      this.props.sendReferral(formdata);
      this.setState({ emails: "" });
      return;
    } else {
      const formdata = {
        emails: this.state.referralemail
      };
      this.props.sendReferral(formdata);
      this.setState({ emails: "" });
    }
  };
  formatAmount = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  formatMillion = num => {
    return num > 999999 ? (num / 1000000).toFixed(1) + "m" : num;
  };
  render() {
    const {
      navigation,
      userinfo,
      usercontribution,
      userdeposit,
      userwithdrawal,
      contractualinfo
    } = this.props;
    const fill = parseInt((this.state.points / this.state.total) * 100);
    const housedate = (this.state.count_down_date / HOUSE_DATE) * 100;

    return (
      <SafeAreaView style={styles.container}>
        {this.props.loading || !this.props.userinfo ? (
          <View style={styles.progressbar}>
            <ActivityIndicator size="large" color={Colors.blue} />
          </View>
        ) : this.props.userinfo && !this.props.userinfo.hasMadeFirstPayment ? (
          <EmptyCard
            navigation={this.props.navigation}
            userinfo={this.props.userinfo}
          />
        ) : (
          <ScrollView style={styles.containerdiv}>
            {usercontribution &&
            Object.entries(usercontribution.withdrawal).length !== 0 ? (
              <View style={styles.savingsreminder}>
                <RegularText customstyle={{ color: Colors.base, fontSize: 15 }}>
                  You have{" "}
                  {this.returnDays(usercontribution.withdrawal.returnDate)} left
                  to repay {"\u20A6"}{" "}
                  {this.formatAmount(
                    usercontribution.withdrawal.withdrawalAmount
                  )}
                </RegularText>
                <TouchableOpacity
                  onPress={() => navigation.navigate("PayNow")}
                  style={styles.viewbox}
                >
                  <RegularText
                    customstyle={{ color: Colors.base, fontSize: 12 }}
                  >
                    PAY NOW
                  </RegularText>
                </TouchableOpacity>
              </View>
            ) : null}

            <View style={styles.topfixed}>
              <BoldText customstyle={styles.headtext}>
                Hi {userinfo && userinfo.firstname},
              </BoldText>
              <View style={{ flexDirection: "row" }}>
                {/* <Image source={Images.housechore} resizeMode="contain" /> */}
                {this.state.points ? (
                  <AnimatedCircularProgress
                    size={40}
                    width={4}
                    fill={housedate}
                    tintColor={Colors.blue}
                    backgroundColor="#E5ECF9"
                    rotation={180}
                  >
                    {housedate => (
                      <Image
                        source={Images.housechore2}
                        resizeMode="cover"
                        //size={{ position: "absolute" }}
                      />
                    )}
                  </AnimatedCircularProgress>
                ) : null}

                <TouchableOpacity style={styles.daysbox}>
                  <BoldText customstyle={{ color: Colors.blue, fontSize: 15 }}>
                    {this.updateDate(
                      usercontribution && usercontribution.countDownDate
                    )}
                  </BoldText>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("ContractualDetail")}
              style={[styles.bigcard]}
            >
              <View>
                <BoldText customstyle={styles.headercard}>
                  TOTAL CONTRACTUAL EQUITY
                </BoldText>
                <SemiBoldText
                  customstyle={{ color: "white", fontSize: 25, paddingTop: 5 }}
                >
                  {"\u20A6"}
                  {usercontribution &&
                    this.formatAmount(usercontribution.equityContribution.paid)}
                </SemiBoldText>
              </View>
              {/* <Image source={Images.springbox} resizeMode="contain" /> */}
              {this.state.points ? (
                <AnimatedCircularProgress
                  size={55}
                  width={7}
                  fill={fill}
                  tintColor="#fff"
                  backgroundColor="#82ACFA"
                  rotation={180}
                >
                  {fill => (
                    <RegularText customstyle={{ color: "#fff" }}>
                      {fill + "%"}
                    </RegularText>
                  )}
                </AnimatedCircularProgress>
              ) : null}

              <Ionicons name="md-play" size={30} color="#fff" />
            </TouchableOpacity>
            {/* <View style={[styles.bigcard]}>
              <RegularText customstyle={styles.headercard}>
                YOUR MATURITY DATE
              </RegularText>
              <View style={styles.headbottom}>
                <SemiBoldText customstyle={{ color: "white", fontSize: 25 }}>
                  {usercontribution && usercontribution.maturityDate}
                </SemiBoldText>
              </View>
            </View> */}
            <View style={[styles.bigcard]}>
              <View>
                <BoldText customstyle={styles.headercard}>
                  VOLUNTARY EQUITY
                </BoldText>
                <SemiBoldText
                  customstyle={{ color: "white", fontSize: 25, paddingTop: 5 }}
                >
                  {"\u20A6"}
                  {usercontribution &&
                    this.formatAmount(usercontribution.voluntaryContribution)}
                </SemiBoldText>
              </View>
            </View>
            <View style={[styles.bigcard]}>
              <View>
                <BoldText customstyle={styles.headercard}>
                  MATCHING BONUS
                </BoldText>
                <SemiBoldText
                  customstyle={{ color: "white", fontSize: 25, paddingTop: 5 }}
                >
                  {"\u20A6"}
                  {usercontribution &&
                    this.formatAmount(usercontribution.matchingBonus)}
                </SemiBoldText>
              </View>
            </View>
            {/* <View style={[styles.bigcard]}>
              <RegularText customstyle={styles.headercard}>
                MORTGAGE POINTS
              </RegularText>
              <View style={styles.headbottom}>
                <SemiBoldText customstyle={{ color: "white", fontSize: 25 }}>
                  {usercontribution &&
                    this.formatAmount(usercontribution.morgagePoints)}
                  <RegularText>points</RegularText>
                </SemiBoldText>
              </View>
              <View style={styles.headlow}>
                <Image source={Images.progressbar} style={{ marginTop: 15 }} />
                <SemiBoldText customstyle={styles.absprice}>
                  {usercontribution &&
                    this.formatAmount(usercontribution.totalMortgagePoints) +
                      " points Total"}
                </SemiBoldText>
              </View>
            </View> */}
            {/* <View style={[styles.bigcard]}>
              <RegularText customstyle={styles.headercard}>
                REWARD CONTRIBUTION
              </RegularText>
              <View style={styles.headbottom}>
                <SemiBoldText customstyle={{ color: "white", fontSize: 25 }}>
                  {"\u20A6"}
                  {usercontribution &&
                    this.formatAmount(usercontribution.rewardContribution)}
                </SemiBoldText>
              </View>
            </View> */}
            <View style={[styles.bigcard]}>
              <View>
                <BoldText customstyle={styles.headercard}>
                  TOTAL EQUITY
                </BoldText>
                <SemiBoldText
                  customstyle={{ color: "white", fontSize: 25, paddingTop: 5 }}
                >
                  {"\u20A6"}
                  {usercontribution &&
                    this.formatAmount(usercontribution.totalContribution)}
                </SemiBoldText>
              </View>
            </View>
            <View style={[styles.referralview]}>
              {this.determineGauge(
                usercontribution && usercontribution.morgagePoints
              )}
              <BoldText customstyle={styles.gaugetext}>
                {usercontribution && usercontribution.morgagePoints}
              </BoldText>
              <RegularText customstyle={styles.gaugeabstext}>
                {usercontribution && usercontribution.morgagePoints == 8000
                  ? "You’re halfway there! Keep it up!"
                  : "Perform transactions to increase points!"}
              </RegularText>
            </View>
            {this.state.activetab == "withdrawal" ? (
              <View style={styles.bottomcard}>
                <View style={styles.bottomhead}>
                  <TouchableOpacity
                    onPress={() => this.toggleTab("deposit")}
                    style={[
                      styles.headcard,
                      this.state.activetab == "deposit"
                        ? styles.activetab
                        : null
                    ]}
                  >
                    <RegularText
                      customstyle={[
                        styles.tabtext,
                        this.state.activetab == "deposit"
                          ? styles.activetabtext
                          : null
                      ]}
                    >
                      Deposits
                    </RegularText>
                    <BoldText
                      customstyle={[
                        styles.label,
                        this.state.activetab == "deposit"
                          ? styles.activetablabel
                          : null
                      ]}
                    >
                      {userdeposit && userdeposit.length}
                    </BoldText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.toggleTab("withdrawal")}
                    style={[
                      styles.headcard,
                      this.state.activetab == "withdrawal"
                        ? styles.activetab
                        : null
                    ]}
                  >
                    <RegularText
                      customstyle={[
                        styles.tabtext,
                        this.state.activetab == "withdrawal"
                          ? styles.activetabtext
                          : null
                      ]}
                    >
                      Withdrawals
                    </RegularText>
                    <BoldText
                      customstyle={[
                        styles.label,
                        this.state.activetab == "withdrawal"
                          ? styles.activetablabel
                          : null
                      ]}
                    >
                      {userwithdrawal && userwithdrawal.length}
                    </BoldText>
                  </TouchableOpacity>
                </View>
                {userwithdrawal.length > 0 ? (
                  userwithdrawal.map((value, index) => (
                    <View key={index} style={styles.listItem}>
                      <Image
                        source={Images.markicon}
                        style={{ width: 50, height: 50 }}
                      />
                      <View style={{ marginLeft: 15 }}>
                        <MediumText
                          customstyle={{ color: Colors.base, paddingBottom: 5 }}
                        >
                          {value && this.capitalize(value.typeOfWithdrawal)}{" "}
                          Withdrawal
                        </MediumText>
                        <BoldText customstyle={{ color: "#0A0D1C" }}>
                          NGN {value && this.formatAmount(value.amount)}
                        </BoldText>
                      </View>
                      <MediumText customstyle={styles.absdate}>
                        {value && value.withdrawalDate}
                      </MediumText>
                    </View>
                  ))
                ) : (
                  <BoldText
                    customstyle={{ marginTop: 20, textAlign: "center" }}
                  >
                    No withdrawal has been made
                  </BoldText>
                )}
              </View>
            ) : this.state.activetab == "deposit" ? (
              <View style={styles.bottomcard}>
                <View style={styles.bottomhead}>
                  <TouchableOpacity
                    onPress={() => this.toggleTab("deposit")}
                    style={[
                      styles.headcard,
                      this.state.activetab == "deposit"
                        ? styles.activetab
                        : null
                    ]}
                  >
                    <RegularText
                      customstyle={[
                        styles.tabtext,
                        this.state.activetab == "deposit"
                          ? styles.activetabtext
                          : null
                      ]}
                    >
                      Deposits
                    </RegularText>
                    <BoldText
                      customstyle={[
                        styles.label,
                        this.state.activetab == "deposit"
                          ? styles.activetablabel
                          : null
                      ]}
                    >
                      {userdeposit && userdeposit.length}
                    </BoldText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.toggleTab("withdrawal")}
                    style={[
                      styles.headcard,
                      this.state.activetab == "withdrawal"
                        ? styles.activetab
                        : null
                    ]}
                  >
                    <RegularText
                      customstyle={[
                        styles.tabtext,
                        this.state.activetab == "withdrawal"
                          ? styles.activetabtext
                          : null
                      ]}
                    >
                      Withdrawals
                    </RegularText>
                    <BoldText
                      customstyle={[
                        styles.label,
                        this.state.activetab == "withdrawal"
                          ? styles.activetablabel
                          : null
                      ]}
                    >
                      {userwithdrawal && userwithdrawal.length}
                    </BoldText>
                  </TouchableOpacity>
                </View>

                {userdeposit && userdeposit.length > 0 ? (
                  userdeposit.map((value, index) => (
                    <View key={index} style={styles.listItem}>
                      <Image
                        source={Images.markicon}
                        style={{ width: 50, height: 50 }}
                      />
                      <View style={{ marginLeft: 15 }}>
                        <MediumText
                          customstyle={{ color: Colors.base, paddingBottom: 5 }}
                        >
                          {value && this.capitalize(value.type)} Contribution
                        </MediumText>
                        <BoldText customstyle={{ color: "#0A0D1C" }}>
                          NGN {value && this.formatAmount(value.depositAmount)}
                        </BoldText>
                      </View>
                      <MediumText customstyle={styles.absdate}>
                        {value && value.depositDate}
                      </MediumText>
                    </View>
                  ))
                ) : (
                  <BoldText
                    customstyle={{ marginTop: 20, textAlign: "center" }}
                  >
                    No deposit has been made
                  </BoldText>
                )}
              </View>
            ) : (
              <BoldText customstyle={{ marginTop: 20, textAlign: "center" }}>
                no transaction has been made at this time
              </BoldText>
            )}
            {/* <View style={styles.referralview2}>
              <View>
                <SemiBoldText
                  customstyle={{
                    color: "#000",
                    fontSize: 19,
                    paddingVertical: 15
                  }}
                >
                  Gain extra points
                </SemiBoldText>
                <RegularText customstyle={{ color: Colors.base }}>
                  Invite a friend to first homes and gain 5 mortgage points!
                </RegularText>
                <View style={styles.input}>
                  <View style={{ width: "75%" }}>
                    <CustomInput
                      placeholder="Email"
                      value={this.state.referralemail}
                      onChangeText={value =>
                        this.setState({ referralemail: value })
                      }
                    />
                  </View>
                  <TouchableOpacity
                    disabled={!this.state.referralemail}
                    onPress={() => this.sendReferral()}
                    style={styles.referbutton}
                  >
                    {this.props.itemloading ? (
                      <BoldText customstyle={{ color: "#fff" }}>
                        LOADING..
                      </BoldText>
                    ) : (
                      <BoldText customstyle={{ color: "#fff" }}>REFER</BoldText>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View> */}
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToprops = state => {
  return {
    loading: state.uiReducer.loading,
    itemloading: state.uiReducer.itemloading,
    message: state.uiReducer.message,
    userinfo: state.authReducer.userinfo,
    usercontribution: state.authReducer.usercontribution,
    contractualinfo: state.authReducer.contractualinfo,
    userdeposit: state.authReducer.userdeposit,
    userwithdrawal: state.authReducer.userwithdrawal
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => dispatch(actions.getUserInfo()),
    getUserCards: () => dispatch(actions.getUserCards()),
    getUserContributions: () => dispatch(actions.getUserContributions()),
    getContractualDetails: () => dispatch(actions.getContractualDetails()),
    getUserDeposits: () => dispatch(actions.getUserDeposits()),
    getUserWithdrawals: () => dispatch(actions.getUserWithdrawals()),
    sendReferral: data => dispatch(actions.sendReferral(data))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(HomeScreen);
