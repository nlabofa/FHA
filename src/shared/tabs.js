import React from "react";
import { Image } from "react-native";
import {
  createBottomTabNavigator,
  createMaterialBottomTabNavigator
} from "react-navigation";

//import { colors } from "../shared";

import HomeScreen from "../screens/Home/Homescreen";
import WalletScreen from "../screens/Wallet/Walletscreen";
import SavingScreen from "../screens/SaveNow/SaveNowScreen";
import AccountScreen from "../screens/Account/AccountScreen";
import BlogScreen from "../screens/Blog/BlogScreen";
const TabStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Image
              source={require("../assets/images/homeact.png")}
              style={{ width: 23, height: 24 }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../assets/images/homeinact.png")}
              style={{ width: 23, height: 24 }}
              resizeMode="contain"
            />
          )
      }
    },
    Wallet: {
      screen: WalletScreen,
      navigationOptions: {
        tabBarLabel: "Vault",
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Image
              source={require("../assets/images/walletact.png")}
              style={{ width: 29, height: 24 }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../assets/images/walletinact.png")}
              style={{ width: 29, height: 24 }}
              resizeMode="contain"
            />
          )
      }
    },
    Savings: {
      screen: SavingScreen,
      navigationOptions: {
        // tabBarLabel: () => {},
        tabBarLabel: "Save Now",
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Image
              source={require("../assets/images/savingact.png")}
              style={{ width: 23, height: 24 }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../assets/images/savinginact.png")}
              style={{ width: 23, height: 24 }}
              resizeMode="contain"
            />
          )
      }
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: {
        tabBarLabel: "Account",
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Image
              source={require("../assets/images/accountact.png")}
              style={{ width: 23, height: 24 }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../assets/images/accountinact.png")}
              style={{ width: 23, height: 24 }}
              resizeMode="contain"
            />
          )
      }
    },
    Blog: {
      screen: BlogScreen,
      navigationOptions: {
        tabBarLabel: "Blog",
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Image
              source={require("../assets/images/newspaperact.png")}
              style={{ width: 29, height: 24 }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../assets/images/newspaperinact.png")}
              style={{ width: 29, height: 24 }}
              resizeMode="contain"
            />
          )
      }
    }
  },

  {
    tabBarOptions: {
      activeTintColor: "#2F75F7",
      inactiveTintColor: "#808080",
      labelStyle: {
        fontSize: 12,
        fontFamily: "CircularStd-Book"
        // paddingVertical: 10,
        // fontWeight: "bold"
      },
      style: {
        height: 75,
        paddingVertical: 10,
        backgroundColor: "white",
        borderTopWidth: 3,
        borderTopColor: "#f8f9f9"
      },
      showIcon: true,
      showLabel: true
    },
    shifting: true,
    backBehavior: "none",
    initialRouteName: "Home"
  }
);

export default TabStack;
