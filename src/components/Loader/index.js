import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        top: 0,
        // background: fullScreen ? '#fff' : '#00000016',
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
      }}
    >
      <Spin size="large" indicator={antIcon} />
    </div>
  );
};

export default Loader;
