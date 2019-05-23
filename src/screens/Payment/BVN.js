import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView
} from "react-native";
import { Colors, Images } from "../../shared/Themes";
import { BoldText, MediumText, RegularText } from "../../components/AppText";
import styles from "./Payment.style";
import Fonts from "../../shared/Themes/Fonts";
import Snackbar from "react-native-snackbar";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../../components/Button/Button";
class BVN extends Component {
  //   componentWillReceiveProps(nextProps) {
  //     if (nextProps.message) {
  //       this.showSnackBar(nextProps.message);
  //     }
  //   }
  state = {
    bvn: ""
  };
  showSnackBar = message => {
    // Snackbar.show({
    //   title: "Hello world",
    //   duration: Snackbar.LENGTH_SHORT
    // });
    Snackbar.show({
      title: message,
      duration: Snackbar.LENGTH_INDEFINITE,
      action: {
        title: "Close",
        color: "green",
        onPress: () => {
          this.props.clearMessage();
        }
      }
    });
  };
  saveInfo = () => {
    const formdata = {
      bvn: this.state.bvn
    };
    this.props.saveBvn(formdata);
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.containerdiv}>
          <View style={styles.header}>
            <Ionicons
              onPress={() => this.props.navigation.pop()}
              name="ios-arrow-round-back"
              size={50}
              style={{ padding: 5 }}
              color="white"
            />
          </View>
          <View style={styles.middlecontent}>
            <BoldText customstyle={styles.midhead}>Enter Your BVN.</BoldText>
            <RegularText customstyle={styles.midtext}>
              Add your BVN to begin saving.
            </RegularText>

            <View style={styles.input}>
              <TextInput
                placeholder="BVN"
                value={this.state.bvn}
                onChangeText={value => this.setState({ bvn: value })}
                style={[styles.formControl]}
                underlineColorAndroid="transparent"
                placeholderTextColor="#808ecc"
                keyboardType="numeric"
              />
            </View>

            <View style={{ marginTop: 30, marginBottom: 10, width: "100%" }}>
              <Button
                type="style.white"
                onPress={() => this.saveInfo()}
                disabled={this.state.bvn.length <= 11}
                isLoading={this.props.loading}
              >
                PROCEED
              </Button>
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
    message: state.uiReducer.message,
    formdata: state.authReducer.formdata
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveBvn: data => dispatch(actions.saveBvn(data)),
    clearMessage: () => dispatch(actions.clearMessage())
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(BVN);
