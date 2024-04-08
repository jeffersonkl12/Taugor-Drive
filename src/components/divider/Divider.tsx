import { COLORS } from "@constants/customTheme";
import React from "react";
import { View } from "react-native";

interface DividerProps {
  width?: number;
  orientation?: "horizontal" | "vertical";
  color?: string;
  style?: any;
}

const Divider = ({
  width = 1,
  orientation = "horizontal",
  color = COLORS.cinza["100"],
  style,
}: DividerProps) => {
  const dividerStyles = [
    { width: orientation === "horizontal" ? "100%" : width },
    { height: orientation === "vertical" ? "100%" : width },
    { backgroundColor: color },
    style,
  ];

  return <View style={dividerStyles} />;
};

export default Divider;
