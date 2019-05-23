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
import { BoldText, MediumText, RegularText } from "../../components/AppText";
import styles from "./Registration.style";
import Fonts from "../../shared/Themes/Fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomInput from "../../components/CustomInput/CustomInput.component";
import Button from "../../components/Button/Button";
class Step9 extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.containerdiv}>
          <View style={[styles.middlecontentcenter, { marginTop: 30 }]}>
            <BoldText customstyle={styles.midhead}>Hold on for a Bit.</BoldText>
            <RegularText
              customstyle={[
                styles.midtext,
                { width: "70%", textAlign: "center" }
              ]}
            >
              Kindly turn on push notifications to get timely alerts and
              reminders.
            </RegularText>
            <TouchableOpacity
            //onPress={() => this.props.navigation.navigate("Step6")}
            >
              <Image
                source={Images.pushnotification}
                style={styles.cameraicon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 80 }}>
            <Button
              type="style.primary"
              onPress={() => this.props.navigation.navigate("Home")}
              //disabled={!this.state.formIsValid}
              //isLoading={this.state.showLoading}
            >
              TURN ON NOTIFICATIONS
            </Button>
          </View>
        </ScrollView>
        <Image
          source={Images.balloon}
          resizeMode="cover"
          style={styles.baloon}
        />
        <Image
          source={Images.unionblue}
          resizeMode="cover"
          style={styles.union}
        />
      </SafeAreaView>
    );
  }
}

export default Step9;
