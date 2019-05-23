import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  AsyncStorage,
  Text,
  Image,
  SafeAreaView
} from "react-native";
import { Colors, Images } from "../../shared/Themes";
import { BoldText, MediumText, RegularText } from "../../components/AppText/";
import styles from "./Registration.style";
import Fonts from "../../shared/Themes/Fonts";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import ImagePicker from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../../components/Button/Button";
class Step5 extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.message == "upload success") {
      this.props.navigation.navigate("Step6");
      this.setState({ userpic: "" });
    }
  }
  state = {
    userpic: ""
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
    // this.props.savePic(response);
    this.state.userpic
      ? this.props.savePic(response)
      : this.props.navigation.navigate("Step6");
  };
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.containerdiv}>
          <View style={styles.middlecontentcenter}>
            <BoldText customstyle={styles.midhead}>Take a Selfie</BoldText>
            <RegularText
              customstyle={[
                styles.midtext,
                { width: "60%", textAlign: "center" }
              ]}
            >
              Personalize your account by taking an image of yousrself.
            </RegularText>
            <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
              {this.state.userpic ? (
                <View style={styles.imageView}>
                  <Image
                    source={{ uri: this.state.userpic }}
                    //source={Images.flat}
                    resizeMode="cover"
                    style={styles.userIcon}
                  />
                </View>
              ) : (
                <Image
                  source={Images.camera}
                  style={styles.cameraicon}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
          </View>
          <Button
            isLoading={this.props.loading}
            type="style.primary"
            onPress={() => this.savePic()}
          >
            {this.state.userpic ? "Proceed" : "Skip"}
          </Button>
        </ScrollView>
        <Image
          source={Images.balloon}
          resizeMode="cover"
          style={styles.baloon}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToprops = state => {
  return {
    loading: state.uiReducer.loading,
    message: state.uiReducer.message,
    formdata: state.authReducer.formdata
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearMessage: () => dispatch(actions.clearMessage()),
    savePic: formdata => dispatch(actions.savePic(formdata))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Step5);
