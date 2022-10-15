import Select from "../../../components/Select/Select";
import Input from "../../../components/Input/Input";
import TextArea from "../../../components/TextArea";
import React, { useEffect, useState, ReactNode } from "react";
import ReactDOM from "react-dom";
import Button from "../../../components/Button/Button";
import { StatusColorEnum, StatusEnum, StatusList } from "../../../types";
import DatePicker from "../../../components/DatePicker/DatePicker";
import Modal from "../../../components/Modal/Modal/Modal";
import { Table } from "antd";
import Icon from "../../../components/Icon/Icon";
import { ColumnsType } from "antd/es/table";
import { listDebtDetail } from "../../../const/constant";
import Upload from "../../../components/Upload/Upload";

interface ModalSettingFaultProps {
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

const ModalSettingFault = (props: ModalSettingFaultProps) => {
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

  const store = [
    {
      label: "Tổng kho Linh Dương",
      value: "Tổng kho Linh Dương"
    },
    {
      label: "Tổng kho Linh Dương",
      value: "Tổng kho Linh Dương"
    }
  ]

  const group = [
    {
      label: "Sale cấp 1",
      value: "Sale cấp 1"
    },
    {
      label: "Sale cấp 1",
      value: "Sale cấp 1"
    }
  ]

  const staff = [
    {
      label: "Nguyễn Văn A",
      value: "Nguyễn Văn A"
    },
    {
      label: "Nguyễn Văn B",
      value: "Nguyễn Văn B"
    }
  ]

  return (
    <Modal
      isCenterModal
      title={title}
      isVisible={isVisible}
      onClose={onClose}
      onOpen={onOpen}
      iconClose={iconClose}
      width={648}
      footer={false}
      className="p-[16px] modal-setting-fault rounded-lg"
    >
      <div>
        <div className="w-full">
        <div className="w-full flex flex-col rounded-lg bg-white p-[12px] mb-[32px]">
          <div className="flex justify-between items-center mb-[12px]">
            <p className="text-medium font-medium">Chọn kho trực thuộc</p>
            <Select 
              width={385}
              defaultValue={store[0]}
              options={store}
            />
          </div>
          <div className="flex justify-between items-center mb-[12px]">
            <p className="text-medium font-medium">Chọn nhóm sale</p>
            <Select 
              width={385}
              defaultValue={group[0]}
              options={group}
            />
          </div>
          <div className="flex justify-between items-center mb-[12px]">
            <p className="text-medium font-medium">Chọn nhân viên</p>
            <Select 
              width={385}
              defaultValue={["Nguyễn Văn A", "Nguyễn Thị B"]}
              options={staff}
            />
          </div>
        <div className="w-full flex justify-between">
          <Button width={270} height={44} text="HUỶ BỎ" className="font-medium" variant="outlined" onClick={onClose}/>
          <Button variant="secondary" text="LƯU" width={270} height={44}/>
        </div>
      </div>
        </div>
      </div>
    </Modal>
  )
  
}

export default ModalSettingFault;