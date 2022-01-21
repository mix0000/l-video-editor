import { InboxOutlined } from "@ant-design/icons";
import { fetchFile } from "@ffmpeg/ffmpeg";
import { Upload, message } from "antd";
import { RcFile } from "antd/lib/upload/interface";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import React from "react";
import { ffmpegStore } from "../../ffmpeg";

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
  console.log(file);
  message.info("Converting file to blob!");
  const currentVideoFile = await fetchFile(file);
  runInAction(() => {
    ffmpegStore.currentFile = currentVideoFile;
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
