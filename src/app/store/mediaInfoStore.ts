import MediaInfoFactory from "mediainfo.js";
import { MediaInfo, ResultObject } from "mediainfo.js/dist/types";
import { makeAutoObservable, runInAction } from "mobx";

interface MediaInfoStore {
  mediaInfo?: MediaInfo | null;
  isReady: boolean;
  fileInfo?: ResultObject | null;
}

export const mediaInfoStore = makeAutoObservable<MediaInfoStore>({
  mediaInfo: null,
  isReady: false,
  fileInfo: null,
});

(async () => {
  const mediaInfo = await MediaInfoFactory({ format: "object" });
  runInAction(() => {
    mediaInfoStore.mediaInfo = mediaInfo;
    mediaInfoStore.isReady = true;
  });
})();
