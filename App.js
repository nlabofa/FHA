import React, { Component } from "react";
import { View } from "react-native";
import Router from "./src/shared/router";
import NavigationService from "./src/shared/NavigationService";
import store from "./src/shared/store/root.store";
import { Provider } from "react-redux";
//import store from "./shared/root.store";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
