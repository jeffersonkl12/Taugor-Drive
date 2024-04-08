// Importando o módulo de autenticação do Firebase
import { auth } from "@firebasecore/firebaseConfig";

// Importando códigos de erro personalizados e tipos de erro do Firebase
import { firebaseErrors } from "@constants/errosCode";
import { FirebaseError } from "firebase/app";

// Importando função para enviar e-mails de redefinição de senha do Firebase Auth
import { sendPasswordResetEmail } from "firebase/auth";

// Definindo o serviço forgetPasswordService para recuperar senhas
export const forgetPasswordService = async (email: string) => {
  try {
    // Enviando o e-mail de redefinição de senha usando a função fornecida pelo Firebase Auth
    await sendPasswordResetEmail(auth, email);
  } catch (e) {
    // Capturando e tratando erros
    if (e instanceof FirebaseError) {
      // Verificando se o erro é um FirebaseError e lançando o erro correspondente
      throw firebaseErrors[e.code] || e.message;
    } else {
      // Lançando o erro caso não seja um FirebaseError
      throw e;
    }
  }
};
