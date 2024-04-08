import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
  View,
  TextStyle,
} from "react-native";
import IconCustom from "@components/iconCustom/IconCustom"; 
import { COLORS } from "@constants/customTheme";

type ButtonVariant = "primary" | "outline" | "rounded";

interface ButtonProps {
  variant?: ButtonVariant;
  children?: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconSize?: number;
  iconStyle?: ImageStyle;
}

const ButtonCustom = ({
  variant = "primary",
  children,
  disabled,
  onPress,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  iconSize = 26,
  iconStyle,
}: ButtonProps) => {
  const buttonStyles =
    variant === "primary"
      ? styles.primary
      : variant === "outline"
      ? styles.outline
      : styles.rounded; 
  const textStyles =
    variant === "primary" ? styles.textPrimary : styles.textOutline;

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyles, style]}
      onPress={onPress}
      disabled={disabled}
    >
      {leftIcon && (
        <View style={styles.containerIcon}>
          <IconCustom
            source={leftIcon}
            iconSize={iconSize}
            iconStyle={iconStyle}
          />
        </View>
      )}
      <Text style={[styles.text, textStyles, textStyle]}>{children}</Text>

      {rightIcon && (
        <View style={styles.containerIcon}>
          <IconCustom
            source={rightIcon}
            iconSize={iconSize}
            iconStyle={iconStyle}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    position: "relative",
    borderWidth: 2,
    backgroundColor: COLORS.verde[500],
  },
  primary: {
    
    borderColor: "transparent"

  },
  outline: {
    backgroundColor: "transparent",
    borderColor: "white",
  },
  rounded: {
    borderRadius: 25,
    borderColor: "transparent"
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  textPrimary: {
    color: "#fff",
  },
  textOutline: {
    color: "white",
  },
  containerIcon: {
    position: "absolute",
    right: "20%",
  },
});

export default ButtonCustom;
