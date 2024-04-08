export interface Usuario {
  uid?: string | number;
  nome?: string;
  email?: string;
}

export type StatusFile= "LOAD" | "CANCEL" | "UPLOADING" | "FINISH" | "ERROR";

export interface ArquivoInfo {
  id?: string;
  nome?: string | null;
  tipo?: string | null;
  tamanho?: number | null;
  data?: number | string |null;
  uri?: string;
}

export type TypeProgressItem = {
  titulo?: string;
  sizeInPercetage?: number;
  size?: string;
};

