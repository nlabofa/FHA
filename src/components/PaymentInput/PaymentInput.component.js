import React from "react";
import { TextInput, Text, View } from "react-native";
import styles from "./PaymentInput.component.style";
import { Colors } from "../../shared/Themes";

const PaymentInput = props => {
  const inputClasses = [styles.formControl];
  let labelText = (
    <Text
      style={{
        opacity: 0.5,
        position: "absolute",
        left: 15,
        top: 5,
        zIndex: 10000000,
        fontSize: 15
      }}
    >
      CARD NUMBER
    </Text>
  );
  return (
    <View>
      {labelText}
      <TextInput
        style={[
          styles.formControl
          //!props.valid && props.touched ? styles.inValid : null
        ]}
        underlineColorAndroid="transparent"
        placeholderTextColor="#28334C"
        {...props}
      />
    </View>
  );
};

export default PaymentInput;
