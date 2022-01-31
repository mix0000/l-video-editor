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

interface OutputStore extends Omit<FileStore, "file" | "chunk" | "extra"> {
  urlObject: string | null;
  extra: {
    fileSize: number;
    width: number;
    height: number;
    type: string;
    extension: string;
    name: string;
  } | null;
  empty(): void;
}

export const outputStore = makeAutoObservable<OutputStore>({
  extra: null,
  urlObject: null,
  empty() {
    this.extra = null;
    this.urlObject = null;
  },
});
