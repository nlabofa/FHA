import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const usertoken = await AsyncStorage.getItem("usertoken");
    const madepayment = await AsyncStorage.getItem("madepayment");
    const isverified = await AsyncStorage.getItem("isverified");
    const hasPassword = await AsyncStorage.getItem("hasPassword");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if (
      usertoken &&
      madepayment == "false" &&
      hasPassword == "true" &&
      isverified == "true"
    ) {
      this.props.navigation.navigate("Home"); //mortgae calculator(has verified but not added card)
    } else if (usertoken && isverified == "false") {
      this.props.navigation.navigate("Step4"); //OTP page(i.e has registered but not verified OTP)
    } else if (usertoken && hasPassword == "false" && isverified == "true") {
      this.props.navigation.navigate("Step3"); //Password Page(user has signed up but haven't created password)
    } else if (
      usertoken &&
      isverified == "true" &&
      (madepayment == "true" || madepayment == "false")
    ) {
      this.props.navigation.navigate("Home"); //Home page(has made first payment and has verified)
    } else {
      this.props.navigation.navigate("Onboarding");
      console.log(usertoken);
      // console.log(isverified);
      // console.log(madepayment);
      // console.log(hasPassword);
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#2F75F7" size="small" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  }
});
export default AuthLoadingScreen;
