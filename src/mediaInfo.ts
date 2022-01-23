import MediaInfoFactory from "mediainfo.js";
import { MediaInfo } from "mediainfo.js/dist/types";
import { makeAutoObservable, runInAction } from "mobx";

interface MediaInfoStore {
  mediaInfo: MediaInfo | null;
  isReady: boolean;
}

export const mediaInfoStore = makeAutoObservable<MediaInfoStore>({
  mediaInfo: null,
  isReady: false,
});

(async () => {
  const mediaInfo = await MediaInfoFactory();
  runInAction(() => {
    mediaInfoStore.mediaInfo = mediaInfo;
    mediaInfoStore.isReady = true;
  });
})();
