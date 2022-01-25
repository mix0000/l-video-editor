import { RcFile } from "antd/es/upload";
import { makeAutoObservable } from "mobx";

interface FileStore {
  chunk: Uint8Array | null;
  file: RcFile | null;
  extra: {
    duration: number;
    extension: string;
    fileSize: number;
    framerate: number;
    height: number;
    name: string;
    type: string;
    width: number;
  } | null;
}

export const fileStore = makeAutoObservable<FileStore>({
  chunk: null,
  file: null,
  extra: null,
});
