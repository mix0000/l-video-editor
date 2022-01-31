import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useRootStore } from "AppDir/app.store";
import { outputStore } from "AppDir/store/fileStore";
import { formatBytes } from "../../utils/utils";

const outputByType: Record<string, React.ComponentType<{ src: string }>> = {
  video: ({ src }) => <video loop={true} controls={true} src={src} width="100%" height="100%" />,
  image: ({ src }) => (
    <img
      src={src}
      width="100%"
      style={{ objectFit: "contain", maxWidth: "100%" }}
      alt="output image"
    />
  ),
  audio: ({ src }) => <audio src={src} />,
};

function getOutputByType(mimeType?: string): React.ComponentType<{ src: string }> | null {
  if (!mimeType) {
    return null;
  }

  const [type] = mimeType.split("/");

  return outputByType[type] || null;
}

export const Output = observer(({ showHeader = false }: { showHeader?: boolean }) => {
  const {
    outputStore: { urlObject, extra },
  } = useRootStore();

  useEffect(() => {
    return () => {
      outputStore.empty();
    };
  }, []);

  const Output = getOutputByType(extra?.type);

  return (
    <>
      {showHeader && (
        <div className="header">
          <Title level={3}>Output</Title>
          {extra && <Text type="secondary">Size: {formatBytes(extra.fileSize)}</Text>}
        </div>
      )}
      <div className="preview-wrapper output-wrapper">
        {urlObject && Output ? (
          <Output src={urlObject} />
        ) : (
          <div className="no-file-container">You will see output here</div>
        )}
      </div>
    </>
  );
});
