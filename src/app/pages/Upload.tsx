import { Button } from "antd";
import { navigate } from "hookrouter";
import { observer } from "mobx-react-lite";
import React from "react";
import { useRootStore } from "AppDir/app.store";
import { Preview } from "AppDir/components/Preview";
import { VideoUpload } from "AppDir/components/Uploader";

export const Upload = observer(({ where }: { where: string }) => {
  const {
    fileStore: { file },
  } = useRootStore();

  return (
    <div className="base-container upload-container">
      <h2>1. Upload your video: </h2>
      <VideoUpload />
      <Preview />
      <Button
        disabled={!file}
        type="primary"
        className="next-button"
        onClick={() => navigate(where)}
      >
        Next
      </Button>
    </div>
  );
});
