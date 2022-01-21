import { Spin } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "AppDir/App";
import { rootStore, RootStoreProvider } from "AppDir/app.store";
import "./assets/style.scss";
import "antd/dist/antd.css";

const LoadingScreen = () => {
  return (
    <div className="loading">
      <Spin size={"large"} wrapperClassName="loading" tip={"Loading ffmpeg-core..."} />
    </div>
  );
};

const Main = observer(() => {
  return rootStore.ffmpegStore.status ? (
    <RootStoreProvider store={rootStore}>
      <App />
    </RootStoreProvider>
  ) : (
    <LoadingScreen />
  );
});

ReactDOM.render(<Main />, document.getElementById("app"));
