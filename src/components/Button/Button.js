import React from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./Button.style";
import { RegularText } from "../AppText/index";
import { Colors } from "../../shared/Themes";

const Button = props => {
  const disabled = props.disabled;
  const isLoading = props.isLoading;
  let buttonStyle = "";

  if (props.type == "style.primary") {
    buttonStyle = disabled
      ? [styles.button, styles.primary, styles.inValidButton]
      : [styles.button, styles.validButton, styles.primary];
  } else if (props.type == "style.secondary") {
    buttonStyle = disabled
      ? [styles.button, styles.inValidButton, styles.secondary]
      : [styles.button, styles.validButton, styles.secondary];
  } else if (props.type == "style.white") {
    buttonStyle = disabled
      ? [styles.button, styles.inValidButton, styles.white]
      : [styles.button, styles.validButton, styles.white];
  } else if (props.type == "style.special") {
    buttonStyle = disabled
      ? [styles.button, styles.primary, styles.inValidButtonSpecial]
      : [styles.button, styles.validButton, styles.primary];
  } else {
    buttonStyle = disabled
      ? [styles.button, styles.inValidButton, styles.cleared]
      : [styles.button, styles.validButton, styles.cleared];
  }

  let content = (
    <View style={buttonStyle}>
      <Text
        style={
          props.type == "style.cleared"
            ? styles.clearButtonText
            : props.type == "style.white"
            ? styles.blueText
            : styles.buttonText
        }
      >
        {" "}
        {props.children}{" "}
      </Text>
    </View>
  );

  if (isLoading) {
    content = (
      <View style={buttonStyle}>
        {props.type == "style.white" ? (
          <View style={styles.buttonContent}>
            <View style={styles.activityLoader}>
              <ActivityIndicator size="small" color={Colors.blue} />
            </View>
            <RegularText style={[styles.loadingText, { color: Colors.blue }]}>
              Please wait..
            </RegularText>
          </View>
        ) : (
          <View style={styles.buttonContent}>
            <View style={styles.activityLoader}>
              <ActivityIndicator size="small" color="white" />
            </View>
            <RegularText style={styles.loadingText}>Please wait..</RegularText>
          </View>
        )}
      </View>
    );
  }

  if (disabled || isLoading) {
    return content;
  }

  return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>;
};

export default Button;
