import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import ButtonCustom from "@components/buttonCustom/ButtonCustom";
import CustomLinearGradient from "@components/customLinearGradient/CustomLinearGradient";
import InputCustom from "@components/inputCustom/InputCustom";
import { RootStackScreenProps } from "@routers/types/types";
import { FONTSIZE } from "@constants/customTheme";
import { signupWithEmailAndPasswordService } from "@services/signupService";
import { Controller, useForm } from "react-hook-form";
import { object, ref, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalLoad from "@components/modalLoad/ModalLoad";

type EntryScreenProps = RootStackScreenProps<"Cadastro">;
type Usuario = {
  nome: string;
  email: string;
  senha: string;
  repetirSenha: string;
};

const SignupScreen = ({ navigation, route }: EntryScreenProps) => {
  const [loading, setLoading] = useState(false);

  let userSchema = object({
    nome: string().required("Nome não pode ser vazio"),
    email: string()
      .required("Email não pode ser vazio")
      .email("Email deve ser valido"),
    senha: string()
      .required("Senha não pode ser vazio")
      .min(6, "A senha deve ter no mínimo 6"),
    repetirSenha: string()
      .required("Senha não pode ser vazio")
      .oneOf([ref("senha"), ""], "As senhas devem corresponder"),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Usuario>({
    resolver: yupResolver(userSchema),
  });

  const onPressSignupButton = async ({ nome, email, senha }: Usuario) => {
    setLoading(true);
    try {
      await signupWithEmailAndPasswordService(email, senha, nome);
      reset();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
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
            <Text style={styles.title}>Cadastro</Text>
            <Text style={styles.subtitle}>Crie sua conta</Text>
          </View>
          <View style={styles.scrollContainer}>
            <ScrollView contentContainerStyle={styles.scrollMainContent}>
              <View style={styles.body}>
                <View style={styles.formContainer}>
                  <Controller
                    control={control}
                    name="nome"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <InputCustom
                        placeholder="Digite o nome..."
                        label="Nome:"
                        type="text"
                        value={value}
                        onChangeBlur={onBlur}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  <View style={styles.input}>
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
                  </View>
                  <View style={styles.input}>
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
                  </View>
                  <View style={styles.input}>
                    <Controller
                      control={control}
                      name="repetirSenha"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <InputCustom
                          placeholder="Digite novamente a senha..."
                          label="Repetir senha:"
                          type="password"
                          value={value}
                          secure
                          onChangeBlur={onBlur}
                          onChangeText={onChange}
                        />
                      )}
                    />
                  </View>
                  <View style={styles.containerButton}>
                    <ButtonCustom onPress={handleSubmit(onPressSignupButton)}>
                      CONTINUAR
                    </ButtonCustom>
                  </View>
                </View>
              </View>
            </ScrollView>
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
    fontWeight: "300",
    fontSize: FONTSIZE.h4,
    marginTop: 10,
  },
  scrollContainer: {
    flex: 6,
  },
  scrollMainContent: {
    flexGrow: 1,
  },
  body: {
    flex: 4,
    paddingHorizontal: "10%",
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginTop: "5%",
  },
  input: {
    marginTop: 20,
  },
  containerButton: {
    justifyContent: "center",
    marginTop: 40,
    minHeight: 60,
  },
  footer: {
    flex: 2,
    paddingHorizontal: "10%",
    justifyContent: "center",
  },
  socialContainer: {
    marginTop: "10%",
    alignItems: "center",
    paddingBottom: 30,
  },
  socialText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
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
});

export default SignupScreen;
