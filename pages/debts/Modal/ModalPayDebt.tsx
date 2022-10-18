import Select from "../../../components/Select/Select";
import Input from "../../../components/Input/Input";
import TextArea from "../../../components/TextArea";
import React, { useEffect, useState, ReactNode } from "react";
import ReactDOM from "react-dom";
import Button from "../../../components/Button/Button";
import { StatusColorEnum, StatusEnum, StatusList } from "../../../types";
import Modal from "../../../components/Modal/Modal/Modal";
import Upload from "../../../components/Upload/Upload";

interface ModalPayDebtProps {
  isVisible: boolean;
  title?: string;
  iconClose?: ReactNode;
  onClose?: (event?: any) => void;
  onOpen?: (event?: any) => void;
  content?: string | ReactNode;
  titleBody?: string;
  time?: string;
  deal?: string;
  method?: string;
  status?: StatusEnum;
  id?: string;
}
const ModalPayDebt = (props: ModalPayDebtProps) => {
  const {
    isVisible,
    title,
    iconClose = "Đóng",
    onClose,
    onOpen,
    content,
    titleBody,
    time,
    deal,
    method,
    status,
    id,
  } = props;

  const methodList = [
    {
      label: "Chuyển khoản",
      value: "Chuyển khoản",
    },
    {
      label: "Tien Mat",
      value: "Tien Mat",
    },
  ];

  return (
    <Modal
      isCenterModal
      title={title}
      isVisible={isVisible}
      onClose={onClose}
      onOpen={onOpen}
      iconClose={iconClose}
      width={836}
      footer={false}
      className="p-[16px] mt-[42px]"
    >
      <div>
        <div className="flex justify-between w-full mb-[16px] items-center">
          <p className="text-medium font-medium text-[#2E2D3D]">Số tiền</p>
          <Input width={662} />
        </div>
        <div className="flex justify-between w-full mb-[16px] items-center">
          <p className="text-medium font-medium text-[#2E2D3D]">Hình thức</p>
          <Select width={662} placeholder="Chuyển khoản" options={methodList} />
        </div>
        <div className="w-full flex flex-col p-[12px]">
          <div className="flex w-full">
            <div className="text-medium font-medium w-[60%] mr-[12px] mb-[8px]">
              <p className="mb-[8px]">Ghi chú</p>
              <TextArea
                className="bg-slate-100 !h-[104px]"
                placeholder="Nhập nội dung"
              />
            </div>
            <div className="mb-[16px]">
              <div className="text-medium font-medium mb-[12px]">
                Hình ảnh sản phẩm
              </div>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={[]}
                onChange={() => console.log("check")}
              />
            </div>
          </div>
          <div className="w-full flex justify-end mt-[32px]">
            <Button
              variant="outlined"
              className="mr-[12px]"
              width={246}
              height={44}
              text="HUỶ BỎ"
            />
            <Button
              variant="secondary"
              width={246}
              height={44}
              text="XÁC NHẬN"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPayDebt;
