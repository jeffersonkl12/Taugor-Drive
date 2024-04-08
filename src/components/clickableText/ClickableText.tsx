import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity } from "react-native";


interface Props{
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const ClickableText = ({ children, style, onPress,...rest }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.textStyle,style]} {...rest}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16
  }
});

export default ClickableText;
