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
import {
  BoldText,
  MediumText,
  RegularText,
  SemiBoldText
} from "../../components/AppText";
import styles from "./EmptyCard.style";
import Fonts from "../../shared/Themes/Fonts";
import Button from "../../components/Button/Button";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
class EmptyCard extends Component {
  state = {
    activetab: "deposit"
  };
  toggleTab = value => {
    this.setState({ activetab: value });
  };
  render() {
    const { navigation, userinfo } = this.props;
    return (
      <ScrollView style={styles.containerdiv}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}
        >
          <BoldText customstyle={styles.headtext}>
            Hi {userinfo && userinfo.firstname},
          </BoldText>
          {/* <MaterialCommunityIcons
            onPress={() => navigation.navigate("Step6")}
            name="home-currency-usd"
            size={35}
          /> */}
        </View>
        <View style={styles.referralview}>
          <Image
            source={Images.hurray}
            style={styles.absimg}
            resizeMode="cover"
          />
          <View>
            <BoldText customstyle={styles.congrathead}>
              Let's give you a boost
            </BoldText>
            <RegularText customstyle={styles.congratext}>
              Start saving now and get a 100% matching bonus while it lasts
            </RegularText>
          </View>
        </View>
        <View style={styles.emptycard}>
          <View>
            <SemiBoldText customstyle={styles.cardhead}>
              Start Saving
            </SemiBoldText>
            <View style={styles.hr} />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Payment")}
              style={{
                justifyContent: "center",
                marginTop: 20,
                alignItems: "center"
              }}
            >
              <Image source={Images.emptycard} style={styles.emptyimg} />
            </TouchableOpacity>
            <View
              style={{
                width: "100%",
                marginVertical: 15
              }}
            >
              <RegularText
                customstyle={{
                  fontSize: 16,
                  color: Colors.base,
                  textAlign: "center",
                  paddingHorizontal: 20
                }}
              >
                You’re yet to add a payment method, tap this card to get started
              </RegularText>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default EmptyCard;
