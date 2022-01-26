import { Button, PageHeader } from "antd";
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
      <PageHeader
        className="site-page-header"
        title="1. Upload your video"
        extra={
          <Button
            disabled={!file}
            type="primary"
            className="next-button"
            onClick={() => navigate(where)}
          >
            Next
          </Button>
        }
      />
      <VideoUpload />
      <Preview />
    </div>
  );
});
