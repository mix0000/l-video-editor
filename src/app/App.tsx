import { version } from "antd";
import React from "react";
import { Preview } from "AppDir/components/Preview";
import { VideoUpload } from "AppDir/components/Uploader";

export function App() {
  return (
    <>
      <h1>Upload your video: {version}</h1>
      <VideoUpload />
      <Preview />
    </>
  );
}
