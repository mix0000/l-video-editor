import { LoadingOutlined } from "@ant-design/icons";
import { Modal, Spin } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { modalStore } from "AppDir/store/modalStore";
import "simplebar/dist/simplebar.min.css";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const ConsoleModel = observer(() => {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!ref.current || !modalStore.logs.length) {
      return;
    }

    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [modalStore.logs.length]);

  return (
    <Modal
      title={
        <>
          <Spin indicator={antIcon} style={{ marginRight: 16 }} />
          Converting..
        </>
      }
      visible={modalStore.isOpen}
      footer={null}
      closable={false}
      width={900}
    >
      <pre ref={ref} className="terminal">
        {modalStore.logs.join("\n")}
      </pre>
    </Modal>
  );
});
