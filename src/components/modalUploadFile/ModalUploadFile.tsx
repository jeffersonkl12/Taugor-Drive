import React, { useEffect, useState } from "react";
import { FILEIMAGES, MIMETYPES } from "@constants/fileImages";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ViewStyle,
  ImageBackground,
  TextInput,
} from "react-native";
import IconCustom from "@components/iconCustom/IconCustom";
import ButtonCustom from "@components/buttonCustom/ButtonCustom";
import { COLORS, FONTSIZE } from "@constants/customTheme";
import { ArquivoInfo } from "@interfaces/app.interfaces";
import { formatBytes, limitText } from "@utils/utils";
import ProgressBar from "@components/progressBar/ProgressBar";
import ConcludeIcom from "@icons/marca.png";
import EditIcon from "@icons/editar.png";

interface FinishUploadProps {
  onPressFinishButton?: () => void;
}

const ModalFinish = ({ onPressFinishButton }: FinishUploadProps) => {
  return (
    <>
      <Text style={styles.finishTitulo}>Upload Concluido!</Text>
      <View style={styles.containerBackground}>
        <ImageBackground
          style={styles.backgroundFisnishUpload}
          source={ConcludeIcom}
        />
      </View>
      <View style={styles.contanerButtonFinish}>
        <ButtonCustom style={styles.buttonFinish} onPress={onPressFinishButton}>
          OK
        </ButtonCustom>
      </View>
    </>
  );
};

interface ProgressUploadProp {
  progress?: number;
}

const ModalUpload = ({ progress }: ProgressUploadProp) => {
  return (
    <>
      <Text style={styles.progressTitulo}>Fazendo Upload...</Text>
      <View style={styles.containerProgress}>
        <ProgressBar progress={progress} />
      </View>
    </>
  );
};

interface ModalLoadProps {
  arquivo?: ArquivoInfo;
  style?: ViewStyle;
  onCancelFileUpload?: () => void;
  onSendFileUpload?: (arg: ArquivoInfo) => void;
  editNomeArquivoUpload?: (nome: string) => void;
}

const ModalLoad = ({
  arquivo,
  style,
  onCancelFileUpload,
  onSendFileUpload,
  editNomeArquivoUpload,
}: ModalLoadProps) => {
  const [ediTitulo, setEditTitulo] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [textoMostra, setTextoMostra] = useState("");

  const MAX_LENGTH_TITLE = 19;

  useEffect(() => {
    if (arquivo && arquivo.nome) {
      const textoAux = limitText(arquivo.nome, MAX_LENGTH_TITLE);

      setTextoMostra(textoAux);
      setEditTitulo(arquivo.nome);
    }
  }, []);

  const sourcerBackground =
    FILEIMAGES[arquivo && arquivo.tipo ? MIMETYPES[arquivo.tipo] : "other"];

  const tamanhoInfo =
    arquivo && arquivo.tamanho
      ? formatBytes(
          typeof arquivo.tamanho === "string"
            ? parseInt(arquivo.tamanho)
            : arquivo.tamanho
        )
      : "0KB";

  const onBlurTextTitulo = () => {
    setIsEditingTitle(false);
    setTextoMostra(limitText(ediTitulo, MAX_LENGTH_TITLE));
  };

  const onPressButtonEnvinha = () => {
    if (arquivo && onSendFileUpload && editNomeArquivoUpload) {
      if (arquivo.nome !== ediTitulo) {
        const novoArquivo: ArquivoInfo = { ...arquivo, nome: ediTitulo };
        onSendFileUpload(novoArquivo);
      } else {
        onSendFileUpload(arquivo!);
      }
    }
  };

  return (
    <>
      <View style={styles.containerImageBackground}>
        <ImageBackground
          source={sourcerBackground}
          style={styles.imageBackground}
        />
      </View>
      <View style={styles.containerTitulo}>
        {isEditingTitle ? (
          <TextInput
            style={styles.inputEdit}
            value={ediTitulo}
            onBlur={onBlurTextTitulo}
            onChangeText={setEditTitulo}
          />
        ) : (
          <>
            <Text style={styles.titulo}>{textoMostra}</Text>
            <View style={styles.iconEditTitulo}>
              <IconCustom
                source={EditIcon}
                onPress={() => setIsEditingTitle(true)}
                iconSize={20}
              />
            </View>
          </>
        )}
      </View>
      <View>
        <View style={styles.containerDescInfo}>
          <Text style={styles.descInfoTitulo}>Tamanho:</Text>
          <Text style={styles.descInfoData}>{tamanhoInfo}</Text>
        </View>
        <View style={styles.containerDescInfo}>
          <Text style={styles.descInfoTitulo}>Data:</Text>
          <Text style={styles.descInfoData}>{arquivo && arquivo.data}</Text>
        </View>
      </View>
      <View style={styles.containerButtons}>
        <ButtonCustom
          style={styles.buttonCancel}
          textStyle={styles.buttonCancelText}
          variant="outline"
          onPress={onCancelFileUpload}
        >
          CANCELAR
        </ButtonCustom>
        <ButtonCustom onPress={onPressButtonEnvinha}>ENVINHAR</ButtonCustom>
      </View>
    </>
  );
};

interface Props {
  arquivo?: ArquivoInfo;
  isVisible?: boolean;
  style?: ViewStyle;
  sendUpload?: (arquivo: ArquivoInfo) => void;
  editNomeArquivoUpload?: (nome: string) => void;
  closeModal?: () => void;
}

const ModalUploadFile = ({
  arquivo,
  isVisible = false,
  style,
  sendUpload,
  editNomeArquivoUpload,
  closeModal,
}: Props) => {
  const [isUpload, setIsUpload] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [progress, setProgress] = useState(0);

  const onPressUploadFile = (auxArquivo: ArquivoInfo) => {
    if (sendUpload && auxArquivo) {
      setIsUpload(true);
      sendUpload(auxArquivo);

      const tempUpload = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(tempUpload);
            setIsFinish(true);
            setIsUpload(false);
            return 0;
          }
          return prevProgress + Math.floor(Math.random() * 100) + 1;
        });
      }, 2000);
    }
  };

  const onPressCancelUpload = () => {
    if (closeModal) {
      setIsUpload(false);
      setIsFinish(false);
      closeModal();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      presentationStyle="overFullScreen"
    >
      <View style={[styles.viewWrapper, style]}>
        <View style={styles.modalView}>
          {isUpload && !isFinish ? (
            <ModalUpload progress={progress} />
          ) : !isUpload && isFinish ? (
            <ModalFinish onPressFinishButton={onPressCancelUpload} />
          ) : (
            <ModalLoad
              arquivo={arquivo}
              onSendFileUpload={onPressUploadFile}
              onCancelFileUpload={onPressCancelUpload}
              editNomeArquivoUpload={editNomeArquivoUpload}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    elevation: 5,
    height: 370,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  buttonCancel: {
    borderColor: COLORS.verde[500],
  },
  buttonCancelText: {
    color: COLORS.verde[500],
  },
  containerProgress: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  containerButtonProgress: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonProgress: {
    width: "70%",
  },
  progressTitulo: {
    fontSize: FONTSIZE.h4,
    fontWeight: "bold",
    color: COLORS.azul[200],
    textAlign: "center",
  },
  containerBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  backgroundFisnishUpload: {
    width: 100,
    height: 100,
  },
  contanerButtonFinish: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonFinish: {
    width: "40%",
  },
  finishTitulo: {
    fontSize: FONTSIZE.h4,
    fontWeight: "bold",
    color: COLORS.verde[500],
    textAlign: "center",
  },
});

export default ModalUploadFile;
