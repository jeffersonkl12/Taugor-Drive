import InputCustom from "@components/inputCustom/InputCustom";
import ProgressItem from "@components/progressItem/ProgressItem";
import {
  MimeFileType,
  MIMETYPESAUDIO,
  MIMETYPESIMAGES,
  MIMETYPESTEXTO,
  MIMETYPESVIDEO,
} from "@constants/fileImages";
import { COLORS, FONTSIZE } from "@constants/customTheme";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import IconCustom from "@components/iconCustom/IconCustom";
import FileItem from "@components/fileItem/FileItem";
import { RootParamList } from "@routers/types/types";
import { DrawerScreenProps } from "@react-navigation/drawer";
import Divider from "@components/divider/Divider";
import { useEffect, useState } from "react";
import ButtonCustom from "@components/buttonCustom/ButtonCustom";
import useFetchArquivos from "@hooks/useFetchArquivos";
import { formatBytes } from "@utils/utils";
import { ArquivoInfo, TypeProgressItem } from "@interfaces/app.interfaces";
import ModalInfoFile from "@components/modalInfo/ModalInfoFile";
import LupaIcon from "@icons/lupa.png";
import uploadIcon from "@icons/upload-de-arquivo.png";
import ModalLoad from "@components/modalLoad/ModalLoad";

type HomeScreenProps = DrawerScreenProps<RootParamList>;

type ProgressInfo = Record<string, TypeProgressItem>;

const totalSpaceAvailable = 1 * 1024 * 1024 * 1024;

const windowWidth = Dimensions.get("window").width;

