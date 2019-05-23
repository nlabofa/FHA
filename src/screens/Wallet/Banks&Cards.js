import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  SafeAreaView
} from "react-native";
import { Colors, Images } from "../../shared/Themes";
import { BoldText, MediumText, RegularText } from "../../components/AppText";
import styles from "../Wallet/Walletscreen.style";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesigns from "react-native-vector-icons/AntDesign";

class BanksCards extends Component {
  state = {
    accountname: "",
    activeid: ""
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
  render() {
    const { cardlist } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={[styles.containerdiv2]}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Payment", { addcard: true })
            }
            style={{ position: "absolute", bottom: 0, right: 0 }}
          >
            <Image source={Images.addcard} resizeMode="contain" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Ionicons
              onPress={() => this.props.navigation.pop()}
              name="ios-arrow-round-back"
              size={50}
              style={{ padding: 5 }}
              color={Colors.blue}
            />
          </View>
          <View style={styles.middlecontent}>
            <BoldText customstyle={[styles.midhead, { color: "#000" }]}>
              Banks & Cards.
            </BoldText>
            {cardlist &&
              cardlist.map((value, index) => (
                <View key={index} style={styles.carddiv}>
                  <View style={styles.cardrow}>
                    <RegularText
                      customstyle={{
                        color: "#fff",
                        fontSize: 13,
                        paddingRight: 20
                      }}
                    >
                      {value.type + "CARD"}
                    </RegularText>
                    <RegularText
                      customstyle={{
                        color: "#fff",
                        fontSize: 14,
                        flexWrap: "wrap"
                      }}
                    >
                      {"**** **** ****" + value.cardBin}
                    </RegularText>
                  </View>
                  {this.props.itemloading &&
                  this.state.activeid == value._id ? (
                    <AntDesigns
                      name="loading1"
                      color="#8793AA"
                      size={30}
                      style={{ position: "absolute", right: -5, top: 12 }}
                    />
                  ) : (
                    <Ionicons
                      onPress={() => this.showModal(value._id, value.cardBin)}
                      name="md-trash"
                      color="#8793AA"
                      size={30}
                      style={{ position: "absolute", right: 0, top: 12 }}
                    />
                  )}
                </View>
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToprops = state => {
  return {
    loading: state.uiReducer.loading,
    cardlist: state.paymentReducer.cardlist,
    itemloading: state.uiReducer.itemloading,
    message: state.uiReducer.message
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteCard: id => dispatch(actions.deleteCard(id))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(BanksCards);
