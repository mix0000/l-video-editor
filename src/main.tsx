import { Radio, version, Typography } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";
import ReactDOM from "react-dom";

import { rootStore, RootStoreProvider, useRootStore } from "AppDir/app.store";

import "./assets/style.scss";
import "antd/dist/antd.css";

const { Text } = Typography;

const Counter = observer(() => {
  const { counterStore } = useRootStore();

  return (
    <div className="counter-container">
      <Text keyboard strong={true}>
        Current counter is: {counterStore.counter}
      </Text>
      <div className="counter-buttons ">
        <Radio.Group>
          <Radio.Button onClick={() => counterStore.increment()} value="inc">
            Increment
          </Radio.Button>
          <Radio.Button onClick={() => counterStore.decrement()} value="dec">
            Decrement
          </Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
});

function App() {
  return (
    <>
      <h1>antd version: {version}</h1>
      <Counter />
    </>
  );
}

ReactDOM.render(
  <RootStoreProvider store={rootStore}>
    <App />
  </RootStoreProvider>,
  document.getElementById("app"),
);