const HomeScreen = ({ navigation, route }: HomeScreenProps) => {
  const {
    itemsArquivo,
    lastVisibleItem,
    allItemsLoaded,
    onFetchitems,
    onSearchFiles,
    resetAllItems,
    calculateTotalSizeByType,
    calculateTotalFileSize,
  } = useFetchArquivos("files");
  const [sizeTotal, setSizeTotal] = useState("");
  const [occupiedPercentage, setoccupiedPercentage] = useState(0);
  const [remainingSpaceBytes, setremainingSpaceBytes] = useState("");
  const [progressInfo, setProgressInfo] = useState<ProgressInfo>({});
  const [textSearchTitle, setTextSearchTitle] = useState("");
  const [arquivoInfo, setArquivoInfo] = useState<ArquivoInfo>();
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  useEffect(() => {
    const calculeTotalSpace = async () => {
      const sizeTotalAux = await calculateTotalFileSize();
      setSizeTotal(sizeTotalAux ? formatBytes(sizeTotalAux) : "0 KB");

      const totalSpace = sizeTotalAux
        ? (sizeTotalAux / totalSpaceAvailable) * 100
        : 0;
      const remainingSpaceBytes = sizeTotalAux
        ? totalSpaceAvailable - sizeTotalAux
        : 0;

      setoccupiedPercentage(totalSpace);
      setremainingSpaceBytes(formatBytes(remainingSpaceBytes));
    };

    getCountSizeByType("Imagens", MIMETYPESIMAGES);
    getCountSizeByType("Audios", MIMETYPESAUDIO);
    getCountSizeByType("Videos", MIMETYPESVIDEO);
    getCountSizeByType("Documentos", MIMETYPESTEXTO);
    calculeTotalSpace();
  }, []);

  const getCountSizeByType = async (type: string, mimeTypes: MimeFileType) => {
    const size = await calculateTotalSizeByType(Object.keys(mimeTypes));
    const progressInfoItem: TypeProgressItem = {
      titulo: type,
      sizeInPercetage: size ? (size / totalSpaceAvailable) * 100 : 0,
      size: size ? formatBytes(size) : "0KB",
    };
    setProgressInfo((prevProgressInfo) => ({
      ...prevProgressInfo,
      [type]: progressInfoItem,
    }));
  };

  const onPressButtonUpload = () => {
    navigation.navigate("Upload");
  };

  const onPressSearchTitle = async () => {
    try {
      if (textSearchTitle !== "") {
        await onSearchFiles(textSearchTitle);
      } else {
        resetAllItems();
        await onFetchitems();
      }
    } catch (e) {
      throw new Error("Algo de errado com a pesquisa: " + e);
    } finally {
    }
  };

  const handleScroll = async () => {
    if (lastVisibleItem) {
      if (allItemsLoaded) return;
      await onFetchitems(lastVisibleItem);
    }
  };

  const onPressItemFile = (arquivo: ArquivoInfo) => {
    setArquivoInfo(arquivo);
    setIsVisibleModal(true);
  };

  const onPressCloseModal = () => {
    setArquivoInfo(undefined);
    setIsVisibleModal(false);
  };

  return (
    <>
      <ModalInfoFile
        arquivo={arquivoInfo}
        isVisible={isVisibleModal}
        closeModal={onPressCloseModal}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.progressContainer}>
            <AnimatedCircularProgress
              size={200}
              width={30}
              fill={occupiedPercentage}
              tintColor={COLORS.verde[600]}
              backgroundColor={COLORS.cinza[100]}
            >
              {() => (
                <Text style={styles.progressTitulo}>{`${sizeTotal}`}</Text>
              )}
            </AnimatedCircularProgress>
          </View>
          <View style={styles.containerInfoEspaco}>
            <Text style={styles.textEspacoRestante}>Espaço Restante</Text>
            <Text style={styles.textEspacoDisponivel}>
              {remainingSpaceBytes}
            </Text>
          </View>
          <View style={styles.itemsProgressContainer}>
            <ProgressItem
              titulo="Imagens"
              progress={progressInfo["Imagens"]?.sizeInPercetage || 0}
              subInfo={progressInfo["Imagens"]?.size || "0KB"}
              colorCircle={COLORS.azul[100]}
              colorProgress={COLORS.azul[100]}
            />

            <ProgressItem
              titulo="Videos"
              progress={progressInfo["Videos"]?.sizeInPercetage || 0}
              subInfo={progressInfo["Videos"]?.size || "0KB"}
              style={styles.itemsProgress}
              colorCircle={COLORS.amarelo[100]}
              colorProgress={COLORS.amarelo[100]}
            />

            <ProgressItem
              titulo="Audios"
              progress={progressInfo["Audios"]?.sizeInPercetage || 0}
              subInfo={progressInfo["Audios"]?.size || "0KB"}
              style={styles.itemsProgress}
              colorCircle={COLORS.verde[500]}
              colorProgress={COLORS.verde[500]}
            />

            <ProgressItem
              titulo="Documentos"
              progress={progressInfo["Documentos"]?.sizeInPercetage || 0}
              subInfo={progressInfo["Documentos"]?.size || "0KB"}
              style={styles.itemsProgress}
              colorCircle={COLORS["azul-marinho"][500]}
              colorProgress={COLORS["azul-marinho"][500]}
            />
          </View>
        </View>
        <View style={styles.body}>
          <Divider color={COLORS.cinza[200]} />

          <InputCustom
            styleContainerInput={styles.inputSearch}
            placeholder="Digite nome do arquivo..."
            rightIcon={
              <IconCustom source={LupaIcon} onPress={onPressSearchTitle} />
            }
            value={textSearchTitle}
            onChangeText={(e) => setTextSearchTitle(e)}
          />

          <View style={styles.containerLista}>
            <FlatList
              data={itemsArquivo}
              onEndReached={handleScroll}
              contentContainerStyle={styles.flatlistContainer}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              renderItem={({ item }) => (
                <View style={styles.fileItemContainer}>
                  <View style={styles.fileItem}>
                    <FileItem
                      arquivo={item}
                      onPress={() => onPressItemFile(item)}
                    />
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.containerButtomUpload}>
            <ButtonCustom onPress={onPressButtonUpload} rightIcon={uploadIcon}>
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
  scrollContainer: {
    flex: 2,
  },
  header: {
    paddingHorizontal: "10%",
    paddingTop: 20,
  },
  progressContainer: {
    alignItems: "center",
  },
  progressTitulo: {
    fontSize: FONTSIZE.h3,
    fontWeight: "bold",
    color: COLORS.azul[200],
  },
  containerInfoEspaco: {
    marginTop: 10,
    alignItems: "center",
  },
  textEspacoRestante: {
    fontSize: 18,
    fontWeight: "300",
  },
  textEspacoDisponivel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: COLORS.azul[200],
  },
  dividerProgress: {
    marginTop: 20,
  },
  itemsProgressContainer: {
    marginTop: 20,
  },
  itemsProgress: {
    marginTop: 5,
  },
  body: {
    flex: 1,
    paddingHorizontal: "10%",
    paddingTop: "5%",
  },
  inputSearch: {
    marginTop: 10,
    height: 50,
  },
  containerLista: {
    flex: 1,
  },
  flatlistContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  fileItemContainer: {
    width: windowWidth / 3.8,
  },
  fileItem: {
    height: 140,
    marginTop: 10,
    padding: 1,
  },
  footer: {
    height: 70,
    marginBottom: 20,
    paddingHorizontal: "10%",
  },
  containerButtomUpload: {
    height: "100%",
    justifyContent: "center",
  },
  containerIsFetchLoad: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
