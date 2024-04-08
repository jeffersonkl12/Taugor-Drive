import { COLORS } from "@constants/customTheme";
import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface ProgressBarProps {
  progress?: number;
  color?: string;
  width?: number;
  height?: number;
  style?: ViewStyle;
  fitStyle?: ViewStyle;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 1,
  color = COLORS.verde[500],
  width = 200,
  height = 20,
  fitStyle,
  style,
}) => {
  const progressWidth = progress;

  return (
    <View style={[styles.container, { width, height }, style]}>
      <View
        style={[styles.progressBackground, { backgroundColor: "lightgray" },fitStyle]}
      >
        <View
          style={[
            styles.progressBar,
            { width: `${progressWidth}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: "hidden",
  },
  progressBackground: {
    height: "100%",
    flexDirection: "row-reverse",
  },
  progressBar: {
    height: "100%",
    borderRadius: 8,
  },
});

export default ProgressBar;
