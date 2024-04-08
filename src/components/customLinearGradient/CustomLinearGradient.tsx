import { LinearGradient, LinearGradientPoint } from "expo-linear-gradient";
import { StyleProp, ViewStyle } from "react-native";

interface Props {
  colors?: string[];
  start?: LinearGradientPoint;
  end?: LinearGradientPoint;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CustomLinearGradient = ({
  colors = ["#8e2580", "#292562"],
  start = [0, 0],
  end = [1, 1],
  children,
  style = { flex: 1 },
}: Props) => {
  return (
    <>
      <LinearGradient colors={colors} start={start} end={end} style={style}>
        {children}
      </LinearGradient>
    </>
  );
};

export default CustomLinearGradient;
