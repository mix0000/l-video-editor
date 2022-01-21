import { createFFmpeg, FFmpeg } from "@ffmpeg/ffmpeg";
import { makeAutoObservable, runInAction } from "mobx";

const ffmpeg = createFFmpeg({
  log: true,
  corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
});

interface FfmpegStore {
  ffmpeg: FFmpeg;
  currentFile: Uint8Array | null;
  status: boolean;
}

export const ffmpegStore = makeAutoObservable<FfmpegStore>({
  ffmpeg,
  currentFile: null,
  status: ffmpeg.isLoaded(),
});

(async () => {
  await ffmpeg.load();
  runInAction(() => {
    ffmpegStore.status = ffmpeg.isLoaded();
  });
})();
