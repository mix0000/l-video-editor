import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import { observer } from "mobx-react-lite";
import React from "react";
import { useRootStore } from "AppDir/app.store";
import { formatBytes } from "../../utils/utils";

export const Output = observer(({ showHeader = false }: { showHeader?: boolean }) => {
  const {
    outputStore: { urlObject, extra },
  } = useRootStore();

  return (
    <>
      {showHeader && (
        <div className="header">
          <Title level={3}>Output</Title>
          {extra && <Text type="secondary">Size: {formatBytes(extra.fileSize)}</Text>}
        </div>
      )}
      <div className="preview-wrapper output-wrapper">
        {urlObject ? (
          // <video loop={true} controls={true} src={urlObject} width="100%" height="100%" />
          <img src={urlObject} width="100%" style={{ objectFit: "contain", maxWidth: "100%" }} />
        ) : (
          <div className="no-file-container">You will see output here</div>
        )}
      </div>
    </>
  );
});
