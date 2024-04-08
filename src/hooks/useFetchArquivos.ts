// Hook personalizado para buscar arquivos no Firestore do Firebase
import { useAuth } from "@context/AuthContext"; // Importando hook de autenticação
import { db } from "@firebasecore/firebaseConfig"; // Importando conexão com o banco de dados Firestore
import { ArquivoInfo } from "@interfaces/app.interfaces"; // Importando tipo de dados para informações de arquivo
import { FirebaseError } from "firebase/app"; // Importando tipo de erro do Firebase
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  getDocs,
  where,
} from "firebase/firestore"; // Importando funções do Firestore
import { useEffect, useState } from "react"; // Importando hook de efeitos e estado

const useFetchArquivos = (path: string) => {
  const [itemsArquivo, setItens] = useState<ArquivoInfo[]>([]); // Estado para armazenar os arquivos
  const [lastVisibleItem, setLastVisibleItem] =
    useState<QueryDocumentSnapshot | null>(null); // Estado para armazenar o último item visível
  const [isFetching, setIsFetching] = useState(false); // Estado para indicar se está buscando arquivos
  const [allItemsLoaded, setAllItemsLoaded] = useState(false); // Estado para indicar se todos os arquivos foram carregados
  const { authState } = useAuth(); // Estado de autenticação do usuário

  // Efeito que é executado uma vez no início para buscar os arquivos
  useEffect(() => {
    setIsFetching(true);
    try {
      onFetchitems();
    } catch (e) {
      throw e;
    } finally {
      setIsFetching(false);
    }
  }, []);

  // Função para buscar os arquivos
  const onFetchitems = async (lastVisibleItem?: QueryDocumentSnapshot) => {
    setIsFetching(true);
    try {
      await fetchItems(lastVisibleItem);
    } catch (e) {
      throw e;
    } finally {
      setIsFetching(false);
    }
  };

  // Função principal para buscar os arquivos
  const fetchItems = async (lastVisibleItem?: QueryDocumentSnapshot) => {
    if (isFetching) return;

    const auxItems = lastVisibleItem ? itemsArquivo.slice() : [];

    try {
      let itemsRef = collection(db, path);
      let q = query(
        itemsRef,
        limit(50),
        where("idUser", "==", authState.user?.uid)
      );

      if (lastVisibleItem) {
        q = query(q, startAfter(lastVisibleItem));
      }

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setAllItemsLoaded(true);
        return;
      }

      querySnapshot.forEach((doc) => {
        auxItems.push({ id: doc.id, ...doc.data() } as ArquivoInfo);
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisibleItem(lastVisible);

      setItens(auxItems);
    } catch (e) {
      console.error("Erro ao buscar itens:", e);
      if (e instanceof FirebaseError) {
        throw e;
      }
      throw e;
    }
  };

  // Função para buscar arquivos por termo de busca
  const onSearchFiles = async (
    searchTerm: string,
    lastVisibleItem?: QueryDocumentSnapshot
  ) => {
    setIsFetching(true);
    try {
      await searchFiles(searchTerm, lastVisibleItem);
    } catch (e) {
      throw e;
    } finally {
      setIsFetching(false);
    }
  };

  // Função principal para buscar arquivos por termo de busca
  const searchFiles = async (
    searchTerm: string,
    lastVisibleItem?: QueryDocumentSnapshot
  ) => {
    if (isFetching) return;

    try {
      let itemsRef = collection(db, path);
      let q = query(
        itemsRef,
        where("nome", ">=", searchTerm),
        where("idUser", "==", authState.user?.uid),
        orderBy("nome"),
        limit(50)
      );

      if (lastVisibleItem) {
        q = query(q, startAfter(lastVisibleItem));
      }

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setAllItemsLoaded(true);
        return;
      }

      const filteredFiles: ArquivoInfo[] = [];
      querySnapshot.forEach((doc) => {
        const fileData = doc.data();
        if (
          typeof fileData.nome === "string" &&
          fileData.nome.match(new RegExp(searchTerm, "i"))
        ) {
          filteredFiles.push({ id: doc.id, ...fileData } as ArquivoInfo);
        }
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisibleItem(lastVisible);
      setItens(filteredFiles);
    } catch (error) {
      console.error("Erro ao buscar arquivos:", error);
      throw error;
    }
  };

  // Função para calcular o tamanho total por tipo de arquivo
  const calculateTotalSizeByType = async (mimes: string[]) => {
    try {
      let tamanhoTotal = 0;
      for (const mime of mimes) {
        const itemsRef = collection(db, "files");
        const q = query(
          itemsRef,
          where("tipo", "==", mime),
          where("idUser", "==", authState.user?.uid)
        );

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const arquivo = doc.data() as ArquivoInfo;
          if (arquivo.tamanho) {
            tamanhoTotal += arquivo.tamanho;
          }
        });
      }

      return tamanhoTotal;
    } catch (e) {
      console.error("Erro ao calcular tamanho total por tipo:", e);
      if (e instanceof FirebaseError) {
        throw e;
      }
      return null;
    }
  };

  // Função para calcular o tamanho total de todos os arquivos
  const calculateTotalFileSize = async () => {
    try {
      let totalSize = 0;

      const itemsRef = collection(db, "files");
      let q = query(itemsRef, where("idUser", "==", authState.user?.uid));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const arquivo = doc.data() as ArquivoInfo;
        if (arquivo.tamanho) {
          totalSize += arquivo.tamanho;
        }
      });

      return totalSize;
    } catch (e) {
      console.error("Erro ao calcular tamanho total de todos os arquivos:", e);
      return null;
    }
  };

  // Função para resetar todos os itens
  const resetAllItems = () => {
    setAllItemsLoaded(false);
    setLastVisibleItem(null);
  };

  // Retornando os estados e funções necessárias para utilização externa
  return {
    isFetching,
    itemsArquivo,
    lastVisibleItem,
    allItemsLoaded,
    onFetchitems,
    calculateTotalSizeByType,
    calculateTotalFileSize,
    onSearchFiles,
    resetAllItems,
  };
};

export default useFetchArquivos;
