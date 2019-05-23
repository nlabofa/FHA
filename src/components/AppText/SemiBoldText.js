import React from "react";
import { Text, StyleSheet } from "react-native";

/**
 * @RegularText Component
 *
 * The light version of any component you wanna use
 */
export default props => {
  return (
    <Text style={[styles.defaultStyles, props.customstyle]} {...props}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultStyles: {
    fontFamily: "CircularStd-Bold",
    fontSize: 14
  }
});
