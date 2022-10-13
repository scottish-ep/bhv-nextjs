import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Switch, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import get from "lodash/get";
import { format } from "date-fns";

import Tabs from "../../components/Tabs";
import TitlePage from "../../components/TitlePage/Titlepage";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";
import Input from "../../components/Input/Input";
import DatePicker from "../../components/DatePicker/DatePicker";
import DropdownStatus from "../../components/DropdownStatus";
import { StatusColorEnum, StatusEnum, StatusList } from "../../types";

import classNames from "classnames";

import styles from "../../styles/ListProduct.module.css";

import { IsProduct } from "../products/product.type";
import { productTypeList, groupStaff } from "../../const/constant";

const TargetManagement = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const element = document.getElementById("loading__animation");
    if (element) {
      element.remove();
    }
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<IsProduct> = [
    {
      title: "Hiện",
      width: 82,
      key: "id",
      fixed: "left",
      align: "center",
      render: (_, record) => {
        return (
          <Switch
            className="button-switch"
            defaultChecked={
              record.show ? (record.show === 1 ? true : false) : false
            }
            onChange={() => console.log("check")}
          />
        );
      },
    },
    {
      title: "Mã sản phẩm",
      width: 150,
      dataIndex: "id",
      key: "name",
      fixed: "left",
      align: "center",
      render: (_, record) => (
        <span className="text-[#384ADC] font-semibold">
          {record.id || get(record, "user.id")}
        </span>
      ),
    },
    {
      title: "Tên sản phẩm",
      width: 200,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (_, record) => (
        <div>
          <span className="font-medium">{record.name}</span>
        </div>
      ),
    },
    {
      title: "Danh mục",
      width: 132,
      dataIndex: "category",
      key: "category",
      align: "center",
      render: (_, record) => (
        <span className="font-medium text-[#1D1C2D]">{record.category}</span>
      ),
    },
    {
      title: "Tổng nhập",
      width: 200,
      dataIndex: "total",
      key: "total",
      align: "center",
      render: (_, record) => (
        <span className="font-medium text-[#1D1C2D]">{record.total}</span>
      ),
    },
    {
      title: "Mẫu mã",
      width: 100,
      dataIndex: "models",
      key: "models",
      align: "center",
      render: (_, record) => (
        <span className="font-medium text-[#1D1C2D]">{record.models}</span>
      ),
    },
    {
      title: "Có thể bán",
      width: 132,
      dataIndex: "numberSale",
      key: "numberSale",
      align: "center",
      render: (_, record) => (
        <span className="font-medium text-[#1D1C2D]">
          {record.numberSale} kg
        </span>
      ),
    },
    {
      title: "Giá bán",
      width: 140,
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (_, record) => (
        <span className="font-medium text-[#1D1C2D]">{record.price}</span>
      ),
    },
    {
      title: "Tổng tiền sản phẩm",
      width: 185,
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "center",
      render: (_, record) => (
        <div className="font-medium text-[#1D1C2D]">{record.totalPrice}</div>
      ),
    },
    {
      title: "Ngày nhập",
      width: 132,
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (_, record) => (
        <div className="font-medium text-[#1D1C2D]">{record.createdAt}</div>
      ),
    },
    {
      title: "Ngày hết hạn",
      width: 185,
      dataIndex: "outOfDate",
      key: "outOfDate",
      align: "center",
      render: (_, record) => (
        <div className="font-medium text-[#1D1C2D]">{record.outOfDate}</div>
      ),
    },
    {
      title: "Trạng thái",
      width: 185,
      dataIndex: "status",
      key: "status",
      align: "center",
      fixed: "right",
      render: (_, record) =>
        record?.status && (
          <span
            className={`font-semibold text-[${StatusColorEnum[record.status]}]`}
          >
            {StatusList.find((status) => status.value === record.status)?.name}
          </span>
        ),
    },
  ];

  const data: IsProduct[] = [
    {
      show: true,
      id: "KH0001",
      name: "Áo thun basic cotton ",
      image: "",
      category: "Áo",
      total: 500,
      models: 4,
      numberSale: 500,
      price: "60.000.000 đ",
      totalPrice: "60.000.000 đ",
      createdAt: "19/09/2022",
      outOfDate: "19/09/2022",
      status: StatusEnum.CAN_SALES,
    },
    {
      show: true,
      id: "KH0001",
      name: "Áo thun basic cotton ",
      image: "",
      category: "Áo",
      total: 500,
      models: 4,
      numberSale: 500,
      price: "60.000.000 đ",
      totalPrice: "60.000.000 đ",
      createdAt: "19/09/2022",
      outOfDate: "19/09/2022",
      status: StatusEnum.HIDDEN,
    },
    {
      show: true,
      id: "KH0001",
      name: "Áo thun basic cotton ",
      image: "",
      category: "Áo",
      total: 500,
      models: 4,
      numberSale: 500,
      price: "60.000.000 đ",
      totalPrice: "60.000.000 đ",
      createdAt: "19/09/2022",
      outOfDate: "19/09/2022",
      status: StatusEnum.NEAR_EXPIRE,
    },
    {
      show: true,
      id: "KH0001",
      name: "Áo thun basic cotton ",
      image: "",
      category: "Áo",
      total: 500,
      models: 4,
      numberSale: 500,
      price: "60.000.000 đ",
      totalPrice: "60.000.000 đ",
      createdAt: "19/09/2022",
      outOfDate: "19/09/2022",
      status: StatusEnum.EXPIRE,
    },
    {
      show: true,
      id: "KH0001",
      name: "Áo thun basic cotton ",
      image: "",
      category: "Áo",
      total: 500,
      models: 4,
      numberSale: 500,
      price: "60.000.000 đ",
      totalPrice: "60.000.000 đ",
      createdAt: "19/09/2022",
      outOfDate: "19/09/2022",
      status: StatusEnum.CAN_SALES,
    },
    {
      show: true,
      id: "KH0001",
      name: "Áo thun basic cotton ",
      image: "",
      category: "Áo",
      total: 500,
      models: 4,
      numberSale: 500,
      price: "60.000.000 đ",
      totalPrice: "60.000.000 đ",
      createdAt: "19/09/2022",
      outOfDate: "19/09/2022",
      status: StatusEnum.CAN_SALES,
    },
    {
      show: true,
      id: "KH0001",
      name: "Áo thun basic cotton ",
      image: "",
      category: "Áo",
      total: 500,
      models: 4,
      numberSale: 500,
      price: "60.000.000 đ",
      totalPrice: "60.000.000 đ",
      createdAt: "19/09/2022",
      outOfDate: "19/09/2022",
      status: StatusEnum.CAN_SALES,
    },
    {
      show: true,
      id: "KH0001",
      name: "Áo thun basic cotton ",
      image: "",
      category: "Áo",
      total: 500,
      models: 4,
      numberSale: 500,
      price: "60.000.000 đ",
      totalPrice: "60.000.000 đ",
      createdAt: "19/09/2022",
      outOfDate: "19/09/2022",
      status: StatusEnum.CAN_SALES,
    },
    {
      show: true,
      id: "KH0001",
      name: "Áo thun basic cotton ",
      image: "",
      category: "Áo",
      total: 500,
      models: 4,
      numberSale: 500,
      price: "60.000.000 đ",
      totalPrice: "60.000.000 đ",
      createdAt: "19/09/2022",
      outOfDate: "19/09/2022",
      status: StatusEnum.CAN_SALES,
    },
    {
      show: true,
      id: "KH0001",
      name: "Áo thun basic cotton ",
      image: "",
      category: "Áo",
      total: 500,
      models: 4,
      numberSale: 500,
      price: "60.000.000 đ",
      totalPrice: "60.000.000 đ",
      createdAt: "19/09/2022",
      outOfDate: "19/09/2022",
      status: StatusEnum.CAN_SALES,
    },
    {
      show: true,
      id: "KH0001",
      name: "Áo thun basic cotton ",
      image: "",
      category: "Áo",
      total: 500,
      models: 4,
      numberSale: 500,
      price: "60.000.000 đ",
      totalPrice: "60.000.000 đ",
      createdAt: "19/09/2022",
      outOfDate: "19/09/2022",
      status: StatusEnum.CAN_SALES,
    },
    {
      show: true,
      id: "KH0001",
      name: "Áo thun basic cotton ",
      image: "",
      category: "Áo",
      total: 500,
      models: 4,
      numberSale: 500,
      price: "60.000.000 đ",
      totalPrice: "60.000.000 đ",
      createdAt: "19/09/2022",
      outOfDate: "19/09/2022",
      status: StatusEnum.CAN_SALES,
    },
  ];

  const warehouseData = [
    {
      label: "Tổng kho Linh Dương",
      value: "Tổng kho Linh Dương",
      totalPrice: "21.000.000 đ",
    },
    {
      label: "Cửa hàng LD Mart",
      value: "Cửa hàng LD Mart",
      totalPrice: "21.000.000 đ",
    },
    {
      label: "Siêu thị tiện ích LD",
      value: "Siêu thị tiện ích LD",
      totalPrice: "21.000.000 đ",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-[12px] flex-wrap">
        <TitlePage title="Quản lý chỉ tiêu" href="/user-goal" />
        <div className="flex gap-[8px] flex-wrap">
          <div className="flex items-center">
            <div className="mr-[12px]">Chọn kho</div>
            <Select
              defaultValue={warehouseData[0]}
              options={warehouseData}
              style={{ width: 248 }}
            />
          </div>
          <Button
            variant="outlined"
            width={109}
            icon={<Icon icon="export" size={24} />}
          >
            Xuất file
          </Button>
          <Button
            variant="outlined"
            width={158}
            color="white"
            icon={<Icon icon="settings-1" size={24} />}
          >
            Cài đặt chỉ tiêu
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
          placeholder="Nhập ID/ Tên nhân viên"
        />
        <Select
          prefix={<Icon icon="category" size={24} color="#5F5E6B" />}
          placeholder="Tìm theo nhóm nhân viên"
          style={{ width: 306 }}
          options={groupStaff}
        />
      </div>
      <div className="relative">
        <Table
          loading={loading}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={{
            defaultPageSize: pagination.pageSize,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100],
          }}
          scroll={{ x: 50, y: 450 }}
        />
        <div className={classNames("flex items-center", styles.total_wrapper)}>
          <div className={styles.row}>
            Có thể bán:
            <span className="font-medium text-[#384ADC]"> 5000</span>
          </div>
          <div className={styles.row}>
            Tổng tiền đã bán:
            <span className="font-medium text-[#384ADC]"> 353.000.000 đ</span>
          </div>
          <div className={styles.row}>
            Tiền hàng còn lại:
            <span className="font-medium text-[#384ADC]"> 150.000.000 </span>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<TargetManagement />, document.getElementById("root"));
