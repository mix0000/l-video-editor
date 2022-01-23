import { InboxOutlined } from "@ant-design/icons";
import { fetchFile } from "@ffmpeg/ffmpeg";
import { Upload, message } from "antd";
import { RcFile } from "antd/lib/upload/interface";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import React from "react";
import { ffmpegStore } from "../../ffmpeg";
import { mediaInfoStore } from "../../mediaInfo";
import { getFileExtension } from "../../utils/utils";

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

async function toFfmpeg(file: RcFile) {
  const { mediaInfo } = mediaInfoStore;
  message.info("Converting file to blob!");
  const currentVideoFile = await fetchFile(file);
  const result = await mediaInfo?.analyzeData(
    () => currentVideoFile.length,
    () => currentVideoFile,
  );

  if (typeof result === "object") {
    const videoInfo = result?.media?.track.find((type) => type["@type"] === "Video");
    const details = {
      duration: Number(videoInfo?.Duration),
      fileSize: currentVideoFile.length,
      framerate: Number(videoInfo?.FrameRate),
      width: Number(videoInfo?.Width),
      height: Number(videoInfo?.Height),
      type: file.type,
      extension: getFileExtension(file.name),
    };
    console.log(details);
  }

  runInAction(() => {
    ffmpegStore.currentFile = { file: currentVideoFile, name: file.name, type: file.type };
  });
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

  const customRequest = (options: RcCustomRequestOptions) => {
    toFfmpeg(options.file as RcFile);
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
