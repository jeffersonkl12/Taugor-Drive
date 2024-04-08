import ButtonCustom from "@components/buttonCustom/ButtonCustom";
import { ArquivoInfo } from "@interfaces/app.interfaces";
import { COLORS } from "@constants/customTheme";
import { FILEIMAGES, MIMETYPES } from "@constants/fileImages";
import { formatBytes, limitText } from "@utils/utils";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  arquivo?: ArquivoInfo;
  isVisible?: boolean;
  style?: ViewStyle;
  closeModal?: () => void;
}

const ModalInfoFile = ({ arquivo, isVisible, style, closeModal }: Props) => {
  const [textoMostra, setTextoMostra] = useState("");

  const MAX_LENGTH_TITLE = 19;

  useEffect(() => {
    if (arquivo && arquivo.nome) {
      const textoAux = limitText(arquivo.nome, MAX_LENGTH_TITLE);

      setTextoMostra(textoAux);
    }
  }, [arquivo]);

  const tamanhoInfo =
    arquivo && arquivo.tamanho
      ? formatBytes(
          typeof arquivo.tamanho === "string"
            ? parseInt(arquivo.tamanho)
            : arquivo.tamanho
        )
      : "0KB";

  const sourcerBackground =
    FILEIMAGES[arquivo && arquivo.tipo ? MIMETYPES[arquivo.tipo] : "other"];

  return (
    <>
      <Modal
        animationType="slide"
        transparent
        visible={isVisible}
        presentationStyle="overFullScreen"
      >
        <View style={[styles.viewWrapper, style]}>
          <View style={styles.modalView}>
            <View style={styles.containerImageBackground}>
              <ImageBackground
                source={sourcerBackground}
                style={styles.imageBackground}
              />
            </View>
            <View style={styles.containerTitulo}>
              <Text style={styles.titulo}>{textoMostra}</Text>
            </View>
            <View>
              <View style={styles.containerDescInfo}>
                <Text style={styles.descInfoTitulo}>Tamanho:</Text>
                <Text style={styles.descInfoData}>{tamanhoInfo}</Text>
              </View>
              <View style={styles.containerDescInfo}>
                <Text style={styles.descInfoTitulo}>Data:</Text>
                <Text style={styles.descInfoData}>
                  {arquivo && arquivo.data}
                </Text>
              </View>
            </View>
            <View style={styles.containerButtons}>
              <ButtonCustom onPress={closeModal}>FECHAR</ButtonCustom>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ModalInfoFile;

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    padding: 40,
    elevation: 5,
    height: 390,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 7,
  },
  containerImageBackground: {
    alignItems: "center",
  },
  imageBackground: {
    width: 60,
    height: 60,
  },
  containerTitulo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    position: "relative",
  },
  titulo: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputEdit: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    fontSize: 16,
  },
  iconEditTitulo: {
    top: 5,
    right: 0,
    position: "absolute",
  },
  containerDescInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  descInfoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
  },
  descInfoData: {
    fontSize: 16,
    color: COLORS.cinza[200],
  },
  containerButtons: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 30,
  },
});
