import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView
} from "react-native";
import { Colors, Images } from "../../shared/Themes";
import {
  BoldText,
  MediumText,
  RegularText,
  SemiBoldText
} from "../../components/AppText";
import styles from "./Walletscreen.style";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import Cards from "../../components/Cards/Cards";
class WalletScreen extends Component {
  componentDidMount() {
    // this.props.getUserDeposits();
    // this.props.getUserWithdrawals();
  }
  state = {
    activetab: "deposit",
    activeid: ""
  };
  toggleTab = value => {
    this.setState({ activetab: value });
  };
  capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  showModal = (id, last4) => {
    this.setState({ activeid: id });
    Alert.alert(
      "Confirm!",
      `Are you sure you want to delete card **** **** **** ${last4}`,
      [
        {
          text: "Confirm",
          onPress: () => this.props.deleteCard(id)
        },
        {
          text: "Cancel",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ]
    );
  };
  formatAmount = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerdiv}>
          <BoldText customstyle={{ fontSize: 24, color: "white" }}>
            Vault
          </BoldText>
          <RegularText
            customstyle={{ fontSize: 14, color: "white", paddingVertical: 10 }}
          >
            View all transactions and manage your cards.
          </RegularText>
        </View>
        {this.props.loading || !this.props.userdeposit ? (
          <View style={styles.progressbar}>
            <ActivityIndicator size="large" color={Colors.blue} />
          </View>
        ) : this.props.userinfo && !this.props.userinfo.hasMadeFirstPayment ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff"
            }}
          >
            <MediumText customstyle={{ color: "#0A0D1C" }}>
              No contribution/withdrawal has been made
            </MediumText>
          </View>
        ) : (
          <ScrollView style={styles.containerdiv}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.bottomhead}
            >
              <TouchableOpacity
                onPress={() => this.toggleTab("deposit")}
                style={[
                  styles.headcard,
                  this.state.activetab == "deposit" ? styles.activetab : null
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
                  {this.props.userdeposit && this.props.userdeposit.length}
                </BoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.toggleTab("withdrawal")}
                style={[
                  styles.headcard,
                  this.state.activetab == "withdrawal" ? styles.activetab : null
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
                  {this.props.userwithdrawal &&
                    this.props.userwithdrawal.length}
                </BoldText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.toggleTab("card")}
                style={[
                  styles.headcard,
                  this.state.activetab == "card" ? styles.activetab : null
                ]}
              >
                <RegularText
                  customstyle={[
                    styles.tabtext,
                    this.state.activetab == "card" ? styles.activetabtext : null
                  ]}
                >
                  My Cards
                </RegularText>
              </TouchableOpacity>
            </ScrollView>
            {this.state.activetab == "withdrawal" ? (
              <View style={styles.bottomcard}>
                {this.props.userwithdrawal.length > 0 ? (
                  this.props.userwithdrawal.map((value, index) => (
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
                {this.props.userdeposit.length > 0 ? (
                  this.props.userdeposit.map((value, index) => (
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
              <Cards
                cardlist={this.props.cardlist}
                navigation={this.props.navigation}
                showModal={this.showModal}
                itemloading={this.props.itemloading}
                activeid={this.state.activeid}
              />
            )}
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
    cardlist: state.paymentReducer.cardlist,
    userdeposit: state.authReducer.userdeposit,
    userwithdrawal: state.authReducer.userwithdrawal
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => dispatch(actions.getUserInfo()),
    getUserDeposits: () => dispatch(actions.getUserDeposits()),
    getUserWithdrawals: () => dispatch(actions.getUserWithdrawals()),
    getUserCards: () => dispatch(actions.getUserCards()),
    deleteCard: id => dispatch(actions.deleteCard(id))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(WalletScreen);
