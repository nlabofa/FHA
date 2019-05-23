import React, { Component } from "react";
import Swiper from "../../components/Swiper";
import { BoldText, RegularText, MediumText } from "../../components/AppText";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./Onboarding.style";
import {
  View,
  Image,
  Text,
  StatusBar,
  Dimensions,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { Colors, Images } from "../../shared/Themes/";
import Step1 from "../Registration/Step1";
import Button from "../../components/Button/Button";
class FirstScreen extends Component {
  // componentDidMount() {
  //   StatusBar.setHidden(true);
  // }

  render() {
    //const { width, height } = Dimensions.get("window");
    return (
      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        {/* <View style={[styles.slide, { backgroundColor: "#56CCF2" }]}>
          <View style={styles.topArea}>
            <Image
              source={Images.onboard1}
              style={styles.onboardStyle}
              resizeMode="cover"
            />
            <MediumText customstyle={styles.subhead}>First Homes</MediumText>
          
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Step1")}
              style={styles.button}
            >
              <BoldText customstyle={{ color: "#56ccf2" }}>
                Get Started
              </BoldText>
            </TouchableOpacity>
          </View>
          <Image
            source={Images.union}
            resizeMode="cover"
            style={styles.bottomArea}
          />
        </View> */}
        <View style={[styles.slide, { backgroundColor: "#6D7FFF" }]}>
          <View style={styles.topArea}>
            <Image
              source={Images.onboard1}
              style={styles.onboardStyle}
              resizeMode="cover"
            />
            <MediumText customstyle={styles.subhead}>
              Save up for your dream home
            </MediumText>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Step1")}
              style={styles.button}
            >
              <BoldText customstyle={{ color: "#6d7fff" }}>SIGN UP</BoldText>
            </TouchableOpacity>
            <BoldText
              onPress={() => this.props.navigation.navigate("Login")}
              customstyle={{ color: "#fff" }}
            >
              LOGIN
            </BoldText>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default FirstScreen;
