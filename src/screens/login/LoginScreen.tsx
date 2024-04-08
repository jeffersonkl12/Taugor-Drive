import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ButtonCustom from "@components/buttonCustom/ButtonCustom";
import ClickableText from "@components/clickableText/ClickableText";
import CustomLinearGradient from "@components/customLinearGradient/CustomLinearGradient";
import InputCustom from "@components/inputCustom/InputCustom";
import { RootStackScreenProps } from "@routers/types/types";
import { COLORS, FONTSIZE } from "@constants/customTheme";
import {
  loginWithEmailAndPasswordService,
  loginWithGoogleService,
} from "@services/loginService";
import { Controller, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { showErrorModal } from "@services/ErrorModalService";
import IconCustom from "@components/iconCustom/IconCustom";
import Divider from "@components/divider/Divider";
import { useAuth } from "@context/AuthContext";
import ModalLoad from "@components/modalLoad/ModalLoad";
import GoogleIcon from "@icons/google.png";

type EntryScreenProps = RootStackScreenProps<"Login">;

type UsuarioFields = {
  email: string;
  senha: string;
};

const LoginScreen = ({ navigation, route }: EntryScreenProps) => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  let userSchema = object({
    email: string()
      .required("Email não pode ser vazio")
      .email("Email deve ser valido"),
    senha: string()
      .required("Senha não pode ser vazio")
      .min(6, "A senha deve ter no mínimo 6"),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UsuarioFields>({
    resolver: yupResolver(userSchema),
  });

  const onPressLoginButton = async ({ email, senha }: UsuarioFields) => {
    setLoading(true);

    try {
      const usuario = await loginWithEmailAndPasswordService(email, senha);
      if (usuario) {
        reset();
        login({ email: usuario.email, nome: usuario.nome, uid: usuario.uid });
        navigation.navigate("Home");
      }
    } catch (e) {
      if (e instanceof Error) {
        showErrorModal(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onPressLoginGoole = async () => {
    setLoading(true);

    try {
      const usuario = await loginWithGoogleService();
      if (usuario) {
        reset();
        login({ email: usuario.email, nome: usuario.nome, uid: usuario.uid });
        navigation.navigate("Home");
      }
    } catch (e) {
      if (e instanceof Error) {
        showErrorModal(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onPressOnClickable = (path: "Cadastro" | "Esqueci-Senha") => {
    navigation.navigate(path);
  };

  return (
    <>
      <ModalLoad isVisible={loading} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <CustomLinearGradient>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Login</Text>
              <Text style={styles.subtitle}>Olá, bem-vindo de volta</Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.inputContainer}>
              <View>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputCustom
                      placeholder="Digite o email..."
                      label="Email:"
                      type="email"
                      value={value}
                      onChangeBlur={onBlur}
                      onChangeText={onChange}
                    />
                  )}
                />

                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
              </View>

              <View style={styles.passwordInput}>
                <Controller
                  control={control}
                  name="senha"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputCustom
                      placeholder="Digite a senha..."
                      label="Senha:"
                      type="password"
                      value={value}
                      secure
                      onChangeBlur={onBlur}
                      onChangeText={onChange}
                    />
                  )}
                />
                {errors.senha && (
                  <Text style={styles.errorText}>{errors.senha.message}</Text>
                )}
              </View>
              <View style={styles.containerButton}>
                <ButtonCustom onPress={handleSubmit(onPressLoginButton)}>
                  CONTINUAR
                </ButtonCustom>
              </View>
              <View style={styles.socialContainer}>
                <Divider />
                <View style={styles.socialIcons}>
                  <View>
                    <IconCustom
                      source={GoogleIcon}
                      iconSize={30}
                      onPress={onPressLoginGoole}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <ClickableText
                style={styles.forgotPasswordText}
                onPress={() => onPressOnClickable("Esqueci-Senha")}
              >
                Esqueci a Senha
              </ClickableText>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.registerContainer}>
              <Text style={styles.notMemberText}>Não é um membro ?</Text>
              <ClickableText
                onPress={() => onPressOnClickable("Cadastro")}
                style={styles.registerText}
              >
                Cadastre-se
              </ClickableText>
            </View>
          </View>
        </CustomLinearGradient>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    paddingHorizontal: "10%",
    justifyContent: "flex-end",
  },
  titleContainer: {
    flex: 2,
    justifyContent: "flex-end",
  },
  title: {
    color: "white",
    fontSize: FONTSIZE.h1,
    fontWeight: "bold",
  },
  subtitle: {
    color: "white",
    fontWeight: "300",
    fontSize: FONTSIZE.h4,
    marginTop: 10,
  },
  body: {
    flex: 4,
    paddingHorizontal: "10%",
  },
  inputContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginTop: "15%",
  },
  passwordInput: {
    marginTop: 20,
  },
  containerButton: {
    justifyContent: "center",
    marginTop: 10,
    minHeight: 60,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  socialContainer: {
    marginTop: "5%",
    alignItems: "center",
    paddingBottom: 30,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  iconContainer: {
    marginRight: 30,
  },
  forgotPasswordText: {
    color: "white",
    marginTop: 15,
    textAlign: "right",
  },
  footer: {
    flex: 2,
    paddingHorizontal: "10%",
    justifyContent: "flex-end",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: "8%",
  },
  notMemberText: {
    fontSize: 16,
    color: "white",
    marginRight: 4,
  },
  registerText: {
    color: COLORS.laranja["500"],
  },
});

export default LoginScreen;
