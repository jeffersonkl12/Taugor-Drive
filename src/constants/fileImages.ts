import { ImageSourcePropType } from "react-native";

export type FileType =
  | "image"
  | "audio"
  | "text"
  | "video"
  | "other";

export const FILEIMAGES: Record<FileType, ImageSourcePropType> = {
    image: require("@icons/arquivo-png.png"),
    audio: require("@icons/arquivo-musica.png"),
    text: require("@icons/arquivo-txt.png"),
    video: require("@icons/arquivo-video.png"),
    other: require("@icons/documento.png"),
  };

  export type MimeFileType = {
    [key: string]: FileType;
  };
  
  export const MIMETYPES: MimeFileType = {
    "image/jpeg": "image",
    "image/png": "image",
    "image/gif": "image",
    "image/bmp": "image",
    "image/webp": "image",
    "audio/mpeg": "audio",
    "audio/ogg": "audio",
    "audio/wav": "audio",
    "audio/webm": "audio",
    "text/plain": "text",
    "text/html": "text",
    "text/css": "text",
    "text/javascript": "text",
    "application/json": "text",
    "application/pdf": "text",
    "video/mp4": "video",
    "video/mpeg": "video",
    "video/ogg": "video",
    "video/webm": "video",
  };

  export const MIMETYPESIMAGES: MimeFileType = {
    "image/jpeg": "image",
    "image/png": "image",
    "image/gif": "image",
    "image/bmp": "image",
    "image/webp": "image",
  };

  export const MIMETYPESVIDEO: MimeFileType = {
    "video/mp4": "video",
    "video/mpeg": "video",
    "video/ogg": "video",
    "video/webm": "video",
  };

  export const MIMETYPESAUDIO: MimeFileType = {
    "audio/mpeg": "audio",
    "audio/ogg": "audio",
    "audio/wav": "audio",
    "audio/webm": "audio",
  };

  export const MIMETYPESTEXTO: MimeFileType = {
    "text/plain": "text",
    "text/html": "text",
    "text/css": "text",
    "text/javascript": "text",
    "application/pdf": "text",
  };
  