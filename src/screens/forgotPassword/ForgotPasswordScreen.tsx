import ButtonCustom from "@components/buttonCustom/ButtonCustom";
import ClickableText from "@components/clickableText/ClickableText";
import CustomLinearGradient from "@components/customLinearGradient/CustomLinearGradient";
import InputCustom from "@components/inputCustom/InputCustom";
import ModalLoad from "@components/modalLoad/ModalLoad";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootStackScreenProps } from "@routers/types/types";
import { forgetPasswordService } from "@services/forGetPasswordService";
import { COLORS, FONTSIZE } from "@constants/customTheme";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { object, string } from "yup";

type EntryScreenProps = RootStackScreenProps<"Esqueci-Senha">;
type UserEmail = { email: string };

const ForgotPasswordScreen = ({ navigation, route }: EntryScreenProps) => {
  const [loading, setLoading] = useState(false);

  let userSchema = object({
    email: string()
      .required("Email não pode ser vazio")
      .email("Email deve ser valido"),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserEmail>({
    resolver: yupResolver(userSchema),
  });

  const onPressOnClickable = () => {
    navigation.navigate("Login");
  };
  const onPressButtonResetEmail = async ({ email }: UserEmail) => {
    setLoading(true);
    try {
      await forgetPasswordService(email);
      reset();
      navigation.navigate("Login");
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
            <View>
              <Text style={styles.title}>Recuperar a senha</Text>
              <Text style={styles.subtitle}>Recupere sua senha por e-mail</Text>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.inputContainer}>
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onBlur, onChange } }) => (
                  <InputCustom
                    placeholder="Digite o email..."
                    label="Email:"
                    value={value}
                    onChangeText={onChange}
                    onChangeBlur={onBlur}
                  />
                )}
              />

              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
              <View style={styles.containerButton}>
                <ButtonCustom onPress={handleSubmit(onPressButtonResetEmail)}>
                  CONTINUAR
                </ButtonCustom>
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.registerContainer}>
              <Text style={styles.notMemberText}>Lembrou da senha ?</Text>
              <ClickableText
                onPress={onPressOnClickable}
                style={styles.registerText}
              >
                Faça login
              </ClickableText>
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
    paddingHorizontal: "10%",
    justifyContent: "flex-end",
  },
  title: {
    color: "white",
    fontSize: FONTSIZE.h1,
    fontWeight: "bold",
  },
  subtitle: {
    color: "white",
    fontSize: FONTSIZE.h4,
    fontWeight: "300",
    marginTop: 10,
  },
  body: {
    flex: 4,
    paddingHorizontal: "10%",
    justifyContent: "center",
  },
  inputContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginTop: "15%",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  containerButton: {
    justifyContent: "center",
    marginTop: 10,
    minHeight: 60,
  },
  footer: {
    flex: 2,
    paddingHorizontal: "10%",
    justifyContent: "center",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20%",
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

export default ForgotPasswordScreen;
