import { COLORS } from "@constants/customTheme";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

interface Props{
  isVisible?: boolean;
}

const ModalLoad = ({isVisible}:Props) => {

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <ActivityIndicator size={200} color={COLORS.verde[500]} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default ModalLoad;
