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
import styles from "./AccountScreen.style";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import Fonts from "../../shared/Themes/Fonts";
import ImagePicker from "react-native-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
class AccountScreen extends Component {
  componentDidMount() {
    AsyncStorage.getItem("profilepic").then(picvalue => {
      this.setState({ userpic: picvalue });
    });
  }
  state = {
    price: "",
    userpic: "",
    equity: ""
  };
  handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        console.log(response);
        AsyncStorage.setItem("profilepic", response.uri);
        this.setState({ userpic: response.uri });
        this.savePic(response);
      }
    });
  };
  savePic = response => {
    this.props.savePic(response);
  };
  render() {
    const { userinfo } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerdiv}>
          <BoldText customstyle={{ fontSize: 24, color: "white" }}>
            Account.
          </BoldText>
        </View>
        <ScrollView style={styles.containerdiv}>
          <View style={styles.mortgageinput}>
            <View style={styles.headerview}>
              <TouchableOpacity
                onPress={this.handleChoosePhoto}
                style={styles.imageView}
              >
                {this.state.userpic ? (
                  <Image
                    source={{ uri: this.state.userpic }}
                    resizeMode="cover"
                    style={styles.userIcon}
                  />
                ) : userinfo.profilePicture ? (
                  <Image
                    source={{ uri: userinfo.profilePicture }}
                    resizeMode="cover"
                    style={styles.userIcon}
                  />
                ) : (
                  <SimpleLineIcons name="user-follow" size={70} />
                )}
              </TouchableOpacity>
              <View
                style={{
                  alignItems: "flex-start",
                  justifyContent: "center",
                  marginLeft: 15
                }}
              >
                <SemiBoldText customstyle={{ color: "#0A0D1C" }}>
                  {userinfo && userinfo.firstname + " " + userinfo.lastname}
                </SemiBoldText>
                <RegularText customstyle={{ color: Colors.base }}>
                  {userinfo && userinfo.email}
                </RegularText>
              </View>
              {/* <Image source={Images.amber} style={styles.pointIcon} /> */}
              <MaterialCommunityIcons
                name="pencil"
                size={28}
                color="#8793AA"
                style={styles.editIcon}
              />
            </View>
            <View style={styles.hr} />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Withdrawal")}
              style={styles.listItem}
            >
              <MaterialCommunityIcons
                name="cash-multiple"
                size={30}
                color="#8793AA"
              />
              <RegularText customstyle={{ color: "#0A0D1C", paddingLeft: 10 }}>
                Withdraw Funds
              </RegularText>
              <Ionicons
                name="ios-arrow-forward"
                size={30}
                color="#8793AA"
                style={styles.absimg}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("BanksCards")}
              style={styles.listItem}
            >
              <MaterialCommunityIcons name="bank" size={30} color="#8793AA" />
              <RegularText customstyle={{ color: "#0A0D1C", paddingLeft: 10 }}>
                Bank & Cards
              </RegularText>
              <Ionicons
                name="ios-arrow-forward"
                size={30}
                color="#8793AA"
                style={styles.absimg}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem}>
              <MaterialCommunityIcons name="wechat" size={32} color="#8793AA" />
              <RegularText customstyle={{ color: "#0A0D1C", paddingLeft: 10 }}>
                Support & Feedback
              </RegularText>
              <Ionicons
                name="ios-arrow-forward"
                size={30}
                color="#8793AA"
                style={styles.absimg}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Step6")}
              style={styles.listItem}
            >
              <Image
                source={Images.modify}
                style={{ width: 32, height: 28 }}
                resizeMode="contain"
              />
              <RegularText customstyle={{ color: "#0A0D1C", paddingLeft: 10 }}>
                Modify plan
              </RegularText>
              <Ionicons
                name="ios-arrow-forward"
                size={30}
                color="#8793AA"
                style={styles.absimg}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.clearStorage()}
              style={styles.listItem}
            >
              <MaterialCommunityIcons name="logout" size={30} color="#8793AA" />
              <RegularText customstyle={{ color: "#0A0D1C", paddingLeft: 10 }}>
                Logout
              </RegularText>
            </TouchableOpacity>
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
)(AccountScreen);
