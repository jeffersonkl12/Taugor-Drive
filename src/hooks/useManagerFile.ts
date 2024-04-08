// Importando o DocumentPicker do pacote react-native-document-picker
import DocumentPicker from "react-native-document-picker";

// Importando o FileSystem do pacote react-native-file-access
import { FileSystem } from "react-native-file-access";

// Importando o tipo de dado ArquivoInfo do arquivo de interfaces
import { ArquivoInfo } from "@interfaces/app.interfaces";

// Importando o hook useState do React
import { useState } from "react";

// Definindo o hook personalizado useManagerFile
const useManagerFile = () => {
  // Definindo o estado para armazenar possíveis erros
  const [error, setError] = useState<Error | null>();

  // Função para selecionar um documento
  const pickDocument = async () => {
    try {
      // Tentativa de selecionar um único documento
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
        copyTo: "cachesDirectory",
      });

      // Verificando se o documento foi selecionado com sucesso
      if (result.fileCopyUri) {
        // Obtendo informações sobre o arquivo selecionado
        const fileInfo = await FileSystem.stat(result.fileCopyUri);

        // Convertendo a data de modificação do arquivo para o formato desejado
        const data = new Date(fileInfo.lastModified);

        // Criando um objeto ArquivoInfo com as informações do arquivo selecionado
        const arquivo: ArquivoInfo = {
          nome: result.name,
          tipo: result.type,
          tamanho: fileInfo.size,
          data: `${data.getDay()}/${data.getMonth()}/${data.getFullYear()}`,
          uri: result.uri,
        };

        // Retornando o objeto ArquivoInfo
        return arquivo;
      }
    } catch (e) {
      // Capturando possíveis erros durante a seleção do documento
      if (DocumentPicker.isCancel(e)) {
        // Ação a ser realizada caso a seleção do documento seja cancelada
      } else {
        // Ação a ser realizada caso ocorra outro tipo de erro
        if (e instanceof Error) {
          setError(e);
        }

        // Lançando o erro para ser tratado externamente
        throw e;
      }
    }
  };

  // Retornando a função pickDocument e o estado de erro
  return { pickDocument, error };
};

// Exportando o hook useManagerFile
export default useManagerFile;
