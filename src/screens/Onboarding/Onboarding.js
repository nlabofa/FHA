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
class OnboardingScreen extends Component {
  // componentDidMount() {
  //   StatusBar.setHidden(true);
  // }

  render() {
    //const { width, height } = Dimensions.get("window");
    return (
      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <Swiper navigation={this.props.navigation}>
          {/* First screen */}
          <View style={[styles.slide, { backgroundColor: "#56CCF2" }]}>
            <View style={styles.topArea}>
              <Image
                source={Images.onboard1}
                style={styles.onboardStyle}
                resizeMode="cover"
              />
              <MediumText customstyle={styles.subhead}>First Homes</MediumText>
              {/* <Ionicons
                onPress={() => this.props.navigation.navigate("Step1")}
                name="md-fastforward"
                color="#fff"
                size={35}
              /> */}
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
          </View>
          {/* Second screen */}
          <View style={[styles.slide, { backgroundColor: "#6D7FFF" }]}>
            <View style={styles.topArea}>
              <Image
                source={Images.onboard2}
                style={styles.onboardStyle2}
                resizeMode="contain"
              />
              <MediumText customstyle={styles.subhead}>
                Begin Your Journey
              </MediumText>
              {/* <Ionicons
                onPress={() => this.props.navigation.navigate("Step1")}
                name="md-fastforward"
                color="#fff"
                size={35}
              /> */}
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Step1")}
                style={styles.button}
              >
                <BoldText customstyle={{ color: "#6d7fff" }}>
                  Get Started
                </BoldText>
              </TouchableOpacity>
            </View>

            <Image
              source={Images.union}
              resizeMode="cover"
              style={styles.bottomArea}
            />
          </View>
          {/* <View style={{ flex: 1 }}>
            <Step1 navigation={this.props.navigation} />
          </View> */}
        </Swiper>
      </SafeAreaView>
    );
  }
}

export default OnboardingScreen;
