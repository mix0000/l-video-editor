import { Spin } from "antd";
import { navigate, useRoutes } from "hookrouter";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { rootStore, RootStoreProvider } from "AppDir/app.store";
import "antd/dist/antd.css";
import "./assets/style.scss";
import { Dashboard } from "AppDir/pages/Dashboard";

const EmptyRoute = ({ title }: { title: string }) => {
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, []);

  return <span>{title}</span>;
};

const Main = observer(() => {
  return rootStore.ffmpegStore.status ? (
    <RootStoreProvider store={rootStore}>
      <Dashboard />
    </RootStoreProvider>
  ) : (
    <div className="loading">
      <Spin size="large" wrapperClassName="loading" tip="Loading ffmpeg-core..." />
    </div>
  );
});

const routes = {
  "/": () => <Main />,
  "/videoToGif": () => <EmptyRoute title="Video to GIF" />,
  "/compressVideo": () => <EmptyRoute title="Compress video" />,
};

export const Router = () => {
  const routeResult = useRoutes(routes);

  return routeResult || <EmptyRoute title="404 MOTHERFUCKER" />;
};

ReactDOM.render(<Router />, document.getElementById("app"));
