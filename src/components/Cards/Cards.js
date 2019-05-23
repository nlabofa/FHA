import React, { PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  Alert
} from "react-native";
import { Colors, Images } from "../../shared/Themes";
import {
  BoldText,
  MediumText,
  RegularText,
  SemiBoldText
} from "../../components/AppText";
import styles from "./Cards.style";
import AntDesigns from "react-native-vector-icons/AntDesign";

import Ionicons from "react-native-vector-icons/Ionicons";
class Cards extends PureComponent {
  render() {
    const { itemloading, cardlist, showModal, activeid } = this.props;
    return (
      <View style={styles.containerdiv}>
        <ScrollView
          // contentContainerStyle={{ flex: 1, flexGrow: 1 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {cardlist &&
            cardlist.map((value, index) => (
              <View key={index} style={styles.bigcard}>
                <View style={styles.rowdiv}>
                  <SemiBoldText customstyle={styles.cardhead}>
                    {value.type ? value.type + " Card" : "VERVE Card"}
                  </SemiBoldText>
                  <Image
                    source={Images.mastercard}
                    style={{ width: 26, height: 16 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.rowdiv}>
                  <Image source={Images.cardgroup} style={styles.absimg} />

                  <SemiBoldText customstyle={styles.cardhead}>
                    **** **** **** {value.last4Digits ? value.last4Digits : ""}
                  </SemiBoldText>
                  {itemloading && activeid == value._id ? (
                    <AntDesigns name="loading1" color="#fff" size={30} />
                  ) : (
                    <Ionicons
                      onPress={() => showModal(value._id, value.cardBin)}
                      name="md-trash"
                      color="#fff"
                      size={30}
                    />
                  )}
                </View>
              </View>
            ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Payment", { addcard: true })
          }
          style={{
            marginTop: 20,
            justifyContent: "flex-end",
            alignItems: "flex-end"
          }}
        >
          <Image source={Images.addcard} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Cards;
