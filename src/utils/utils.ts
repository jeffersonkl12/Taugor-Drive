export const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";

  const k: number = 1024;
  const sizes: string[] = [
    "Bytes",
    "KB",
    "MB",
    "GB",
    "TB",
    "PB",
    "EB",
    "ZB",
    "YB",
  ];

  const i: number = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const fileToBlob = (uri: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = (error) => {
      reject(error);
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
};

export const limitText = (texto: string, MAX_LENGTH_TITLE: number) => {
  return  texto.length > MAX_LENGTH_TITLE
      ? texto.slice(0, MAX_LENGTH_TITLE).concat("...")
      : texto;
};
