import React from "react";
import { Modal } from "antd";

const MessagesModal = ({ show, hide, content }) => {
  return (
    <>
      <Modal
        cancelButtonProps={{ style: { display: "none" } }}
        closable={false}
        title="Basic Modal"
        visible={show}
        onOk={hide}
      >
        <p>{content}</p>
      </Modal>
    </>
  );
};

export default MessagesModal;
