import React from "react";
import { TextInput } from "react-native";
import styles from "./CustomInput.component.style";

const CustomInput = props => {
  const inputClasses = [styles.formControl];

  return (
    <TextInput
      style={[
        styles.formControl,
        props.customstyle ? props.customstyle : null,
        props.focused ? styles.focused : null,
        !props.valid && props.touched ? styles.inValid : null
      ]}
      underlineColorAndroid="transparent"
      placeholderTextColor="#808080"
      {...props}
    />
  );
};

export default CustomInput;
