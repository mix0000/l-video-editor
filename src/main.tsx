import { Spin } from "antd";
import { navigate, useRoutes } from "hookrouter";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { rootStore, RootStoreProvider } from "AppDir/app.store";
import "antd/dist/antd.css";
import "./assets/style.scss";
import { Dashboard } from "AppDir/pages/Dashboard";
import { Info } from "AppDir/pages/Info";
import { Upload } from "AppDir/pages/Upload";
import { VideoToGif } from "AppDir/pages/VideoToGif";

const EmptyRoute = ({ title }: { title: string }) => {
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, []);

  return <span>{title}</span>;
};

const routes = {
  "/": () => <Upload where="/dashboard" />,
  "/dashboard": () => <Dashboard />,
  "/videoToGif": () => <VideoToGif />,
  "/compressVideo": () => <EmptyRoute title="Compress video" />,
  "/info": () => <Info />,
};

export const Router = observer(() => {
  const routeResult = useRoutes(routes);

  return [rootStore.ffmpegStore.status, rootStore.mediaInfoStore.isReady].every(Boolean) ? (
    <RootStoreProvider store={rootStore}>
      {routeResult || <EmptyRoute title="404 MOTHERFUCKER" />}
    </RootStoreProvider>
  ) : (
    <div className="loading">
      <Spin size="large" wrapperClassName="loading" tip="Loading ffmpeg-core..." />
    </div>
  );
});

ReactDOM.render(<Router />, document.getElementById("app"));
