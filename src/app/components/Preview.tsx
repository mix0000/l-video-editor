import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";
import { useRootStore } from "AppDir/app.store";

export const Preview = observer(() => {
  const {
    ffmpegStore: { currentFile },
  } = useRootStore();

  const currentFileSrc: string | null = useMemo(() => {
    if (!currentFile) {
      return null;
    }
    return URL.createObjectURL(new Blob([currentFile.file.buffer]));
  }, [currentFile]);

  if (!currentFileSrc) {
    return null;
  }

  return (
    <video
      className="video-preview"
      loop={true}
      muted={true}
      controls={true}
      src={currentFileSrc}
    />
  );
});
