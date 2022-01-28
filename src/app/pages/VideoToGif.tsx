import { CloudDownloadOutlined, GifOutlined } from "@ant-design/icons";
import { fetchFile } from "@ffmpeg/ffmpeg";
import { Button, Col, Divider, Input, InputNumber, message, PageHeader, Row, Slider } from "antd";
import Title from "antd/es/typography/Title";
import { debounce } from "lodash";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useRootStore } from "AppDir/app.store";
import { Output } from "AppDir/components/Output";
import { Preview } from "AppDir/components/Preview";
import { ffmpegStore } from "AppDir/store/ffmpegStore";
import { fileStore, outputStore } from "AppDir/store/fileStore";
import { mediaInfoStore } from "AppDir/store/mediaInfoStore";
import { bufferToURLObject, downloadURI, readChunk } from "../../utils/utils";

function findRatio(a: number, b: number): number {
  return b == 0 ? a : findRatio(b, a % b);
}

function increaseWidthByHeight(w: number, h: number, newHeight: number): number {
  return (w / h) * newHeight;
}

function increaseHeightByWidth(w: number, h: number, newWidth: number): number {
  return (h / w) * newWidth;
}

function download() {
  const { urlObject } = outputStore;
  const { extra } = fileStore;

  if (!urlObject || !extra) {
    message.error("There is nothing to download");
    return;
  }

  downloadURI(urlObject, extra.name);
}

async function convertFileToGif(width: number, height: number, fps: number) {
  const { ffmpeg } = ffmpegStore;
  const { file, extra } = fileStore;
  const { mediaInfo } = mediaInfoStore;
  ffmpeg.setLogger(({ type, message }) => {
    console.log(type, message);
  });
  const chunkFile = await fetchFile(file!);
  const inputFileName = "video";
  const inputFullName = `${inputFileName}.${extra?.extension}`;
  const gifFullName = `${inputFileName}.gif`;

  ffmpeg.FS("writeFile", inputFullName, chunkFile);
  await ffmpeg.run(
    "-i",
    inputFullName,
    "-vf",
    `fps=${fps},scale=${width}:${height}:flags=lanczos`,
    gifFullName,
  );
  const data = ffmpeg.FS("readFile", gifFullName);
  const urlObject = bufferToURLObject(data.buffer, "image/gif");

  runInAction(() => {
    outputStore.urlObject = urlObject;
  });

  const result = await mediaInfo?.analyzeData(
    () => data.buffer.byteLength,
    readChunk(new Blob([data])),
  );

  if (typeof result === "object") {
    const imageInfo = result?.media?.track.find((track) => track["@type"] === "Image");
    const extra = {
      fileSize: data.buffer.byteLength,
      width: Number(imageInfo?.Width) || 0,
      height: Number(imageInfo?.Height) || 0,
      type: "image/gif",
      extension: "gif",
      name: gifFullName,
    };

    runInAction(() => {
      outputStore.extra = extra;
    });
  }
}

export const VideoToGif = observer(() => {
  const {
    fileStore: { extra },
  } = useRootStore();
  const [maxFps] = useState(() => extra?.framerate || 10);
  const [maxWidth] = useState(() => extra?.width || 640);
  const [maxHeight] = useState(() => extra?.height || 480);
  const [fpsValue, setFpsValue] = useState(maxFps);
  const [width, setWidth] = useState(maxWidth);
  const [height, setHeight] = useState(maxHeight);

  const onFpsChange = (value: number) => {
    setFpsValue(value);
  };

  if (!extra) {
    return null;
  }

  const onWidthChange = debounce((newWidth: number | null) => {
    if (newWidth === null) {
      return;
    }
    setHeight(increaseHeightByWidth(width, height, newWidth));
    setWidth(newWidth);
  }, 250);

  const onHeightChange = debounce((newHeight: number | null) => {
    if (newHeight === null) {
      return;
    }
    setHeight(newHeight);
    setWidth(increaseWidthByHeight(width, height, newHeight));
  }, 250);

  return (
    <div className="base-container video-to-gif">
      <PageHeader
        className="site-page-header"
        title="Video To GIF"
        onBack={() => history.back()}
        extra={[
          <Button onClick={download} key="download" icon={<CloudDownloadOutlined />}>
            Download
          </Button>,
          <Button
            key="convert"
            type="primary"
            icon={<GifOutlined />}
            onClick={() => {
              convertFileToGif(width, height, fpsValue);
            }}
          >
            Convert
          </Button>,
        ]}
      />
      <Row wrap={false} gutter={16} style={{ height: "100%" }}>
        <Col span={12}>
          <Row>
            <Title level={3}>FPS</Title>
          </Row>
          <Row gutter={16}>
            <Col span={14}>
              <Slider min={1} max={maxFps} step={0.01} onChange={onFpsChange} value={fpsValue} />
            </Col>
            <Col span={10}>
              <InputNumber
                min={1}
                max={maxFps}
                step={0.01}
                value={fpsValue}
                onChange={onFpsChange}
                controls={false}
                addonAfter="fps"
              />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Title level={3}>Resolution</Title>
          </Row>
          <Row align="middle">
            <Col span={24}>
              <Input.Group compact>
                <InputNumber
                  step={1}
                  min={1}
                  max={maxWidth}
                  controls={false}
                  value={Math.round(width)}
                  addonAfter="x"
                  style={{ width: "calc(50% + 12px)" }}
                  onChange={onWidthChange}
                />
                <InputNumber
                  style={{ width: "calc(50% - 11px)" }}
                  step={1}
                  min={1}
                  max={maxHeight}
                  controls={false}
                  value={Math.round(height)}
                  onChange={onHeightChange}
                />
              </Input.Group>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <div className="previews">
            <div className="preview-container">
              <Preview showHeader={true} />
            </div>
            <div className="output-container">
              <Output showHeader={true} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
});
