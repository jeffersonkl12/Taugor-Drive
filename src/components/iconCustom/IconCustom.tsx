import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  source: ImageSourcePropType | string;
  iconSize?: number;
  iconStyle?: ImageStyle;
  circleStyle?: ViewStyle;
  hasCircle?: boolean;
  onPress?: () => void;
}

const IconCustom = ({
  source,
  iconSize = 26,
  iconStyle,
  circleStyle,
  onPress,
  hasCircle,
}: Props) => {
  const renderIcon = () => {
    if (hasCircle) {
      return (
        <View style={[styles.circle, circleStyle]}>
          <Image
            source={source as ImageSourcePropType}
            style={[
              styles.icon,
              { width: iconSize, height: iconSize },
              iconStyle,
            ]}
          />
        </View>
      );
    } else {
      return (
        <Image
          source={source as ImageSourcePropType}
          style={[
            styles.icon,
            { width: iconSize, height: iconSize },
            iconStyle,
          ]}
        />
      );
    }
  };

  return <TouchableOpacity onPress={onPress}>{renderIcon()}</TouchableOpacity>;
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: "center",
  },
  circle: {
    padding: 8,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 100,
  },
});

export default IconCustom;
