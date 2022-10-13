import Icon from "../../../components/Icon/Icon";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "../../../components/Modal/Modal/Modal";
import Button from "../../../components/Button/Button";
import { ReactNode } from "react";
import Select from "../../../components/Select/Select";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { StatusColorEnum, StatusEnum, StatusList } from "../../../types";
import { listDebtDetail } from "../../../const/constant";
import TextArea from "antd/lib/input/TextArea";
interface ModalDebtDetailProps {
  isVisible: boolean;
  title?: string;
  iconClose?: ReactNode;
  onClose?: (event?: any) => void;
  onOpen?: (event?: any) => void;
  content?: string | ReactNode;
  isPayDebt?: boolean;
  titleBody?: string;
  time?: string;
  deal?: string;
  method?: string;
  status?: StatusEnum;
  id?: string;
}
const ModalDebtDetail = (props: ModalDebtDetailProps) => {
  const {
    title,
    isVisible,
    onClose,
    onOpen,
    content,
    titleBody,
    status,
    id,
    method,
    time,
    iconClose = "Đóng",
  } = props;

  const [listDebt, setListDebt] = useState<ModalDebtDetailProps[]>([
    ...listDebtDetail,
  ]);
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

  const columns: ColumnsType<ModalDebtDetailProps> = [
    {
      title: "Thời gian",
      width: 150,
      dataIndex: "time",
      key: "dataIndex",
      fixed: "left",
      align: "center",
      render: (_, record) => (
        <span className="text-medium text-[#2E2D3D] font-medium">
          {record.time}
        </span>
      ),
    },
    {
      title: "Giao dịch",
      width: 110,
      dataIndex: "deal",
      key: "dataIndex",
      align: "left",
      render: (_, record) => (
        <span className="text-medium text-[#F97316] flex  font-medium">
          <Icon icon="debt-arrow" size={24} className="mr-[10px]"/>
          {record.deal}
        </span>
      ),
    },
    {
      title: "Hình thức",
      width: 136,
      dataIndex: "method",
      key: "dataIndex",
      align: "center",
      render: (_, record) => (
        <span className="text-medium text-[#2E2D3D] font-medium">
          {record.method}
        </span>
      ),
    },
    {
      title: "Nội dung",
      width: 250,
      dataIndex: "content",
      key: "dataIndex",
      align: "left",
      render: (_, record) => (
        <span className="text-medium text-[#2E2D3D] font-medium">
          {record.content}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      width: 136,
      dataIndex: "status",
      key: "dataIndex",
      align: "left",
      render: (_, record) => (
        <span className={`font-semibold text-[${StatusColorEnum[record.status]}]`}>
          {StatusList.find((status) => status.value === record.status)?.name}
        </span>
      ),
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
      width={908}
      footer={false}
      className="modal-debt-detail"
    >
      <div>
        <div className="flex justify-between w-full mb-[12px]">
          <div className="w-[48%] bg-white rounded-lg" style={{ padding: "12px"}}>
            <div className="flex items-center justify-between mb-[16px]">
              <div className="text-medium font-medium">Mã công nợ</div>
              <div className="text-medium font-medium">BHV0021</div>
            </div>
            <div className="flex items-center justify-between mb-[16px]">
              <div className="text-medium font-medium">Ngày tạo</div>
              <div className="text-medium font-medium">16:36 - 21/09/2022</div>
            </div>
            <div className="flex flex-col  justify-left mb-[16px]">
            <div className="text-medium font-medium mb-[8px]">Nhân viên xử lý</div>
              <Select
                placeholder="Chọn nguồn"
                style={{ width: 395 }}
                options={resources}
              />
            </div>
          </div>
          <div className="w-[48%] bg-white rounded-lg" style={{ padding: "12px"}}>
            <div className="flex items-center justify-between mb-[16px]">
              <div className="text-medium font-medium">
                Họ và tên khách hàng
              </div>
              <div className="text-medium font-medium">Tran Huyen</div>
            </div>
            <div className="flex items-center justify-between mb-[16px]">
              <div className="text-medium font-medium">Mã KH</div>
              <div className="text-medium font-medium">BHV0021</div>
            </div>
            <div className="flex items-center justify-between mb-[16px]">
              <div className="text-medium font-medium">Số điện thoại</div>
              <div className="text-medium font-medium">0365.213.364</div>
            </div>
            <div className="flex items-center justify-between mb-[16px]">
              <div className="text-medium font-medium">
                Tiền công nợ hiện tại
              </div>
              <div className="text-medium font-medium" style={{color: "#F97316"}}>150.000 đ</div>
            </div>
          </div>
        </div>
        <div className="w-full rounded-lg">
          <Table columns={columns} dataSource={listDebt}/>
        </div>
        <div className="w-full flex flex-col p-[12px] bg-white rounded-lg">
            <div className="flex w-full">
                <div className="text-medium font-medium w-[60%] mr-[12px]">
                    Ghi chú
                    <TextArea className="bg-slate-100 !h-[104px]" placeholder="Công nợ theo đơn hoàn"/>
                </div>
                <p className="text-meium font-medium w-[30%]">Hình ảnh</p>
            </div>
        </div>
        <div className="w-full flex justify-end mt-[32px]">
            <Button variant="outlined" className="mr-[12px]" width={305} height={44} text="TRỞ LẠI"/>
            <Button variant="secondary"  width={305} height={44} text="THANH TOÁN"/>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDebtDetail;
