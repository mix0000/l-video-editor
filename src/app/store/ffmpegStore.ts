import { createFFmpeg, FFmpeg } from "@ffmpeg/ffmpeg";
import { makeAutoObservable, runInAction } from "mobx";

const ffmpeg = createFFmpeg({
  log: false,
  corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
});

interface FfmpegStore {
  ffmpeg: FFmpeg;
  currentFile: { file: Uint8Array; name: string; type: string } | null;
  isReady: boolean;
}

export const ffmpegStore = makeAutoObservable<FfmpegStore>({
  ffmpeg,
  currentFile: null,
  isReady: ffmpeg.isLoaded(),
});

(async () => {
  await ffmpeg.load();
  runInAction(() => {
    ffmpegStore.isReady = ffmpeg.isLoaded();
  });
})();
