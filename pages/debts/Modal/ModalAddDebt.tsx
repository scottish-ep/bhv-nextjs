import Select from "../../../components/Select/Select";
import Input from "../../../components/Input/Input";
import TextArea from "../../../components/TextArea";
import React, { useEffect, useState, ReactNode } from "react";
import ReactDOM from "react-dom";
import Button from "../../../components/Button/Button";
import { StatusColorEnum, StatusEnum, StatusList } from "../../../types";
import Modal from "../../../components/Modal/Modal/Modal";
import { Table } from "antd";
import Icon from "../../../components/Icon/Icon";
import { ColumnsType } from "antd/es/table";
import { listDebtDetail } from "../../../const/constant";
import Upload from "../../../components/Upload/Upload";

interface ModalAddDebtProps {
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

const ModalAddDebt = (props: ModalAddDebtProps) => {
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

  const [listDebt, setListDebt] = useState<ModalAddDebtProps[]>([
    ...listDebtDetail,
  ]);

  const employeeList = [
    {
      label: "Nguyễn Văn A",
      value: "Nguyễn Văn A",
    },
    {
      label: "Nguyễn Văn B",
      value: "Nguyễn Văn B",
    },
  ];

  const columns: ColumnsType<ModalAddDebtProps> = [
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
        <span className="text-medium text-[#2E2D3D] font-medium">
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
        <span
          className={`font-semibold text-[${
            record?.status && StatusColorEnum[record.status]
          }]`}
        >
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
      className="p-[16px] modal-add-debt"
    >
      <div className="modal-add-debt">
        <div className="w-full">
          <Input
            className="flex-1"
            prefix={<Icon icon="search" color="#FF970D" size={24} />}
            placeholder="Tìm ID / Tên, mã KH / Số điện thoại"
          />
        </div>
        <div className="w-full flex justify-between">
          <div className="w-[48%] flex flex-col p-[12px] bg-white rounded-lg mt-[12px]">
            <div className="flex justify-between mb-[16px]">
              <p className="text-medium font-medium text-[#2E2D3D]">
                Mã công nợ
              </p>
              <p className="text-medium font-medium text-[#2E2D3D]">BHV0021</p>
            </div>
            <div className="flex justify-between mb-[16px]">
              <p className="text-medium font-medium text-[#2E2D3D]">
                Ngày tạo nợ
              </p>
              <p className="text-medium font-medium text-[#2E2D3D]">
                16:36 - 21/09/2022
              </p>
            </div>
            <div className="mb-[16px]">
              <p className="text-medium font-medium text-[#2E2D3D] mb-[8px]">
                Nhân viên xử lý
              </p>
              <Select
                className="w-[100%]"
                placeholder="Nguyễn Văn A"
                options={employeeList}
              />
            </div>
          </div>
          <div className="w-[48%] flex flex-col p-[12px] bg-white rounded-lg mt-[12px]">
            <div className="flex justify-between mb-[16px]">
              <p className="text-medium font-medium text-[#2E2D3D]">
                Họ và tên khách hàng
              </p>
              <p className="text-medium font-medium text-[#2E2D3D]">--</p>
            </div>
            <div className="flex justify-between mb-[16px]">
              <p className="text-medium font-medium text-[#2E2D3D]">Mã KH</p>
              <p className="text-medium font-medium text-[#2E2D3D]">--</p>
            </div>
            <div className="mb-[16px] flex justify-between">
              <p className="text-medium font-medium text-[#2E2D3D]">
                Số điện thoại
              </p>
              <p className="text-medium font-medium text-[#2E2D3D]">--</p>
            </div>
            <div className="mb-[16px] flex justify-between">
              <p className="text-medium font-medium text-[#2E2D3D]">
                Tiền công nợ hiện tại
              </p>
              <p className="text-medium font-medium text-[#F97316]">0 đ</p>
            </div>
          </div>
        </div>
        <div className="w-full my-[12px]">
          <Table columns={columns} dataSource={[]} />
        </div>
        <div className="mb-[24px] w-[409px] flex justify-between items-center">
          <p className="mr-[24px] text-medium font-medium text-[#2E2D3D]">
            Số tiền công nợ
          </p>
          <Input width={267} placeholder="0 đ" />
        </div>
        <div className="flex w-full rounded-lg bg-white p-[12px]">
          <div className="text-medium font-medium w-[60%] mr-[12px] mb-[8px]">
            <div className="mb-[12px]">Ghi chú</div>
            <TextArea
              className="bg-slate-100 !h-[104px]"
              placeholder="Nhập ghi chú"
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
            onClick={onClose}
            variant="outlined"
            className="mr-[12px] bg-white"
            width={246}
            height={44}
            text="TRỞ LẠI"
          />
          <Button
            variant="secondary"
            width={246}
            height={44}
            text="CẬP NHẬT"
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddDebt;
