import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  AsyncStorage,
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
import styles from "./BlogScreen.style";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import Fonts from "../../shared/Themes/Fonts";
import ImagePicker from "react-native-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
class BlogScreen extends Component {
  state = {
    price: "",
    userpic: "",
    equity: ""
  };

  render() {
    const { userinfo } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.containerdiv}>
          <View style={styles.mortgageinput}>
            <BoldText customstyle={{ color: Colors.blue, fontSize: 25 }}>
              Money Bloxx
            </BoldText>
            <RegularText customstyle={styles.headtext}>
              Empowering individuals with personal financial & wealth management
              tools
            </RegularText>
            <View style={styles.hr} />
            <RegularText customstyle={styles.headcard}>WHAT'S NEW</RegularText>
            <View
              style={{ width: "100%", flex: 1, marginTop: 20, borderRadius: 5 }}
            >
              <Image
                source={Images.news}
                resizeMode="cover"
                style={{ width: "100%", borderRadius: 5 }}
              />
            </View>
            <View style={styles.headerview}>
              <RegularText customstyle={styles.imageView}>
                Learning to control your spending habits 101.
              </RegularText>
              <RegularText customstyle={styles.inputmortgage}>
                3 min. read
              </RegularText>
            </View>
            <RegularText customstyle={styles.headtext}>
              Empowering individuals with personal financial & wealth management
              tools
            </RegularText>
            <View style={styles.hr} />
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
    userinfo: state.authReducer.userinfo
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearStorage: () => dispatch(actions.clearStorage()),
    savePic: formdata => dispatch(actions.savePic(formdata))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(BlogScreen);
