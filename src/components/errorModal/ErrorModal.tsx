import React, { useRef, useState, forwardRef, useImperativeHandle } from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { FONTSIZE } from "@constants/customTheme";
import ButtonCustom from "@components/buttonCustom/ButtonCustom";

export interface ErrorModalRef {
  showModal: (errorMessage: string) => void;
  hideModal: () => void;
}

const ErrorModal: React.ForwardRefRenderFunction<ErrorModalRef, any> = (
  props,
  ref
) => {
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const modalRef = useRef<ErrorModalRef>({
    showModal: (message: string) => {},
    hideModal: () => {},
  });
  
  useImperativeHandle(ref, () => modalRef.current);

  const showModal = (message: string) => {
    setErrorMessage(message);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setErrorMessage("");
  };

  modalRef.current.showModal = showModal;
  modalRef.current.hideModal = hideModal;

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.errorTitulo}>Error!</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <ButtonCustom onPress={hideModal}>OK</ButtonCustom>
        </View>
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
  modalContent: {
    minWidth: "70%",
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  errorTitulo: {
    fontSize: FONTSIZE.h4,
    fontWeight: "bold",
    marginBottom: 20,
  },
  errorMessage: {
    fontSize: 18,
    marginBottom: 30,
  },
});

export default forwardRef(ErrorModal);
