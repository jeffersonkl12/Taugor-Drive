// Importando instância de autenticação e banco de dados do Firebase
import { auth, db } from "@firebasecore/firebaseConfig";

// Importando códigos de erro personalizados
import { firebaseErrors } from "@constants/errosCode";

// Importando tipo de erro do Firebase e funções relacionadas à autenticação
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

// Importando funções para acessar coleções e documentos do Firestore, e para executar transações
import { collection, doc, runTransaction } from "firebase/firestore";

// Função para registrar um novo usuário com e-mail e senha
export const signupWithEmailAndPasswordService = async (
  email: string,
  senha: string,
  nome: string
): Promise<void> => {
  try {
    // Criando objeto de usuário com nome e e-mail fornecidos
    const user = {
      nome: nome,
      email: email,
    };

    // Executando uma transação no Firestore para criar o usuário
    const userAuth = await runTransaction<UserCredential>(
      db,
      async (transaction) => {
        // Criando o usuário na autenticação do Firebase
        const userAuth = await createUserWithEmailAndPassword(
          auth,
          email,
          senha
        );

        // Obtendo referência para a coleção de usuários no Firestore
        const userCollectionRef = collection(db, "users");

        // Criando referência para o documento do usuário recém-criado
        const userDocRef = doc(userCollectionRef, userAuth.user!.uid);

        // Adicionando os dados do usuário ao documento na transação
        transaction.set(userDocRef, user);

        // Retornando o resultado da criação do usuário na autenticação
        return userAuth;
      }
    );
  } catch (e) {
    // Capturando e tratando erros
    if (e instanceof FirebaseError) {
      // Lançando o erro correspondente ao código de erro ou mensagem padrão
      throw firebaseErrors[e.code] || e.message;
    } else {
      throw e;
    }
  }
};
