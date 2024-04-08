// Importando provedores de autenticação do Firebase e funções relacionadas
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Importando funções para acessar documentos do Firestore
import { doc, getDoc } from "firebase/firestore";

// Importando instância de autenticação e banco de dados do Firebase
import { auth, db } from "@firebasecore/firebaseConfig";

// Importando tipo de erro do Firebase e códigos de erro personalizados
import { FirebaseError } from "firebase/app";
import { firebaseErrors } from "@constants/errosCode";

// Importando módulo de autenticação do Google Sign-In para React Native
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// Importando interface de usuário
import { Usuario } from "@interfaces/app.interfaces";

// Função para realizar login com o Google
export const loginWithGoogleService = async () => {
  // Configurando o Google Sign-In
  GoogleSignin.configure({
    offlineAccess: false,
    webClientId:
      "463824073258-g259pob7pret5k3ou6it58pc8t814s02.apps.googleusercontent.com",
  });

  try {
    // Verificando se os serviços do Google Play estão disponíveis
    await GoogleSignin.hasPlayServices();

    // Realizando o login com o Google e obtendo o token de ID
    const { idToken } = await GoogleSignin.signIn();

    // Criando credencial com o token de ID do Google
    const credential = GoogleAuthProvider.credential(idToken);

    // Autenticando com a credencial
    const userCredential = await signInWithCredential(auth, credential);

    // Obtendo informações do usuário autenticado
    const user = userCredential.user;

    // Criando objeto de usuário com informações necessárias
    const usuario: Usuario = {
      uid: user.uid,
      email: user.email || undefined,
      nome: user.displayName || undefined,
    };

    return usuario;
  } catch (e) {
    // Capturando e tratando erros
    console.log(e);
    throw e;
  }
};

// Função para realizar login com e-mail e senha
export const loginWithEmailAndPasswordService = async (
  email: string,
  senha: string
) => {
  try {
    // Realizando login com e-mail e senha
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);

    // Obtendo informações do usuário autenticado
    const user = userCredential.user;

    if (user) {
      // Verificando se os dados do usuário existem no Firestore
      const userData = await getDoc(doc(db, "users", user.uid));

      if (userData.exists()) {
        // Criando objeto de usuário com informações necessárias
        const usuario: Usuario = {
          uid: user.uid,
          email: user.email || undefined,
          nome: userData.data().nome,
        };
        return usuario;
      } else {
        throw new Error("Dados de usuário não encontrado!");
      }
    }
  } catch (e) {
    // Capturando e tratando erros
    if (e instanceof FirebaseError) {
      console.log(firebaseErrors[e.code]);
      throw new Error(firebaseErrors[e.code]) || new Error(e.message);
    } else {
      throw e;
    }
  }
};
