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
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import Cards from "../../components/Cards/Cards";
class ContractualDetail extends Component {
  state = {
    activetab: "deposit",
    activeid: ""
  };

  formatAmount = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  render() {
    const { navigation, userdeposit, contractualinfo } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.headerdiv,
            { flexDirection: "row", alignItems: "center" }
          ]}
        >
          <Ionicons
            name="md-arrow-back"
            size={35}
            onPress={() => navigation.pop()}
            color="#fff"
            style={{
              position: "absolute",
              left: 10,
              padding: 10
            }}
          />
          <BoldText
            customstyle={{ fontSize: 24, color: "white", textAlign: "center" }}
          >
            Contractual Equity
          </BoldText>
        </View>

        <ScrollView style={styles.containerdiv}>
          <View style={styles.listItem2}>
            <View>
              <RegularText customstyle={{ color: Colors.blue, fontSize: 15 }}>
                TOTAL AMOUNT
              </RegularText>
              <BoldText
                customstyle={{
                  color: Colors.base,
                  fontSize: 26,
                  paddingTop: 5
                }}
              >
                {"\u20A6"}
                {contractualinfo &&
                  this.formatAmount(
                    contractualinfo.totalContractualContribution
                  )}
              </BoldText>
            </View>
            <View style={styles.hr} />
            <View>
              <RegularText customstyle={{ color: Colors.blue, fontSize: 15 }}>
                MONTHLY AMOUNT
              </RegularText>
              <BoldText
                customstyle={{
                  color: Colors.base,
                  fontSize: 26,
                  paddingTop: 5
                }}
              >
                {"\u20A6"}
                {contractualinfo &&
                  this.formatAmount(contractualinfo.monthlyAmount)}
              </BoldText>
            </View>
            <View style={styles.hr} />
            <View>
              <RegularText customstyle={{ color: Colors.blue, fontSize: 15 }}>
                DATE OF 1ST CONTRIBUTION
              </RegularText>
              <BoldText
                customstyle={{
                  color: Colors.base,
                  fontSize: 16,
                  paddingTop: 5
                }}
              >
                {contractualinfo && contractualinfo.firstPaymentDate}
              </BoldText>
            </View>
            <View style={styles.hr} />
            <View>
              <RegularText customstyle={{ color: Colors.orange, fontSize: 15 }}>
                ESTIMATED COMPLETION DATE
              </RegularText>
              <BoldText
                customstyle={{
                  color: Colors.base,
                  fontSize: 16,
                  paddingTop: 5
                }}
              >
                {contractualinfo && contractualinfo.maturityDate}
              </BoldText>
            </View>
            <View style={styles.hr} />
            <RegularText customstyle={{ color: Colors.blue, fontSize: 15 }}>
              CONTRIBUTION HISTORY
            </RegularText>
            <View style={[styles.bottomcard, { marginTop: 30 }]}>
              {contractualinfo &&
              contractualinfo.contributionHistory.length > 0 ? (
                contractualinfo.contributionHistory.map((value, index) => (
                  <View key={index} style={styles.listItem}>
                    <Image
                      source={Images.markicon}
                      style={{ width: 50, height: 50 }}
                    />
                    <View style={{ marginLeft: 15 }}>
                      <MediumText
                        customstyle={{ color: Colors.base, paddingBottom: 5 }}
                      >
                        Contractual Contribution
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
                <BoldText customstyle={{ marginTop: 20, textAlign: "center" }}>
                  No deposit has been made
                </BoldText>
              )}
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
    itemloading: state.uiReducer.itemloading,
    message: state.uiReducer.message,
    userinfo: state.authReducer.userinfo,
    contractualinfo: state.authReducer.contractualinfo,
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
)(ContractualDetail);
