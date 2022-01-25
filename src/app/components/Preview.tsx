import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";
import { useRootStore } from "AppDir/app.store";
import { getBase64 } from "../../utils/utils";

export const Preview = observer(() => {
  const {
    fileStore: { file },
  } = useRootStore();

  const src = useMemo(() => {
    if (!file) {
      return null;
    }

    return getBase64(file);
  }, [file]);

  if (!src) {
    return null;
  }

  return <video className="video-preview" loop={true} controls={true} src={src} />;
});
