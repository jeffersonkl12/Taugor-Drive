import ButtonCustom from "@components/buttonCustom/ButtonCustom";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FileUploadIcom from "@icons/novo-documento.png";
import { COLORS, FONTSIZE } from "@constants/customTheme";
import useUploadFile from "@hooks/useUploadFile";
import { useState } from "react";
import ModalUploadFile from "@components/modalUploadFile/ModalUploadFile";
import { ArquivoInfo, StatusFile } from "@interfaces/app.interfaces";
import useManagerFile from "@hooks/useManagerFile";

const UploadScreen = () => {
  const [isModalActivate, setIsModalActivate] = useState<boolean>(false);
  const [arquivo, setArquivo] = useState<ArquivoInfo | null>();
  const { error, uploadFileFirestore } = useUploadFile();
  const { pickDocument } = useManagerFile();

  const onPressButtonUpload = async () => {
    try {
      const upLoadArquivo = await pickDocument();
      setArquivo(() => upLoadArquivo);
      setIsModalActivate(true);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
      }

      throw e;
    }
  };

  const onPressSendFile = async (arquivoUpload: ArquivoInfo) => {
    try {
      if (arquivoUpload) {
        await uploadFileFirestore(arquivoUpload);
      }
    } catch (e) {
      throw e;
    }
  };

  const onPressCloseModal = () => {
    setIsModalActivate(false);
  };

  const editNomeArquivoUpload = (nome: string) => {
    if (arquivo) {
      setArquivo((prevArquivo) => {
        return { ...prevArquivo, nome: nome };
      });
    }
  };

  return (
    <>
      <ModalUploadFile
        arquivo={arquivo ? arquivo : undefined}
        isVisible={isModalActivate}
        sendUpload={onPressSendFile}
        closeModal={onPressCloseModal}
        editNomeArquivoUpload={editNomeArquivoUpload}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>UPLOAD FILE</Text>
          <View style={styles.boxUpload}>
            <View style={styles.containerBackgroundBox}>
              <ImageBackground
                source={FileUploadIcom}
                style={styles.imageBackGroundBox}
              />
            </View>
            <Text style={styles.tituloBox}>Drag & Drop</Text>
          </View>
          <Text style={styles.ouText}>ou</Text>
          <View style={styles.uploadButtonContainer}>
            <ButtonCustom
              style={styles.uploadButton}
              variant="rounded"
              onPress={onPressButtonUpload}
            >
              UPLOAD
            </ButtonCustom>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    paddingHorizontal: "10%",
  },
  HeaderContentContainer: {},
  titulo: {
    fontSize: FONTSIZE.h3,
    color: COLORS.cinza[200],
    textAlign: "center",
    paddingTop: "10%",
    marginBottom: "20%",
  },
  boxUpload: {
    borderWidth: 2,
    borderRadius: 4,
    borderStyle: "dashed",
    borderColor: COLORS.cinza[200],
    padding: "10%",
  },
  containerBackgroundBox: {
    alignItems: "center",
  },
  imageBackGroundBox: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  tituloBox: {
    fontSize: FONTSIZE.h4,
    color: COLORS.azul[200],
    textAlign: "center",
    marginTop: 20,
  },
  ouText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: COLORS.cinza[200],
  },
  uploadButtonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  uploadButton: {
    width: 200,
    backgroundColor: COLORS.azul[200],
  },
  body: {
    flex: 1,
    paddingHorizontal: "10%",
  },
  scrollContainer: {
    flex: 1,
  },
  uploadItemFileStatus: {
    marginTop: 25,
  },
});

export default UploadScreen;
