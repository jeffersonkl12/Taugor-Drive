// Importando o hook useState do React
import { useState } from "react";

// Importando o hook useAuth do contexto de autenticação
import { useAuth } from "@context/AuthContext";

// Importando funções do Firestore para manipulação de dados
import { collection, addDoc } from "firebase/firestore";

// Importando instâncias do banco de dados e do armazenamento do Firebase
import { db, storage } from "@firebasecore/firebaseConfig";

// Importando funções e tipos relacionados ao armazenamento do Firebase
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTask,
} from "firebase/storage";

// Importando o tipo de dado ArquivoInfo do arquivo de interfaces
import { ArquivoInfo } from "@interfaces/app.interfaces";

// Importando a função utilitária fileToBlob
import { fileToBlob } from "@utils/utils";

// Definindo o hook personalizado useUploadFile
const useUploadFile = () => {
  // Definindo o estado para armazenar possíveis erros
  const [error, setError] = useState<Error>();

  // Definindo o estado para armazenar o progresso do upload
  const [progress, setProgress] = useState<number>(0);

  // Definindo o estado para armazenar o controle do upload
  const [controlUpload, setControlUpload] = useState<UploadTask | null>(null);

  // Obtendo o estado de autenticação do usuário
  const { authState } = useAuth();

  // Função para fazer upload do arquivo para o Firestore
  const uploadFileFirestore = async (arquivo: ArquivoInfo) => {
    try {
      // Verificando se o arquivo e suas propriedades necessárias estão presentes
      if (!arquivo || !arquivo.uri || !arquivo.tamanho) {
        return null;
      }

      // Definindo o tamanho máximo permitido para o arquivo
      const maxSize = 1024 * 1024 * 1024;

      // Verificando se o tamanho do arquivo excede o limite máximo
      if (arquivo.tamanho > maxSize) {
        setError(new Error("Tamanho do arquivo excede 1GB"));
        return null;
      }

      // Adicionando o arquivo ao Firestore com a referência do usuário
      const docRef = await addDoc(collection(db, "files"), {
        ...arquivo,
        idUser: authState.user?.uid,
      });
    } catch (e) {
      // Capturando e tratando erros caso ocorram
    }
  };

  // Função para fazer upload do arquivo para o armazenamento do Firebase
  const uploadFile = async (arquivo: ArquivoInfo) => {
    // Inicializando o progresso do upload como 0
    setProgress(0);

    // Verificando se o arquivo e suas propriedades necessárias estão presentes
    if (!arquivo || !arquivo.uri || !arquivo.tamanho) {
      return null;
    }

    // Definindo o tamanho máximo permitido para o arquivo (1GB)
    const maxSize = 1024 * 1024 * 1024;

    // Verificando se o tamanho do arquivo excede o limite máximo
    if (arquivo.tamanho > maxSize) {
      setError(new Error("Tamanho do arquivo excede 1GB"));
      return null;
    }

    try {
      // Obtendo a referência no armazenamento do Firebase para o arquivo
      const storageRef = ref(
        storage,
        `files/${authState.user?.uid}/${arquivo.nome}`
      );

      // Convertendo o arquivo para o formato blob para upload
      const file = await fileToBlob(arquivo.uri);

      // Iniciando o upload do arquivo para o armazenamento do Firebase
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Definindo o controle de upload para monitoramento
      setControlUpload(uploadTask);

      // Monitorando o progresso do upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload: " + progress + "% done");
          setProgress(progress);
        },
        (error) => {
          // Capturando e tratando erros durante o upload
          setError(error);
        },
        async () => {
          // Obtendo a URL de download do arquivo após o upload
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setControlUpload(null);
        }
      );
    } catch (e) {
      // Capturando e tratando erros caso ocorram
      if (e instanceof Error) {
        setError(e);
      }
    }
  };

  // Função para cancelar o upload do arquivo
  const cancelUpload = () => {
    try {
      // Verificando se existe um controle de upload
      if (controlUpload) {
        // Cancelando o upload
        controlUpload.cancel();
      }
    } catch (e) {
      // Capturando e tratando erros caso ocorram
      if (e instanceof Error) {
        setError(e);
      }
    } finally {
      // Resetando o controle de upload
      setControlUpload(null);
    }
  };

  // Retornando os estados e funções necessárias para utilização externa
  return {
    progress,
    error,
    uploadFile,
    uploadFileFirestore,
    cancelUpload,
  };
};

// Exportando o hook useUploadFile
export default useUploadFile;
