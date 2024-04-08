import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { View } from "react-native";
import { COLORS } from "@constants/customTheme";
import { FILEIMAGES, MIMETYPES } from "@constants/fileImages";
import { ArquivoInfo } from "@interfaces/app.interfaces";
import { limitText } from "@utils/utils";

interface Props {
  arquivo: ArquivoInfo;
  style?: ViewStyle;
  onPress?: () => void;
}

const FileItem = ({ arquivo, style, onPress }: Props) => {

  const tituloExibido = arquivo && arquivo.nome ? limitText(arquivo.nome,14): "";

  const image =
    arquivo && arquivo.tipo
      ? FILEIMAGES[MIMETYPES[arquivo.tipo]]
      : FILEIMAGES["other"];

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.container, style]}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={image} />
          </View>

          <Text style={styles.titulo}>{tituloExibido}</Text>
          <Text style={styles.data}>{arquivo.data}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  titulo: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
    marginTop: 5,
  },
  data: {
    fontSize: 14,
    textAlign: "center",
    color: COLORS.cinza["200"],
    marginTop: 5,
  },
});

export default FileItem;
