import React, { Children } from "react";
import { ReactNode } from "react";

import Modal from "../../../components/Modal/Modal/Modal";
import Button from "../../../components/Button/Button";

import styles from "./Modal.module.css";
import Select from "../../../components/Select/Select";
import Input from "../../../components/Input/Input";
import DatePicker from "../../../components/DatePicker/DatePicker";
import { Radio } from "antd";

interface ModalProps {
  isVisible: boolean;
  title?: string;
  iconClose?: ReactNode;
  onClose?: (event?: any) => void;
  onOpen?: (event?: any) => void;
  content?: string | ReactNode;
  titleBody?: string;
}

const resources: {
  label: string;
  value: string;
}[] = [
  {
    label: "Nguồn KH",
    value: "Nguồn KH",
  },
  {
    label: "App BHV",
    value: "App BHV",
  },
  {
    label: "Tại CH",
    value: "Tại CH",
  },
  {
    label: "Facebook",
    value: "Facebook",
  },
  {
    label: "Livestream Facebook",
    value: "Livestream Facebook",
  },
  {
    label: "Livestream App",
    value: "Livestream App",
  },
  {
    label: "Zalo",
    value: "Zalo",
  },
];

const ModalAddCustomer = (props: ModalProps) => {
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
      <Button
        variant="secondary"
        text="THÊM MỚI"
        width="48%"
        onClick={onOpen}
      />
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
      <div>
        <div className="flex items-center justify-between mb-[12px]">
          <div className="text-medium font-medium">Chọn nguồn</div>
          <Select
            placeholder="Chọn nguồn"
            style={{ width: 296 }}
            options={resources}
          />
        </div>
        <div className="flex items-center justify-between mb-[12px]">
          <div className="text-medium font-medium">Họ và tên *</div>
          <Input width={296} placeholder="Nhập tên nhân viên" />
        </div>
        <div className="flex items-center justify-between mb-[12px]">
          <div className="text-medium font-medium">Số điện thoại *</div>
          <Input
            type="phone-number"
            width={296}
            placeholder="Nhập số điện thoại"
          />
        </div>
        <div className="flex items-center justify-between mb-[12px]">
          <div className="text-medium font-medium">Giới tính</div>
          <div style={{ width: 296 }}>
            <Radio.Group>
              <div className="mr-[95px]">
                <Radio value="Nam">Nam</Radio>
              </div>
              <Radio value="Nữ">Nữ</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="flex items-center justify-between mb-[12px]">
          <div className="text-medium font-medium">Sinh nhật</div>
          <DatePicker width={296} placeholder="Ngày/tháng/năm" />
        </div>
        <div className="flex items-center justify-between mb-[12px]">
          <div className="text-medium font-medium">Email</div>
          <Input type="email" width={296} placeholder="nhập email" />
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddCustomer;
