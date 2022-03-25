import { AudioOutlined, FileZipOutlined, GifOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import clsx from "clsx";
import { navigate } from "hookrouter";
import React, { ReactNode } from "react";

interface DashboardElementProps {
  description?: string;
  icon: ReactNode;
  route: string;
  title: string;
  disabled?: boolean;
}

const DashboardElement: React.FC<DashboardElementProps> = ({
  description,
  icon,
  route,
  title,
  disabled,
}) => {
  return (
    <div
      className={clsx("dashboard-element", disabled && "disabled")}
      onClick={() => navigate(route)}
    >
      <span className="icon-container">{icon}</span>
      <h3 className="title">{title}</h3>
      {description ?? <p className="description">{description}</p>}
    </div>
  );
};

const dashboardElements: DashboardElementProps[] = [
  {
    description: "Convert any video formats to GIF",
    title: "Video to GIF",
    route: "/videoToGif",
    icon: <GifOutlined />,
  },
  {
    description: "Get detailed information about your video",
    title: "Info",
    route: "/info",
    icon: <InfoCircleOutlined />,
  },
  {
    description: "Take large video files and compress them to a smaller file size",
    title: "Compressor",
    route: "/compressVideo",
    icon: <FileZipOutlined />,
    disabled: true,
  },
  {
    description: "Get audio track from your video with extended customization",
    title: "Audio from video",
    route: "/getAudio",
    icon: <AudioOutlined />,
    disabled: true,
  },
];

export const Dashboard = () => {
  return (
    <section className="base-container dashboard-section">
      <PageHeader className="site-page-header" title="2. Choose" onBack={() => history.back()} />
      <div className="dashboard-elements">
        {dashboardElements.map((dashboardElementProps) => {
          return <DashboardElement key={dashboardElementProps.title} {...dashboardElementProps} />;
        })}
      </div>
    </section>
  );
};
