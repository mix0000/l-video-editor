import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";
import { useRootStore } from "AppDir/app.store";
import { formatBytes, getBase64 } from "../../utils/utils";

export const Preview = observer(({ showHeader = false }: { showHeader?: boolean }) => {
  const {
    fileStore: { file, extra },
  } = useRootStore();

  const src = useMemo(() => {
    if (!file) {
      return null;
    }

    return getBase64(file);
  }, [file]);

  return (
    <>
      {showHeader && (
        <div className="header">
          <Title level={3}>Output</Title>
          {extra && <Text type="secondary">Size: {formatBytes(extra.fileSize)}</Text>}
        </div>
      )}
      <div className="preview-wrapper">
        {src && <video loop={true} controls={true} src={src} width="100%" height="100%" />}
      </div>
    </>
  );
});
