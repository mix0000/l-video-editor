import {
  AudioOutlined,
  FileTextOutlined,
  MenuOutlined,
  SnippetsOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { PageHeader, Space, Spin, Table } from "antd";
import Text from "antd/es/typography/Text";
import { observer } from "mobx-react-lite";
import React, { ReactNode, useMemo } from "react";
import { useRootStore } from "AppDir/app.store";

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
    mediaInfoStore: { fileInfo },
    fileStore,
  } = useRootStore();

  const formattedInfo = useMemo(() => {
    const videoInfo = fileInfo?.media?.track || [];

    return videoInfo.map(({ "@type": type, ...rest }) => {
      const data = [];

      for (const [key, value] of Object.entries(rest)) {
        if (typeof value === "string") {
          data.push({
            key: key + value,
            description: key,
            value,
          });
        }
      }

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
  }, [fileInfo]);

  return formattedInfo.length ? (
    <div className="base-container info-container">
      <PageHeader
        className="site-page-header"
        onBack={() => history.back()}
        subTitle={
          <Text keyboard ellipsis>
            {fileStore?.extra?.name}
          </Text>
        }
      />

      <div className="info-table-wrapper">
        {formattedInfo.map(({ key, data, title }) => {
          return (
            <Table
              key={key}
              showHeader={false}
              pagination={false}
              size="small"
              columns={[
                {
                  title: "Description",
                  dataIndex: "description",
                },
                {
                  title: "Value",
                  dataIndex: "value",
                },
              ]}
              dataSource={data}
              bordered
              title={title}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <Spin size="large" />
  );
});
