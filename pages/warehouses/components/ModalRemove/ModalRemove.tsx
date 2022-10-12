import React from "react";
import { ReactNode } from "react";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal/Modal";

interface ModalProps {
  isVisible: boolean;
  title?: string;
  iconClose?: ReactNode;
  onClose?: (event?: any) => void;
  onOpen?: (event?: any) => void;
  content?: string | ReactNode;
  titleBody?: string;
}

const ModalRemove = (props: ModalProps) => {
  const {
    isVisible,
    title = "Thông báo",
    iconClose = "Đóng",
    onClose,
    onOpen,
    content,
    titleBody,
  } = props;

  const Footer = () => (
    <div className="flex justify-between">
      <Button variant="outlined" text="HUỶ BỎ" width="48%" onClick={onClose} />
      <Button variant="danger" text="XOÁ" width="48%" onClick={onOpen} />
    </div>
  );

  return (
    <Modal
      isCenterModal
      title={title}
      isVisible={isVisible}
      onClose={onClose}
      onOpen={onOpen}
      iconClose={iconClose}
      footer={<Footer />}
      width={535}
    >
      <div className="flex flex-col items-center justify-center gap-y-3">
        {titleBody && (
          <h2 className="text-[#1D1C2D] text-big font-semibold">{titleBody}</h2>
        )}
        {content && <p className="text-[#4B4B59]">{content}</p>}
      </div>
    </Modal>
  );
};

export default ModalRemove;
