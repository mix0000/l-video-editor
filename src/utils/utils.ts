import { RcFile } from "antd/es/upload";

export function getFileExtension(path: string): string | undefined {
  const pathRegexp = /(?:\.([^.]+))?$/;

  return path.match(pathRegexp)?.[1];
}

export function getBase64(file: RcFile): string {
  return URL.createObjectURL(file);
}

export function bufferToURLObject(data: ArrayBufferLike, type: string): string {
  return URL.createObjectURL(new Blob([data], { type }));
}

export function getImageFromVideo(video: HTMLVideoElement) {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

  return {
    imageData: ctx.getImageData(0, 0, video.videoHeight, video.videoHeight),
    dataUrl: canvas.toDataURL(),
  };
}

export const readChunk =
  (file: Blob) =>
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

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
