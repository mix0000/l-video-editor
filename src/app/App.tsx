import { NodeExpandOutlined } from "@ant-design/icons";
import { Button, PageHeader } from "antd";
import React from "react";
import { Preview } from "AppDir/components/Preview";
import { VideoUpload } from "AppDir/components/Uploader";

export function App() {
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="L Video Editor"
        extra={
          <Button key="save-as-button" type="primary">
            Save as..
            <NodeExpandOutlined />
          </Button>
        }
      />
      <VideoUpload />
      <Preview />
    </>
  );
}
