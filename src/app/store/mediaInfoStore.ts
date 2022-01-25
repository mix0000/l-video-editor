import MediaInfoFactory from "mediainfo.js";
import { MediaInfo, ResultObject } from "mediainfo.js/dist/types";
import { makeAutoObservable, runInAction } from "mobx";

interface MediaInfoStore {
  mediaInfo?: MediaInfo;
  isReady: boolean;
  fileInfo?: ResultObject;
}

export const mediaInfoStore = makeAutoObservable<MediaInfoStore>({
  isReady: false,
});

(async () => {
  const mediaInfo = await MediaInfoFactory({ format: "object" });
  runInAction(() => {
    mediaInfoStore.mediaInfo = mediaInfo;
    mediaInfoStore.isReady = true;
  });
})();
