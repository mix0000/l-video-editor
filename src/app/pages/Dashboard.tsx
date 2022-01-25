import { FileZipOutlined, GifOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { navigate } from "hookrouter";
import React, { ReactNode } from "react";

interface DashboardElementProps {
  description?: string;
  icon: ReactNode;
  route: string;
  title: string;
}

const DashboardElement: React.FC<DashboardElementProps> = ({ description, icon, route, title }) => {
  return (
    <div className="dashboard-element" onClick={() => navigate(route)}>
      <span className="icon-container">{icon}</span>
      <h3 className="title">{title}</h3>
      {description ?? <p className="description">{description}</p>}
    </div>
  );
};

const dashboardElements: DashboardElementProps[] = [
  {
    description: "Take large video files and compress them to a smaller file size",
    title: "Compressor",
    route: "/compressVideo",
    icon: <FileZipOutlined />,
  },
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
];

export const Dashboard = () => {
  return (
    <section className="base-container dashboard-section">
      <div className="dashboard-elements">
        {dashboardElements.map((dashboardElementProps) => {
          return <DashboardElement key={dashboardElementProps.title} {...dashboardElementProps} />;
        })}
      </div>
      <Button className="back-button" onClick={() => history.back()}>
        Back
      </Button>
    </section>
  );
};
