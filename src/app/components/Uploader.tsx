import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { RcFile } from "antd/lib/upload/interface";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import path from "path-browserify";
import { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import React from "react";
import { fileStore } from "AppDir/store/fileStore";
import { mediaInfoStore } from "AppDir/store/mediaInfoStore";
import { readChunk } from "../../utils/utils";

const allowedTypes = [
  "video/mpeg",
  "video/mp4",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-ms-wmv",
  "video/x-flv",
  "video/x-msvideo",
  "video/3gpp",
  "video/3gpp2",
];

const blobKey = "mediaInfo";

async function toFfmpeg(file: RcFile) {
  const { mediaInfo } = mediaInfoStore;
  runInAction(() => {
    fileStore.file = file;
  });

  message.loading({ content: "Analyzing file..", key: blobKey });

  const result = await mediaInfo?.analyzeData(() => file.size, readChunk(file));

  if (typeof result === "object") {
    const videoInfo = result?.media?.track.find((track) => track["@type"] === "Video");

    runInAction(() => {
      mediaInfoStore.fileInfo = result;
    });

    message.success({
      content: "Analyzing file..",
      key: blobKey,
    });
    const extra = {
      duration: Number(videoInfo?.Duration) || 0,
      fileSize: file.size,
      framerate: Number(videoInfo?.FrameRate) || 0,
      width: Number(videoInfo?.Width) || 0,
      height: Number(videoInfo?.Height) || 0,
      type: file.type,
      extension: path.parse(file.name).ext,
      name: path.parse(file.name).name,
    };

    runInAction(() => {
      fileStore.extra = extra;
    });
  }
}

export const VideoUpload = observer(() => {
  const beforeUpload = (file: RcFile) => {
    const isVideoFile = allowedTypes.some((type) => type === file.type);
    if (!isVideoFile) {
      message.error("You can only upload video files!");
      return false;
    }
    return true;
  };

  const customRequest = async (options: RcCustomRequestOptions) => {
    await toFfmpeg(options.file as RcFile);
  };

  return (
    <Upload.Dragger
      accept={allowedTypes.join(",")}
      beforeUpload={beforeUpload}
      customRequest={customRequest}
      maxCount={1}
      showUploadList={false}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </Upload.Dragger>
  );
});
