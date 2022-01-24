import {
  AudioOutlined,
  MenuOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { Space, Table } from "antd";
import Text from "antd/es/typography/Text";
import { Track } from "mediainfo.js/dist/types";
import { observer } from "mobx-react-lite";
import React, { ReactNode, useLayoutEffect, useMemo, useState } from "react";
import { useRootStore } from "AppDir/app.store";

type VideoInfo = Track[];

const typeIconMap: Record<string, ReactNode> = {
  Audio: <AudioOutlined />,
  Menu: <MenuOutlined />,
  Text: <FileTextOutlined />,
  Video: <VideoCameraOutlined />,
  default: <SnippetsOutlined />,
};

const getIcon = (type: string) => (typeIconMap[type] ? typeIconMap[type] : typeIconMap.default);

export const Info = observer(() => {
  const {
    mediaInfoStore: { mediaInfo },
    ffmpegStore: { currentFile },
  } = useRootStore();
  const [videoInfo, setVideoInfo] = useState<VideoInfo>([]);

  useLayoutEffect(() => {
    if (!currentFile) {
      return;
    }

    mediaInfo?.analyzeData(
      () => currentFile.file.length,
      () => currentFile.file,
      (result) => {
        if (typeof result === "object") {
          setVideoInfo(result?.media?.track);
        }
      },
    );
  }, [currentFile, mediaInfo]);

  const formattedInfo = useMemo(() => {
    return videoInfo.map(({ "@type": type, ...rest }) => {
      const data = Object.entries(rest).map(([key, value]) => ({
        key: key + value,
        description: key,
        value,
      }));
      return {
        data,
        key: type,
        title: () => (
          <Space align="center">
            {getIcon(type)}
            {type}
          </Space>
        ),
      };
    });
  }, [videoInfo]);

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Value",
      dataIndex: "value",
    },
  ];

  return (
    <div className="base-container info-container">
      <Space align="center" style={{ marginBottom: "1rem" }}>
        <h2 style={{ marginBottom: 0 }}>Video Info: </h2>
        <Text keyboard>{currentFile?.name}</Text>
      </Space>

      <div className="info-table-wrapper">
        {formattedInfo.map(({ key, data, title }) => {
          return (
            <Table
              key={key}
              showHeader={false}
              pagination={false}
              size="small"
              columns={columns}
              dataSource={data}
              bordered
              title={title}
              scroll={{ x: true }}
            />
          );
        })}
      </div>
    </div>
  );
});
