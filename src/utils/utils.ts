import { RcFile } from "antd/es/upload";

export function getFileExtension(path: string): string | undefined {
  const pathRegexp = /(?:\.([^.]+))?$/;

  return path.match(pathRegexp)?.[1];
}

export function getBase64(file: RcFile): string {
  return URL.createObjectURL(file);
}

export const readChunk =
  (file: RcFile) =>
  (chunkSize: number, offset: number): Promise<Uint8Array> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event?.target?.error) {
          return reject(event.target.error);
        }
        resolve(new Uint8Array(event?.target?.result as unknown as ArrayBufferLike));
      };
      reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize));
    });
