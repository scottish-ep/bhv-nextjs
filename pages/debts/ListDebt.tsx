import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import TitlePage from "../../components/TitlePage/Titlepage";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";
import Input from "../../components/Input/Input";
import DatePicker from "../../components/DatePicker/DatePicker";
import Select from "../../components/Select/Select";
import { productTypeList } from "../../const/constant";
import Tabs from "../../components/Tabs";
import type { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import { StatusColorEnum, StatusEnum, StatusList } from "../../types";
import { ListDebtProps } from "./listdebt.type";
import classNames from "classnames";
import { list_Debt } from "../../const/constant";
import styles from "../../styles/ListPayment.module.css";
import ModalDebtDetail from "./Modal/ModalDebtDetail";
import ModalPayDebt from "./Modal/ModalPayDebt";
import ModalAddDebt from "./Modal/ModalAddDebt"
const ListDebt = () => {
  const [listDebt, setListDebt] = useState<ListDebtProps[]>([...list_Debt]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const TabStatus = [
    { name: StatusEnum.PENDING, count: 15 },
    { name: StatusEnum.COMPLETED, count: 9 },
  ];
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 6,
  });
  const [isShowModalDebtDetail, setIsShowModalDebtDetail] = useState(false);
  const [isShowModalAddDebt, setIsShowModalAddDebt] = useState(false);
  const [isShowModalPayDebt, setIsShowModalPayDebt] = useState(true);
  const [loading, setLoading] = useState(false);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const columns: ColumnsType<ListDebtProps> = [
    {
      title: "ID",
      width: 100,
      dataIndex: "id",
      key: "dataIndex",
      fixed: "left",
      align: "center",
      render: (_, record) => (
        <span className="text-medium text-[#2E2D3D] font-medium" onClick={() => setIsShowModalDebtDetail(true)}>
          {record.id}
        </span>
      ),
    },
    {
      title: "Tên khách hàng",
      width: 170,
      dataIndex: "name",
      key: "export_name",
      align: "left",
      render: (_, record) => (
        <div className="flex flex-col justify-center cursor-pointer" onClick={() => setIsShowModalDebtDetail(true)}>
          <span className="text-medium font-medium text-[#384ADC]">
            {record.name}
          </span>
          <span className="text-medium font-medium text-[#1D1C2D]">
            {record.code}
          </span>
        </div>
      ),
    },
    {
      title: "Số điện thoại",
      width: 160,
      dataIndex: "phone",
      key: "note",
      align: "center",
      render: (_, record) => (
        <span className="text-medium text-[#4B4B59] cursor-pointer" onClick={() => setIsShowModalDebtDetail(true)}>{record.phone}</span>
      ),
    },
    {
      title: "Công nợ",
      width: 140,
      dataIndex: "debt",
      key: "quantity",
      align: "center",
      render: (_, record) => (
        <span className="cursor-pointer text-medium font-medium text-[#F97316]" onClick={() => setIsShowModalDebtDetail(true)}>
          {record.debt} đ
        </span>
      ),
    },
    {
      title: "Ghi chú",
      width: 300,
      dataIndex: "note",
      key: "weight",
      align: "left",
      render: (_, record) => (
        <span className="cursor-pointer text-medium font-medium text-[#1D1C2D]" onClick={() => setIsShowModalDebtDetail(true)}>
          {record.note}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      width: 185,
      dataIndex: "status",
      key: "totalMoney",
      align: "center",
      render: (_, record) => (
        <span
          className={`cursor-pointer font-semibold text-[${StatusColorEnum[record.status]}]`} onClick={() => setIsShowModalDebtDetail(true)}
        >
          {StatusList.find((status) => status.value === record.status)?.name}
        </span>
      ),
    },
    {
      title: "Thời gian cập nhật ",
      width: 185,
      dataIndex: "update_time",
      key: "status",
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <span className={`cursor-pointer text-medium font-semibold text-[]`} onClick={() => setIsShowModalDebtDetail(true)}>
          {record.update_time}
        </span>
      ),
    },
  ];
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-[12px] flex-wrap">
        <TitlePage title="Quản lý công nợ" />
        <div className="flex gap-[8px] flex-wrap">
          <Button
            variant="outlined"
            width={109}
            icon={<Icon icon="export" size={24} />}
          >
            Xuất file
          </Button>
          <Button
            variant="primary"
            width={151}
            color="white"
            suffixIcon={<Icon icon="add-1" size={24} color="white"/>}
            onClick = {() => setIsShowModalAddDebt(true)}
          >
            Thêm mới
          </Button>
          <Button
            variant="no-outlined"
            width={62}
            color="white"
            icon={<Icon icon="upload" size={16} />}
          >
            Hỗ trợ
          </Button>
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-[8px] mb-[12px]">
        <Input
          className="flex-1"
          prefix={<Icon icon="search" color="#FF970D" size={24} />}
          placeholder="Tìm ID / Tên, mã KH / Số điện thoại"
        />
        <DatePicker width={306} />
      </div>
      <Tabs countTotal={999} tabs={TabStatus} />
      <Table
        rowKey={(record) => record.id}
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={listDebt}
        pagination={{
          defaultPageSize: pagination.pageSize,
          showSizeChanger: true,
          pageSizeOptions: [6, 20, 50, 100],
        }}
        scroll={{ x: 50 }}
      />
      <div className={classNames("flex items-center", styles.total_wrapper)}>
        <div className={styles.row}>
          Tổng tiền công nợ:
          <span className="font-medium text-[#F97316]"> 12.000.000 đ</span>
        </div>
      </div>
      <ModalDebtDetail
        title="Chi tiết công nợ"
        isVisible={isShowModalDebtDetail}
        onClose={() => setIsShowModalDebtDetail(false)}
        onOpen={() => setIsShowModalDebtDetail(false)}
      />
      <ModalPayDebt
        title="Thanh toán công nợ"
        isVisible={isShowModalPayDebt}
        onClose={() => setIsShowModalPayDebt(false)}
        onOpen={() => setIsShowModalPayDebt(false)}
      />
      <ModalAddDebt
        title="Thêm công nợ mới"
        isVisible={isShowModalAddDebt}
        onClose={() => setIsShowModalAddDebt(false)}
        onOpen={() => setIsShowModalAddDebt(false)}
      />
    </div>
  );
};

export default ListDebt;
// ReactDOM.render(<ListDebt />, document.getElementById("root"));
