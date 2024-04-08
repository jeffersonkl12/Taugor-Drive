import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RootStackScreenProps } from "@routers/types/types";
import CustomLinearGradient from "@components/customLinearGradient/CustomLinearGradient";
import ButtonCustom from "@components/buttonCustom/ButtonCustom";
import IconCustom from "@components/iconCustom/IconCustom";
import { FONTSIZE } from "@constants/customTheme";
import { loginWithGoogleService } from "@services/loginService";
import { useAuth } from "@context/AuthContext";
import ModalLoad from "@components/modalLoad/ModalLoad";
import GoogleIcon from "@icons/google.png";

type EntryScreenProps = RootStackScreenProps<"Entry">;

const EntryScreen = ({ navigation, route }: EntryScreenProps) => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const onPressButton = (router: "Login" | "Cadastro") => {
    navigation.navigate(router);
  };

  const onPressBUttonLoginWithGoogle = async () => {
    setLoading(true);
    try {
      const usuario = await loginWithGoogleService();
      if (usuario) {
        login({ uid: usuario.uid, nome: usuario.nome, email: usuario.email });
        navigation.navigate("Home");
      }
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalLoad isVisible={loading} />
      <SafeAreaView style={styles.container}>
        <CustomLinearGradient>
          <View style={styles.header}>
            <Text style={styles.title}>
              Bem vindo ao Taugor Drive Application
            </Text>
          </View>
          <View style={styles.body}>
            <ButtonCustom onPress={() => onPressButton("Login")}>
              LOGIN
            </ButtonCustom>
            <ButtonCustom
              onPress={() => onPressButton("Cadastro")}
              variant="outline"
              style={styles.cadastroButton}
            >
              CADASTRO
            </ButtonCustom>
            <View style={styles.loginWithContainer}>
              <Text style={styles.loginWithText}>Login com</Text>
              <View style={styles.socialIconsContainer}>
                <View>
                  <IconCustom
                    source={GoogleIcon}
                    iconSize={30}
                    onPress={onPressBUttonLoginWithGoogle}
                  />
                </View>
              </View>
            </View>
          </View>
        </CustomLinearGradient>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    justifyContent: "flex-end",
    paddingHorizontal: "10%",
  },
  title: {
    color: "white",
    fontSize: FONTSIZE.h1,
  },
  body: {
    flex: 4,
    justifyContent: "flex-end",
    paddingBottom: "10%",
    paddingHorizontal: "10%",
  },
  cadastroButton: {
    marginTop: 15,
  },
  loginWithContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loginWithText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  socialIcon: {
    marginRight: 30,
  },
});

export default EntryScreen;
