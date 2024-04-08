import ProgressBar from "@components/progressBar/ProgressBar";
import { COLORS } from "@constants/customTheme";
import { StyleSheet, ViewStyle } from "react-native";
import { Text, View } from "react-native";

interface Props {
  titulo?: string;
  colorCircle?: string;
  colorProgress?: string;
  progress?: number;
  widthProgress?: number;
  heightProgress?: number;
  subInfo?: string;
  style?: ViewStyle;
}

const ProgressItem = ({
  titulo,
  subInfo,
  progress,
  widthProgress,
  heightProgress = 6,
  colorCircle,
  colorProgress,
  style,
}: Props) => {
  return (
    <>
      <View style={style}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <View style={[styles.point, { backgroundColor: colorCircle }]}></View>
            <Text style={styles.info}>{titulo}</Text>
          </View>

          <ProgressBar
            width={widthProgress}
            height={heightProgress}
            progress={progress}
            fitStyle={{ backgroundColor: "transparent" }}
            color={colorProgress}
          />
        </View>
        <View style={styles.subInfoContainer}>
          <Text style={styles.sizeInfo}>{subInfo}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  point: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: "red",
  },
  info: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
  subInfoContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  sizeInfo: {
    color: COLORS.cinza["200"],
  },
});

export default ProgressItem;
